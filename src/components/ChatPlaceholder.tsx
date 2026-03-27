"use client";

import { useState } from "react";

export default function ChatPlaceholder() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {hovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-ocean-mid border border-glass-border text-[10px] font-mono text-glass-text whitespace-nowrap">
          AI Help - Coming Soon
        </div>
      )}
      <button
        type="button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-12 h-12 rounded-full glass flex items-center justify-center text-glass-text/50 cursor-default hover:text-teal/50 transition-colors"
        aria-label="AI Help - Coming Soon"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      </button>
    </div>
  );
}
