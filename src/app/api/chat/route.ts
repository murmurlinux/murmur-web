import { streamText, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";
import { SYSTEM_PROMPT } from "@/lib/chat-knowledge";

// Rate limiting: 10 req/min per IP, 100 req/day per IP
const minuteMap = new Map<string, { count: number; resetAt: number }>();
const dayMap = new Map<string, { count: number; resetAt: number }>();
const MINUTE_LIMIT = 10;
const DAY_LIMIT = 100;
const MINUTE_MS = 60_000;
const DAY_MS = 86_400_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Per-minute check
  const minute = minuteMap.get(ip);
  if (!minute || now > minute.resetAt) {
    minuteMap.set(ip, { count: 1, resetAt: now + MINUTE_MS });
  } else {
    minute.count++;
    if (minute.count > MINUTE_LIMIT) return true;
  }

  // Per-day check
  const day = dayMap.get(ip);
  if (!day || now > day.resetAt) {
    dayMap.set(ip, { count: 1, resetAt: now + DAY_MS });
  } else {
    day.count++;
    if (day.count > DAY_LIMIT) return true;
  }

  return false;
}

export async function POST(request: Request) {
  // CORS: verify origin
  const origin = request.headers.get("origin");
  if (
    origin &&
    origin !== "https://murmurlinux.com" &&
    origin !== "https://www.murmurlinux.com" &&
    !origin.endsWith(".vercel.app") &&
    !origin.startsWith("http://localhost:")
  ) {
    return new Response("Forbidden", { status: 403 });
  }

  // Rate limit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return new Response("Too many requests", { status: 429 });
  }

  const body = await request.json();
  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("Bad request", { status: 400 });
  }

  // Cap conversation length server-side
  if (messages.length > 30) {
    return new Response("Conversation too long", { status: 400 });
  }

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 400,
  });

  return result.toUIMessageStreamResponse();
}
