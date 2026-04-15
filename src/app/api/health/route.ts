import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { error } = await supabase
    .from("waitlist")
    .select("id")
    .limit(1);

  if (error) {
    console.error("[health] Supabase ping failed:", error.message);
    return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
  }

  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}
