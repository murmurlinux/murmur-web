import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Murmur is a Linux-native voice dictation gadget. Free, open source, 100% offline. Built with Rust, Tauri 2, and whisper.cpp.",
};

export default function AboutPage() {
  return (
    <>

      <div className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-5">cat README</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-8">About Murmur</h1>

          <div className="space-y-6 text-sm text-glass-text leading-relaxed">
            <p>
              Murmur is a voice dictation gadget for Linux. Press a hotkey, speak, and text appears at your cursor, in any application.
              It&apos;s powered by <a href="https://github.com/ggerganov/whisper.cpp" className="text-teal hover:underline">whisper.cpp</a> for
              fast, accurate, 100% offline transcription.
            </p>

            <p>
              Voice dictation on other platforms has been polished for years. We wanted to bring that same quality to Linux: a native
              Rust/Tauri app that&apos;s 5MB, starts instantly, and actually looks good on your desktop.
            </p>

            <h2 className="text-xl font-extrabold text-glass-white pt-4">Open source commitment</h2>
            <p>
              Murmur is free and open source under the <a href="https://github.com/murmurlinux/murmur/blob/main/LICENSE" className="text-teal hover:underline">GPL v3</a> license.
              The core app (local whisper transcription, all skins, push-to-talk, text injection) will always be free with no limits.
            </p>
            <p>
              A Pro tier is planned for power users who want cloud STT speed (&lt;200ms via Groq/Deepgram), LLM text cleanup,
              multi-language support (99+ languages), and a CLI mode for scripting. The free tier is not a trial. It&apos;s the complete product.
            </p>

            <h2 className="text-xl font-extrabold text-glass-white pt-4">Built with</h2>
            <div className="glass p-5">
              <div className="space-y-1.5 text-[12px] font-mono">
                {[
                  ["Backend", "Rust + Tauri 2"],
                  ["Frontend", "SolidJS + TypeScript"],
                  ["STT Engine", "whisper.cpp (via whisper-rs)"],
                  ["Audio", "cpal (PipeWire / PulseAudio)"],
                  ["Text Injection", "xdotool (XTEST)"],
                  ["Website", "Next.js + Tailwind CSS on Vercel"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-glass-text">{k}</span>
                    <span className="text-glass-light">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-glass-white pt-4">Roadmap</h2>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-3"><span className="text-teal">&#x2713;</span> <span className="text-glass-light">Core dictation + settings (v0.1.0)</span></div>
              <div className="flex items-center gap-3"><span className="text-glass-text/30">&#x25cb;</span> <span>GPU acceleration (Vulkan)</span></div>
              <div className="flex items-center gap-3"><span className="text-glass-text/30">&#x25cb;</span> <span>Wayland support (ydotool)</span></div>
              <div className="flex items-center gap-3"><span className="text-glass-text/30">&#x25cb;</span> <span>Voice Activity Detection (tap-to-record)</span></div>
              <div className="flex items-center gap-3"><span className="text-glass-text/30">&#x25cb;</span> <span>Additional skins</span></div>
              <div className="flex items-center gap-3"><span className="text-glass-text/30">&#x25cb;</span> <span>Cloud STT (Pro)</span></div>
              <div className="flex items-center gap-3"><span className="text-glass-text/30">&#x25cb;</span> <span>CLI mode (murmur-cli)</span></div>
              <div className="flex items-center gap-3"><span className="text-glass-text/30">&#x25cb;</span> <span>Multi-language (99+)</span></div>
            </div>

            <h2 className="text-xl font-extrabold text-glass-white pt-4">Contact</h2>
            <p>
              <a href="mailto:hello@murmurlinux.com" className="text-teal hover:underline">hello@murmurlinux.com</a> &middot;{" "}
              <a href="https://github.com/murmurlinux/murmur" className="text-teal hover:underline">GitHub</a> &middot;{" "}
              <a href="https://github.com/murmurlinux/murmur/discussions" className="text-teal hover:underline">Discussions</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
