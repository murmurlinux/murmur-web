import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

// Unsubscribe links must be generated server-side with a signed token.
// The token binds an email + issue timestamp to our secret, so a link can
// only originate from us (prevents unauthenticated DELETE from anyone
// guessing or scraping email addresses).
//
// Token format: base64url(email).unixSeconds.hmacSha256Hex
// Example: c29tZWJvZHlAZXhhbXBsZS5jb20.1776420000.a1b2c3...
//
// When email-sending is added, use buildUnsubscribeUrl(email) to generate
// the canonical link to embed in the footer.

const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year generosity; tokens are one-shot

function b64urlEncode(input: string): string {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64urlDecode(input: string): string {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const padLen = (4 - (padded.length % 4)) % 4;
  return Buffer.from(padded + "=".repeat(padLen), "base64").toString("utf8");
}

function computeSignature(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type VerifyResult =
  | { ok: true; email: string }
  | { ok: false; reason: string };

function verifyToken(token: string, secret: string): VerifyResult {
  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, reason: "malformed token" };

  const [emailB64, tsStr, providedSig] = parts;
  const issuedAt = Number.parseInt(tsStr, 10);
  if (!Number.isFinite(issuedAt)) return { ok: false, reason: "bad timestamp" };

  const nowSec = Math.floor(Date.now() / 1000);
  if (nowSec - issuedAt > TOKEN_MAX_AGE_SECONDS) {
    return { ok: false, reason: "token expired" };
  }
  if (issuedAt - nowSec > 300) {
    return { ok: false, reason: "token from the future" };
  }

  let email: string;
  try {
    email = b64urlDecode(emailB64).toLowerCase();
  } catch {
    return { ok: false, reason: "undecodable email" };
  }
  if (!email.includes("@")) return { ok: false, reason: "invalid email" };

  const expectedSig = computeSignature(`${emailB64}.${tsStr}`, secret);
  // Constant-time compare
  const providedBytes = Buffer.from(providedSig, "hex");
  const expectedBytes = Buffer.from(expectedSig, "hex");
  if (providedBytes.length !== expectedBytes.length) {
    return { ok: false, reason: "signature length mismatch" };
  }
  if (!crypto.timingSafeEqual(providedBytes, expectedBytes)) {
    return { ok: false, reason: "bad signature" };
  }

  return { ok: true, email };
}

/**
 * Build a server-signed unsubscribe URL for inclusion in outgoing emails.
 * Exported for future use by the email-sending code path; unused today.
 */
export function buildUnsubscribeUrl(email: string): string {
  const secret = process.env.UNSUBSCRIBE_TOKEN_SECRET;
  if (!secret) throw new Error("UNSUBSCRIBE_TOKEN_SECRET is not set");
  const emailB64 = b64urlEncode(email.toLowerCase());
  const ts = Math.floor(Date.now() / 1000).toString();
  const sig = computeSignature(`${emailB64}.${ts}`, secret);
  const token = `${emailB64}.${ts}.${sig}`;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://murmurlinux.com";
  return `${base}/api/unsubscribe?t=${encodeURIComponent(token)}`;
}

export async function GET(request: Request) {
  const secret = process.env.UNSUBSCRIBE_TOKEN_SECRET;
  if (!secret) {
    console.error("[unsubscribe] UNSUBSCRIBE_TOKEN_SECRET not set");
    return htmlResponse(
      "Unsubscribe unavailable",
      "The unsubscribe service is misconfigured on our side. Please email hello@murmurlinux.com and we'll remove you manually.",
      500,
    );
  }

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("t");

  if (!token) {
    return htmlResponse(
      "Invalid link",
      "This unsubscribe link is missing its token. Please use the exact link from the email we sent you, or email hello@murmurlinux.com.",
      400,
    );
  }

  const result = verifyToken(token, secret);
  if (!result.ok) {
    return htmlResponse(
      "Link expired or invalid",
      "This unsubscribe link could not be verified. Please use a recent link, or email hello@murmurlinux.com and we'll remove you manually.",
      400,
    );
  }

  const { error } = await supabase
    .from("waitlist")
    .delete()
    .eq("email", result.email);

  if (error) {
    console.error("[unsubscribe] delete error:", error.code || error.message);
    return htmlResponse(
      "Error",
      "Something went wrong on our end. Please try again in a moment, or email hello@murmurlinux.com.",
      500,
    );
  }

  // Use a safe preview of the email in the confirmation page. Even though
  // verifyToken already validated the email came from us, everything rendered
  // to HTML is escaped as a belt-and-suspenders measure.
  return htmlResponse(
    "Unsubscribed",
    `${escapeHtml(result.email)} has been removed from the mailing list. You won't receive any further emails from us.`,
    200,
  );
}

function htmlResponse(title: string, message: string, status: number) {
  const body = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} &mdash; murmur</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'JetBrains Mono', monospace;
      background: #f5f0e6;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
    }
    .card {
      max-width: 480px;
      border: 1px solid #d4c9b5;
      padding: 24px 28px;
      background: #ece4d0;
    }
    h1 { color: #c9482b; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 12px; }
    p { font-size: 13px; line-height: 1.55; margin: 0 0 16px; }
    a { color: #2d5f8a; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${escapeHtml(title)}</h1>
    <p>${message}</p>
    <p><a href="https://murmurlinux.com">back to murmurlinux.com</a></p>
  </div>
</body>
</html>`;
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
