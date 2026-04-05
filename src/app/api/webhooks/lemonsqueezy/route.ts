import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

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

  const payload = JSON.parse(rawBody);
  const eventName: string = payload.meta?.event_name;
  const customData = payload.meta?.custom_data;
  const attrs = payload.data?.attributes;

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
  const subscriptionId = Number(payload.data?.id);
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

  let error;
  if (userId) {
    ({ error } = await supabase
      .from("profiles")
      .update(cleanData as never)
      .eq("id", userId));
  } else {
    ({ error } = await supabase
      .from("profiles")
      .update(cleanData as never)
      .eq("email", email));
  }

  if (error) {
    console.error("[webhook] profile update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
