"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError === "auth-code-error") {
      setError("Authentication failed. Please try signing in again.");
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="pt-24 pb-20 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md mx-auto px-6">
        <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-5">
          Welcome back
        </p>
        <h1 className="text-3xl font-extrabold text-glass-white tracking-tight mb-8">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="glass p-8 space-y-6">
          {error && (
            <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-[10px] font-mono uppercase tracking-widest text-teal-400 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-black/30 border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-glass-white placeholder:text-glass-text/50 focus:outline-none focus:border-teal/40 focus:ring-1 focus:ring-teal/20 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[10px] font-mono uppercase tracking-widest text-teal-400 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-black/30 border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-glass-white placeholder:text-glass-text/50 focus:outline-none focus:border-teal/40 focus:ring-1 focus:ring-teal/20 transition"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal hover:bg-teal-dim text-ocean-deep font-bold text-sm py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-xs text-glass-text">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-teal hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
