"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass px-6 py-4 rounded-xl text-center">
        <p className="text-sm text-teal font-medium">You&apos;re on the list.</p>
        <p className="text-xs text-glass-text mt-1">We&apos;ll notify you when Pro launches.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        required
        className="flex-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-glass-border text-sm text-glass-white placeholder:text-glass-text/50 font-mono focus:outline-none focus:border-teal/30 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="cta-grad text-sm font-mono px-5 shrink-0 disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Notify me"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400 mt-1">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
