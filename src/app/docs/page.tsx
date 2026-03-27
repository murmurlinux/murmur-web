import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Murmur documentation: getting started, settings, hotkeys, FAQ.",
};

export default function DocsPage() {
  return (
    <>

      <div className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-5">man murmur</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-12">Documentation</h1>

          {/* Getting Started */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-glass-white tracking-tight mb-4">Getting Started</h2>
            <div className="space-y-4 text-sm text-glass-text leading-relaxed">
              <p>
                Murmur is a voice dictation gadget for Linux. Hold a hotkey, speak, and text appears at your cursor in any application.
              </p>

              <h3 className="text-lg font-bold text-glass-light pt-2">1. Install</h3>
              <div className="glass p-4 font-mono text-[12px]">
                <div className="text-teal/70">wget <span className="text-glass-text/40">https://github.com/murmurlinux/murmur/releases/latest</span></div>
                <div className="text-teal/70">chmod +x <span className="text-glass-text/40">latest.AppImage && ./latest.AppImage</span></div>
              </div>

              <h3 className="text-lg font-bold text-glass-light pt-2">2. First run</h3>
              <p>On first launch, Murmur will download the Whisper Tiny model (~75MB). This is a one-time download.</p>

              <h3 className="text-lg font-bold text-glass-light pt-2">3. Dictate</h3>
              <p>Press <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[11px] text-glass-light font-mono">Ctrl+Shift+Space</kbd> and hold. Speak naturally. Release to transcribe. Text appears at your cursor.</p>
            </div>
          </section>

          {/* Settings */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-glass-white tracking-tight mb-4">Settings</h2>
            <p className="text-sm text-glass-text leading-relaxed mb-4">
              Click the gear icon on the Comm Badge to open settings. Settings are stored at <code className="text-teal/70 font-mono text-xs">~/.local/share/murmur/settings.json</code>.
            </p>
            <div className="glass p-5">
              <div className="space-y-3 text-[12px] font-mono">
                {[
                  ["Hotkey", "Global keyboard shortcut for push-to-talk. Default: Ctrl+Shift+Space"],
                  ["Model", "Whisper model size. Tiny (~3s), Base (~8s), Small (~20s). Auto-downloads on first use."],
                  ["Accent Colour", "Customise the Comm Badge glow colour via hue rotation."],
                  ["Skin", "Select your widget style. Currently: Gemini v1. More coming."],
                ].map(([k, v]) => (
                  <div key={k}>
                    <span className="text-teal font-semibold">{k}</span>
                    <p className="text-glass-text mt-0.5 font-sans text-xs">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Hotkeys */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-glass-white tracking-tight mb-4">Hotkey Reference</h2>
            <div className="glass overflow-hidden">
              <table className="w-full text-[12px] font-mono">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-3 px-5 text-glass-text font-normal">Action</th>
                    <th className="text-left py-3 px-5 text-glass-text font-normal">Default</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/[0.03]">
                    <td className="py-3 px-5 text-glass-light">Push-to-talk (hold)</td>
                    <td className="py-3 px-5 text-teal">Ctrl+Shift+Space</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 text-glass-light">Open settings</td>
                    <td className="py-3 px-5 text-teal">Click gear icon</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-extrabold text-glass-white tracking-tight mb-4">FAQ</h2>
            <div className="space-y-3">
              {[
                { q: "Where are models stored?", a: "~/.local/share/murmur/models/. Models auto-download from Hugging Face on first use." },
                { q: "Can I use my own Whisper model?", a: "Not yet. Custom model paths are planned for a future release." },
                { q: "Does it work without internet?", a: "Yes, 100%. After the initial model download, Murmur never makes network requests." },
                { q: "Why xdotool?", a: "xdotool uses the XTEST extension to simulate keystrokes, which works in any X11 application. Wayland support via ydotool is planned." },
                { q: "How do I report a bug?", a: "Open an issue at github.com/murmurlinux/murmur/issues with your distro, desktop environment, and steps to reproduce." },
              ].map((faq) => (
                <div key={faq.q} className="glass p-5">
                  <h3 className="text-sm font-semibold text-glass-light mb-1">{faq.q}</h3>
                  <p className="text-xs text-glass-text leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
