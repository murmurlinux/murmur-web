# murmur-web

Marketing website for [Murmur](https://github.com/murmurlinux/murmur): **murmurlinux.com**

Built with Next.js 16, Tailwind CSS 4, TypeScript. Deployed on Vercel.

## Development

```bash
pnpm install
pnpm dev
```

## Environment variables

Copy the block below into a `.env.local` file at the repo root (gitignored) and fill in real values for local dev. Production and preview environments on Vercel use their own configuration, not this file.

```
# Supabase: public anon key (safe client-side, used by the browser).
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Supabase service role key (server-side only, never expose to the browser).
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# LemonSqueezy webhook secret (verifies incoming webhook signatures).
LEMONSQUEEZY_WEBHOOK_SECRET=whsec_from_lemonsqueezy_dashboard

# LemonSqueezy API key (for creating or reading checkouts programmatically).
LEMONSQUEEZY_API_KEY=from_lemonsqueezy_dashboard

# Health cron bearer token (protects /api/health from unauthenticated probes).
CRON_SECRET=a-long-random-string

# Unsubscribe link HMAC secret (signs email unsubscribe tokens).
UNSUBSCRIBE_TOKEN_SECRET=another-long-random-string

# Gemini API key (for the public chatbot on the website).
GEMINI_API_KEY=from-google-ai-studio

# Sentry DSN for client-side error reporting (public by design).
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-project.ingest.sentry.io/your-id
```

All values above are examples. Never commit real keys.

## License

MIT
