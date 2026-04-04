"use client";

import { useState } from "react";

const links = [
  { href: "/#features", label: "--features" },
  { href: "/docs", label: "--docs" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-bg">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="font-bold text-lg text-glass-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-teal text-sm">&#x276f;</span> murmur
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 text-xs font-mono text-glass-text">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-teal transition-colors">{l.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="/download" className="text-xs font-mono font-semibold px-4 py-2 rounded-lg bg-teal/15 text-teal hover:bg-teal/25 transition-colors border border-teal/20">
            $ install
          </a>

          {/* Hamburger - mobile only */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-glass-text hover:text-glass-white transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/[0.04] bg-ocean-deep/95 backdrop-blur-lg">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-mono text-glass-text hover:text-teal transition-colors py-1"
              >
                {l.label}
              </a>
            ))}
            <a href="/download" onClick={() => setOpen(false)} className="block text-sm font-mono text-glass-text hover:text-teal transition-colors py-1">--download</a>
            <a href="/about" onClick={() => setOpen(false)} className="block text-sm font-mono text-glass-text hover:text-teal transition-colors py-1">--about</a>
          </div>
        </div>
      )}
    </nav>
  );
}
