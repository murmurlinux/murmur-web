import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Murmur release history and changelog.",
};

export default function ChangelogPage() {
  return (
    <>

      <div className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-5">git log</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-12">Changelog</h1>

          {/* v0.1.0 */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-lg font-extrabold text-glass-white font-mono">v0.1.0</span>
              <span className="text-[10px] font-mono text-glass-text/30 px-2 py-0.5 border border-glass-border rounded">2026-03-18</span>
              <span className="text-[10px] font-mono text-amber px-2 py-0.5 bg-amber/10 rounded">initial release</span>
            </div>

            <div className="glass p-6 space-y-4">
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Slice 1 — Transparent skinned gadget</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Transparent borderless window with click-through. Gemini v1 skin with interactive zones (mic button, gear button, status LEDs). Skin loader with hot zone definitions from JSON config.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Slice 2 — Audio capture pipeline</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Real-time audio capture via cpal (PipeWire/PulseAudio). Live waveform visualisation on the Comm Badge display. Automatic device selection.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Slice 3 — Whisper transcription + text injection</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  whisper.cpp integration via whisper-rs. Auto-download models from Hugging Face (SHA256 verified). Text injection via xdotool (XTEST). Global hotkey via tauri-plugin-global-shortcut (Ctrl+Shift+Space).
                </p>
              </div>

              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Slice 4 — Settings + packaging</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Settings panel with hotkey configuration, model selection, and accent colour picker. Persistent settings via tauri-plugin-store. Click-through alpha channel hit testing. .deb and .AppImage packaging.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-[11px] text-amber font-semibold mb-2">audit: Security review</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  22 findings identified and resolved. xdotool injection prevention, panic point handling, audio resource cleanup, settings validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
