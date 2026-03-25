import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ORIGIN = "https://murmurlinux.com";

export async function POST(request: Request) {
  try {
    // CSRF: verify origin
    const origin = request.headers.get("origin");
    if (origin && origin !== ALLOWED_ORIGIN && !origin.endsWith(".vercel.app")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : "";

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { error } = await supabase.from("waitlist").insert({ email });

    if (error) {
      // Duplicate email — treat as success (don't reveal if email exists)
      if (error.code === "23505") {
        return NextResponse.json({ message: "Added to waitlist" });
      }
      console.error("[waitlist] insert error:", error.code);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }

    return NextResponse.json({ message: "Added to waitlist" });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
