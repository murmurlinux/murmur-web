import { NextResponse } from "next/server";

// Simple in-memory rate limiting (resets on cold start, which is fine for spam prevention)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW);
  rateLimitMap.set(ip, recent);
  return recent.length >= RATE_LIMIT;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const sanitized = email.trim().toLowerCase().slice(0, 254);

    // Log for now — we'll add proper storage (Upstash/Supabase) before launch
    console.log(`[waitlist] ${sanitized} at ${new Date().toISOString()}`);

    // Record rate limit
    const timestamps = rateLimitMap.get(ip) || [];
    timestamps.push(Date.now());
    rateLimitMap.set(ip, timestamps);

    return NextResponse.json({ message: "Added to waitlist" });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
