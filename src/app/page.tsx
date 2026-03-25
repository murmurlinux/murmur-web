import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient mesh background */}
      <div className="fixed inset-0 bg-gradient-to-b from-ocean-mid via-ocean-deep to-[#0a0f1a]" />

      {/* Floating orbs */}
      <div className="fixed w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,#14b8a6,transparent_70%)] top-[10%] right-[15%] opacity-[0.08] blur-[100px] animate-[orb1_26s_ease-in-out_infinite]" />
      <div className="fixed w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,#f59e0b,transparent_70%)] bottom-[5%] left-[-5%] opacity-[0.06] blur-[100px] animate-[orb2_22s_ease-in-out_infinite]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16">
        {/* LED pill */}
        <div className="glass rounded-full px-4 py-1.5 flex items-center gap-2 text-xs font-mono text-teal mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-teal led" />
          linux-native &middot; offline &middot; open-source
        </div>

        {/* Comm Badge */}
        <div className="mb-6">
          <Image
            src="/images/comm-badge.png"
            alt="Murmur Comm Badge"
            width={400}
            height={218}
            priority
            className="max-w-[80vw] drop-shadow-[0_4px_40px_rgba(20,184,166,0.2)] hue-rotate-[-30deg]"
            draggable={false}
          />
        </div>

        {/* Headline */}
        <h1 className="text-[3rem] leading-[1.1] font-extrabold text-glass-white tracking-tight mb-3">
          Voice dictation
          <br />
          for Linux. <em className="not-italic grad-text">Finally.</em>
        </h1>

        {/* Subtitle */}
        <p className="text-[0.95rem] text-glass-text max-w-[28rem] leading-relaxed mb-6">
          Press a hotkey, speak, text at your cursor. In any app.{" "}
          <span className="text-glass-light font-medium">
            Your voice never leaves your machine.
          </span>
        </p>

        {/* Coming soon */}
        <p className="font-mono text-[0.7rem] text-teal/60 tracking-wider mb-8">
          <span className="text-white/15">&#x276f;</span> status:{" "}
          <span className="text-amber">coming soon</span>
          <span className="blink text-teal"> &#x258a;</span>
        </p>

        {/* GitHub CTA */}
        <a
          href="https://github.com/murmurlinux/murmur"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-grad text-sm font-mono flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View on GitHub
        </a>

        {/* Checkmarks */}
        <div className="flex gap-5 mt-6 font-mono text-[0.65rem] text-white/25">
          <span>
            <span className="text-teal">&#x2713;</span> 100% offline
          </span>
          <span>
            <span className="text-amber">&#x2713;</span> ~3MB binary
          </span>
          <span>
            <span className="text-teal">&#x2713;</span> GPL v3
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-6 text-[0.6rem] font-mono text-white/10 tracking-wider">
        &copy; 2026 Murmur. GPL v3.
      </div>
    </div>
  );
}
