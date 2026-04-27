import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

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

const SUBSCRIPTION_EVENTS = new Set([
  "subscription_created",
  "subscription_updated",
  "subscription_cancelled",
  "subscription_expired",
  "subscription_resumed",
  "subscription_paused",
]);

const POSTGRES_UNIQUE_VIOLATION = "23505";

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

  const supabase = getSupabase();

  // Idempotency: dedupe by sha256 of the raw body. Two replays of the same
  // delivery have identical bodies → identical hashes → primary-key conflict
  // on the second insert.
  const eventHash = crypto.createHash("sha256").update(rawBody).digest("hex");
  const { error: insertError } = await supabase
    .from("webhook_events")
    .insert({
      event_hash: eventHash,
      source: "lemonsqueezy",
      event_name: eventName,
    } as never);

  if (insertError) {
    // Treat any unique-constraint violation on this table as "already processed".
    if (insertError.code === POSTGRES_UNIQUE_VIOLATION) {
      console.info("[webhook] duplicate delivery, skipping:", {
        eventHash,
        eventName,
      });
      return NextResponse.json({ received: true, deduped: true });
    }
    // Other failure modes (RLS, connectivity) should not silently drop the
    // event — better to 500 and let LemonSqueezy retry.
    console.error("[webhook] idempotency log insert failed:", insertError);
    return NextResponse.json(
      { error: "Idempotency log unavailable" },
      { status: 500 }
    );
  }

  if (!SUBSCRIPTION_EVENTS.has(eventName)) {
    return NextResponse.json({ received: true });
  }

  const email: string = attrs.user_email;
  const status: string = attrs.status;
  const customerId: number = attrs.customer_id;
  const subscriptionId = Number(p.data?.id);
  const isPro = PRO_STATUSES.has(status);
  const userId: string | undefined = customData?.user_id;

  // Replay protection: only apply events whose payload timestamp is strictly
  // newer than the last one we've recorded against this profile. LemonSqueezy
  // emits attrs.updated_at on every subscription event; it advances
  // monotonically, so it's a safe ordering key.
  const eventTimestamp: string | undefined = attrs.updated_at;
  if (!eventTimestamp || Number.isNaN(Date.parse(eventTimestamp))) {
    console.error("[webhook] missing or unparseable attrs.updated_at:", {
      eventName,
      raw: eventTimestamp,
    });
    return NextResponse.json(
      { error: "Missing event timestamp" },
      { status: 400 }
    );
  }

  // Read the existing profile to decide whether this event is fresh enough.
  const lookup = userId
    ? supabase.from("profiles").select("id, last_webhook_at").eq("id", userId)
    : supabase
        .from("profiles")
        .select("id, last_webhook_at")
        .eq("email", email);

  const { data: existing, error: lookupError } = await lookup.maybeSingle();

  if (lookupError) {
    console.error("[webhook] profile lookup failed:", lookupError);
    return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
  }

  if (!existing) {
    console.error("[webhook] no profile matched:", { userId, email });
    return NextResponse.json(
      { error: "No matching profile" },
      { status: 404 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existingTyped = existing as any;
  const lastWebhookAt: string | null = existingTyped.last_webhook_at;
  if (lastWebhookAt && Date.parse(eventTimestamp) <= Date.parse(lastWebhookAt)) {
    console.info("[webhook] stale event, skipping:", {
      eventName,
      eventTimestamp,
      lastWebhookAt,
    });
    return NextResponse.json({ received: true, stale: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cleanData: Record<string, any> = {
    is_pro: isPro,
    lemon_customer_id: customerId,
    lemon_subscription_id: subscriptionId,
    subscription_status: status,
    last_webhook_at: eventTimestamp,
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

  const { error: updateError } = await supabase
    .from("profiles")
    .update(cleanData as never)
    .eq("id", existingTyped.id);

  if (updateError) {
    console.error("[webhook] profile update failed:", updateError);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
