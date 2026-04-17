import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim().toLowerCase();

  if (!email) {
    return new Response(
      page("Missing email", "No email address provided. Check the link in your email."),
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  const { error } = await supabase
    .from("waitlist")
    .delete()
    .eq("email", email);

  if (error) {
    console.error("[unsubscribe] delete error:", error);
    return new Response(
      page("Error", "Something went wrong. Please try again or email support@murmurlinux.com."),
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }

  return new Response(
    page("Unsubscribed", `${email} has been removed from the mailing list. You won't receive any further emails from us.`),
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

function page(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} - murmur</title>
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
    <h1>${title}</h1>
    <p>${message}</p>
    <p><a href="https://murmurlinux.com">back to murmurlinux.com</a></p>
  </div>
</body>
</html>`;
}
