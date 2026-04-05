"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

  return (
    <div className="pt-24 pb-20 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md mx-auto px-6">
        <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-5">
          Create account
        </p>
        <h1 className="text-3xl font-extrabold text-glass-white tracking-tight mb-8">
          Sign up
        </h1>

        {success ? (
          <div className="glass p-8 text-center">
            <p className="text-sm text-glass-text mb-2">
              Check your email to confirm your account.
            </p>
            <p className="text-sm font-mono text-teal">{email}</p>
          </div>
        ) : (
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
                autoComplete="new-password"
                minLength={8}
                className="w-full bg-black/30 border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-glass-white placeholder:text-glass-text/50 focus:outline-none focus:border-teal/40 focus:ring-1 focus:ring-teal/20 transition"
                placeholder="At least 8 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal hover:bg-teal-dim text-ocean-deep font-bold text-sm py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <p className="text-center text-xs text-glass-text">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-teal hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
