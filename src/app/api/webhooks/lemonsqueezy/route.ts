import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// Lazy-init: avoid crashing at build time when env vars are absent
let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _supabase;
}

function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!signature || !secret) return false;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(rawBody);
  const digest = hmac.digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(digest, "hex"),
      Buffer.from(signature, "hex")
    );
  } catch {
    return false;
  }
}

const PRO_STATUSES = new Set(["active", "on_trial"]);

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Malformed JSON" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = payload as any;
  const eventName: string = p.meta?.event_name;
  const customData = p.meta?.custom_data;
  const attrs = p.data?.attributes;

  if (!attrs || !eventName) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const subscriptionEvents = [
    "subscription_created",
    "subscription_updated",
    "subscription_cancelled",
    "subscription_expired",
    "subscription_resumed",
    "subscription_paused",
  ];

  if (!subscriptionEvents.includes(eventName)) {
    return NextResponse.json({ received: true });
  }

  const email: string = attrs.user_email;
  const status: string = attrs.status;
  const customerId: number = attrs.customer_id;
  const subscriptionId = Number(p.data?.id);
  const isPro = PRO_STATUSES.has(status);

  const userId: string | undefined = customData?.user_id;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cleanData: Record<string, any> = {
    is_pro: isPro,
    lemon_customer_id: customerId,
    lemon_subscription_id: subscriptionId,
    subscription_status: status,
    updated_at: new Date().toISOString(),
  };

  if (isPro) {
    cleanData.pro_since = new Date().toISOString();
    cleanData.pro_expires_at = null;
  } else {
    cleanData.pro_expires_at = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString();
  }

  const supabase = getSupabase();

  let query;
  if (userId) {
    query = supabase
      .from("profiles")
      .update(cleanData as never)
      .eq("id", userId)
      .select("id");
  } else {
    console.warn(
      "[webhook] user_id missing from custom_data, falling back to email lookup:",
      email
    );
    query = supabase
      .from("profiles")
      .update(cleanData as never)
      .eq("email", email)
      .select("id");
  }

  const { data, error } = await query;

  if (error) {
    console.error("[webhook] profile update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  if (!data || data.length === 0) {
    console.error("[webhook] no profile matched for update:", { userId, email });
    return NextResponse.json(
      { error: "No matching profile" },
      { status: 404 }
    );
  }

  return NextResponse.json({ received: true });
}
