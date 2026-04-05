import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;

// Service role client bypasses RLS to update Pro fields
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function verifySignature(rawBody: string, signature: string | null): boolean {
  if (!signature || !WEBHOOK_SECRET) return false;
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
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

  const updateData = {
    is_pro: isPro,
    lemon_customer_id: customerId,
    lemon_subscription_id: subscriptionId,
    subscription_status: status,
    pro_since: isPro ? new Date().toISOString() : undefined,
    pro_expires_at: isPro
      ? null
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  };

  const cleanData = Object.fromEntries(
    Object.entries(updateData).filter(([, v]) => v !== undefined)
  );

  let error;
  if (userId) {
    ({ error } = await supabase
      .from("profiles")
      .update(cleanData)
      .eq("id", userId));
  } else {
    ({ error } = await supabase
      .from("profiles")
      .update(cleanData)
      .eq("email", email));
  }

  if (error) {
    console.error("[webhook] profile update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
