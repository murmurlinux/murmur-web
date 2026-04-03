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

          {/* v0.3.3 */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-lg font-extrabold text-glass-white font-mono">v0.3.3</span>
              <span className="text-[10px] font-mono text-glass-text/30 px-2 py-0.5 border border-glass-border rounded">2026-04-03</span>
              <span className="text-[10px] font-mono text-teal px-2 py-0.5 bg-teal/10 rounded">Polish + Blind Tests</span>
            </div>

            <div className="glass p-6 space-y-4">
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Settings keyboard shortcut</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Press Ctrl+Shift+, to open the settings window from anywhere. Registered alongside the recording hotkey.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Dynamic tray tooltip</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  The system tray icon now shows the current state: &ldquo;Recording...&rdquo;, &ldquo;Processing...&rdquo;, or &ldquo;Voice to Text&rdquo;.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">fix: Audio trimming bugs</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Fixed: all-silence audio was returned unchanged (caused Whisper hallucinations). Short utterances in leading audio chunks are no longer silently dropped.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">chore: Blind property test suite</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  58 property tests (32 Rust, 26 TypeScript) now run in CI. Tests were written without reading source code to catch real bugs, and they did.
                </p>
              </div>
            </div>
          </div>

          {/* v0.3.0 */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-lg font-extrabold text-glass-white font-mono">v0.3.0</span>
              <span className="text-[10px] font-mono text-glass-text/30 px-2 py-0.5 border border-glass-border rounded">2026-03-28</span>
              <span className="text-[10px] font-mono text-teal px-2 py-0.5 bg-teal/10 rounded">GPU + Languages + Auto-update</span>
            </div>

            <div className="glass p-6 space-y-4">
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: GPU acceleration via Vulkan</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Upgraded to whisper-rs 0.16 with Vulkan backend support. Transcription is significantly faster on systems with a compatible GPU.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: First-run onboarding wizard</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  New guided setup on first launch: microphone check, model download, and hotkey configuration. Get up and running in under a minute.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Start on login</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Optional XDG autostart entry so Murmur launches automatically when you log in. Toggle it in settings.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Auto-update system</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Built-in updater via Tauri for AppImage installs, plus an apt repository for .deb users. Stay current without manual downloads.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Multi-language support</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  19 languages plus auto-detect. Select your language in settings or let Murmur identify it automatically.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Translation toggle</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Translate any supported language to English on the fly. Speak in your language, get English text at your cursor.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: CI/CD pipeline</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Automated release pipeline with GitHub Actions. Builds, tests, and publishes .deb and .AppImage artifacts on every tagged release.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-amber font-semibold mb-2">fix: Whisper hallucinations on VAD auto-stop</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Fixed an issue where whisper would hallucinate short phrases when VAD triggered an automatic recording stop.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-amber font-semibold mb-2">fix: Default skin renamed</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  The default skin has been renamed from &quot;Gemini V1&quot; to &quot;Comm Badge&quot; to better reflect the product identity.
                </p>
              </div>
            </div>
          </div>

          {/* v0.2.0 */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-lg font-extrabold text-glass-white font-mono">v0.2.0</span>
              <span className="text-[10px] font-mono text-glass-text/30 px-2 py-0.5 border border-glass-border rounded">2026-03-28</span>
              <span className="text-[10px] font-mono text-teal px-2 py-0.5 bg-teal/10 rounded">Wayland + VAD</span>
            </div>

            <div className="glass p-6 space-y-4">
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Wayland support via wtype</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Text injection now works on Wayland desktops using wtype. Murmur auto-detects whether you are running X11 or Wayland and selects the correct backend (xdotool or wtype) automatically. No configuration needed.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Voice activity detection (VAD)</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  In tap mode, recording now stops automatically when silence is detected. No need to tap the hotkey a second time. Silence threshold and duration are tuned for natural speech pauses.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-amber font-semibold mb-2">audit: Pre-release security audit</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Full security audit completed before release. All critical findings identified and fixed.
                </p>
              </div>
            </div>
          </div>

          {/* v0.1.1 */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-lg font-extrabold text-glass-white font-mono">v0.1.1</span>
              <span className="text-[10px] font-mono text-glass-text/30 px-2 py-0.5 border border-glass-border rounded">2026-03-26</span>
              <span className="text-[10px] font-mono text-teal px-2 py-0.5 bg-teal/10 rounded">MVP polish</span>
            </div>

            <div className="glass p-6 space-y-4">
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Tap-to-toggle recording mode</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  New recording mode alongside hold-to-record. Tap the hotkey once to start, again to stop. Configurable in settings.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Show/hide skin + recording popup</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Hide the Comm Badge to system tray. When recording with skin hidden, a floating pill with the M logo and animated waveform bars appears at bottom-center. Accent colour follows your picker.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Settings redesign</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Ocean terminal theme with glass cards, teal accents, and brand logo header. Native GNOME window with proper resize, snap, and maximize.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] text-amber font-semibold mb-2">fix: Default accent colour</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Changed from cyan to brand green to match the website. Settings window background now matches theme with no white border flash.
                </p>
              </div>
            </div>
          </div>

          {/* v0.1.0 */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-lg font-extrabold text-glass-white font-mono">v0.1.0</span>
              <span className="text-[10px] font-mono text-glass-text/30 px-2 py-0.5 border border-glass-border rounded">2026-03-18</span>
              <span className="text-[10px] font-mono text-amber px-2 py-0.5 bg-amber/10 rounded">initial release</span>
            </div>

            <div className="glass p-6 space-y-4">
              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Slice 1: Transparent skinned gadget</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Transparent borderless window with click-through. Comm Badge skin with interactive zones (mic button, gear button, status LEDs). Skin loader with hot zone definitions from JSON config.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Slice 2: Audio capture pipeline</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  Real-time audio capture via cpal (PipeWire/PulseAudio). Live waveform visualisation on the Comm Badge display. Automatic device selection.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Slice 3: Whisper transcription + text injection</h3>
                <p className="text-xs text-glass-text leading-relaxed">
                  whisper.cpp integration via whisper-rs. Auto-download models from Hugging Face (SHA256 verified). Text injection via xdotool (XTEST). Global hotkey via tauri-plugin-global-shortcut (Ctrl+Shift+Space).
                </p>
              </div>

              <div>
                <h3 className="font-mono text-[11px] text-teal font-semibold mb-2">feat: Slice 4: Settings + packaging</h3>
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
