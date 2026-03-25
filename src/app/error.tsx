"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="font-mono text-[11px] text-red-400 uppercase tracking-widest mb-4">error</p>
      <h1 className="text-4xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-4">
        Something went wrong
      </h1>
      <p className="text-glass-text mb-8 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button onClick={reset} className="cta-grad text-sm font-mono">
        $ retry
      </button>
    </div>
  );
}
