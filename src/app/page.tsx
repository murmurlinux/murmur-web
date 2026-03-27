import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import FaqAccordion from "@/components/FaqAccordion";
import WaitlistForm from "@/components/WaitlistForm";

/* ── SVG Icons ── */
function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

/* ── Waveform Bar helper ── */
function WaveBar({ min, max, duration, delay, color = "bg-teal/40" }: { min: number; max: number; duration: number; delay: number; color?: string }) {
  return (
    <div
      className={`wave-bar w-1 ${color} rounded-sm`}
      style={{ "--wave-min": `${min}px`, "--wave-max": `${max}px`, "--wave-duration": `${duration}s`, "--wave-delay": `${delay}s` } as React.CSSProperties}
    />
  );
}

/* ══════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <ScrollReveal />

      <div className="relative z-10">
        {/* ════════════════════ HERO ════════════════════ */}
        <section className="min-h-screen flex items-center pt-14">
          <div className="max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-teal mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-teal led" />
                linux-native &middot; offline &middot; open-source
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[68px] font-extrabold text-glass-white leading-[1.05] tracking-tight mb-8">
                Voice dictation<br />for Linux.<br /><span className="grad-text">Finally.</span>
              </h1>

              <p className="text-base text-glass-text leading-relaxed max-w-md mb-10">
                Press a hotkey, speak, text at your cursor. In any app.{" "}
                <span className="text-glass-light font-medium">Your voice never leaves your machine.</span>
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <a href="/download" className="cta-grad text-sm font-mono">$ murmur --install</a>
                <a href="#how" className="text-sm font-medium px-6 py-3.5 text-glass-text hover:text-glass-white transition-colors">How it works &darr;</a>
              </div>

              <div className="flex gap-6 text-[11px] font-mono text-glass-text">
                <span><span className="text-teal">&#x2713;</span> no account</span>
                <span><span className="text-amber">&#x2713;</span> ~5MB</span>
                <span><span className="text-teal">&#x2713;</span> GPL v3</span>
              </div>

              <p className="text-[11px] text-glass-text/50 mt-4">
                Pro coming soon. Cloud STT, LLM cleanup, 99+ languages.{" "}
                <a href="#waitlist" className="text-amber hover:text-amber/80 transition-colors underline underline-offset-2">Get notified</a>
              </p>
            </div>

            {/* Right — Comm Badge + terminal */}
            <div className="relative flex flex-col items-center gap-3">
              <div className="relative z-10">
                <Image
                  src="/images/comm-badge.png"
                  alt="Murmur Comm Badge"
                  width={480}
                  height={262}
                  priority
                  draggable={false}
                  className="max-w-full pointer-events-none"
                  style={{ filter: "drop-shadow(0 4px 30px rgba(20,184,166,0.25)) drop-shadow(0 0 60px rgba(20,184,166,0.1)) hue-rotate(-30deg)" }}
                />
              </div>

              <div className="relative z-20 w-full glass p-1.5">
                <div className="term">
                  <div className="term-bar">
                    <div className="term-dot bg-teal/50" />
                    <div className="term-dot bg-amber/50" />
                    <div className="term-dot bg-teal/50" />
                    <span className="ml-2 text-[10px] font-mono text-white/15">murmur — session</span>
                  </div>
                  <div className="px-4 py-3 font-mono text-[11px] text-white/40 leading-relaxed">
                    <div><span className="text-teal/60">&#x276f;</span> murmur --start --model tiny.en</div>
                    <div className="text-teal/40 mt-0.5">[INFO] Engine: whisper.cpp (75MB)</div>
                    <div className="text-teal/40">[INFO] Hotkey: Ctrl+Shift+Space</div>
                    <div className="text-amber/50">[READY] Hold hotkey to record.</div>
                    <div className="mt-2 text-white/25">&#x276f; recording...</div>
                    <div className="flex items-end gap-px h-4 my-1.5">
                      <WaveBar min={2} max={12} duration={0.7} delay={0} />
                      <WaveBar min={2} max={16} duration={1} delay={0.1} color="bg-amber/30" />
                      <WaveBar min={2} max={8} duration={0.8} delay={0.2} />
                      <WaveBar min={2} max={14} duration={1.1} delay={0.05} color="bg-amber/30" />
                      <WaveBar min={2} max={6} duration={0.6} delay={0.15} />
                    </div>
                    <div className="text-amber/50">[OK] &quot;Ship it to production, tests are passing&quot;</div>
                    <div className="text-teal/40">[OK] 42 chars &#x2192; Code ~/app</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ VALUE BAR ════════════════════ */}
        <section className="py-5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="glass px-6 py-3.5 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-mono text-glass-text">
              <span>offline=true</span><span className="text-white/8">|</span>
              <span>engine=whisper.cpp</span><span className="text-white/8">|</span>
              <span>platform=linux</span><span className="text-white/8">|</span>
              <span>display=x11</span><span className="text-white/8">|</span>
              <span>license=GPL-3.0</span>
            </div>
          </div>
        </section>

        {/* ════════════════════ PROBLEM ════════════════════ */}
        <section className="py-28 reveal">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[11px] font-mono uppercase tracking-widest text-amber mb-5">motivation</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-glass-white leading-tight tracking-tight mb-8">
              Built for how we work
            </h2>
            <p className="text-base text-glass-text leading-relaxed max-w-xl mx-auto">
              We wanted voice dictation that felt native to Linux — tiny, offline, and with a UI worth keeping on your desktop. <span className="text-glass-light font-semibold">So we built it.</span>
            </p>
          </div>
        </section>

        {/* ════════════════════ HOW IT WORKS ════════════════════ */}
        <section id="how" className="py-28 reveal">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-5">man murmur</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-glass-white tracking-tight">Three seconds.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {/* Step 1 */}
              <div className="glass p-6 reveal d1">
                <div className="term mb-4">
                  <div className="term-bar">
                    <div className="term-dot bg-amber/50" />
                    <span className="ml-2 text-[9px] font-mono text-white/15">step:01</span>
                  </div>
                  <div className="p-3 font-mono text-[11px]">
                    <div className="text-white/25">$ bind</div>
                    <div className="flex gap-1 mt-1">
                      <kbd className="px-1 py-0.5 bg-white/5 border border-white/8 rounded text-[9px] text-glass-light">Ctrl</kbd>
                      <span className="text-white/15">+</span>
                      <kbd className="px-1 py-0.5 bg-white/5 border border-white/8 rounded text-[9px] text-glass-light">Shift</kbd>
                      <span className="text-white/15">+</span>
                      <kbd className="px-1 py-0.5 bg-teal/10 border border-teal/20 rounded text-[9px] text-teal">Space</kbd>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-glass-white mb-1">Press hotkey</h3>
                <p className="text-xs text-glass-text">Configurable. Hold to record.</p>
              </div>

              {/* Step 2 */}
              <div className="glass p-6 reveal d2">
                <div className="term mb-4">
                  <div className="term-bar">
                    <div className="term-dot bg-teal/50" />
                    <span className="ml-2 text-[9px] font-mono text-white/15">step:02</span>
                  </div>
                  <div className="p-3 font-mono text-[11px]">
                    <div className="text-white/25">$ record --hold</div>
                    <div className="flex items-end gap-px h-4 mt-1">
                      <WaveBar min={1} max={12} duration={0.8} delay={0} />
                      <WaveBar min={1} max={14} duration={1} delay={0.1} color="bg-amber/30" />
                      <WaveBar min={1} max={8} duration={0.7} delay={0.2} />
                      <WaveBar min={1} max={12} duration={1.1} delay={0.15} color="bg-amber/30" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-glass-white mb-1">Speak</h3>
                <p className="text-xs text-glass-text">Whisper transcribes locally.</p>
              </div>

              {/* Step 3 */}
              <div className="glass p-6 reveal d3">
                <div className="term mb-4">
                  <div className="term-bar">
                    <div className="term-dot bg-amber/50" />
                    <span className="ml-2 text-[9px] font-mono text-white/15">step:03</span>
                  </div>
                  <div className="p-3 font-mono text-[11px]">
                    <div className="text-white/25">$ inject --cursor</div>
                    <div className="text-glass-light mt-1">Hello world<span className="blink text-teal">&#x258a;</span></div>
                  </div>
                </div>
                <h3 className="font-bold text-glass-white mb-1">Text at cursor</h3>
                <p className="text-xs text-glass-text">Any app. Universal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ FEATURES ════════════════════ */}
        <section id="features" className="py-28 reveal">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[11px] font-mono uppercase tracking-widest text-amber mb-5">murmur --help</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-3">Feature flags</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { flag: "--no-cloud", color: "text-teal", hover: "hover:border-teal/15", desc: "0ms cloud latency — there is no cloud. No account, no telemetry, no network." },
                { flag: "--skin comm-badge", color: "text-amber", hover: "hover:border-amber/15", desc: "Floating desktop gadget with customisable skins and accent colours." },
                { flag: "--target any", color: "text-teal", hover: "hover:border-teal/15", desc: "Universal XTEST injection. Terminals, IDEs, browsers — anything." },
                { flag: "--bind Super+V", color: "text-amber", hover: "hover:border-amber/15", desc: "Configurable global hotkey. Hold to record, release to transcribe." },
                { flag: "--model tiny|base|small", color: "text-teal", hover: "hover:border-teal/15", desc: "Tiny (75MB, ~3s), Base (142MB, ~8s), Small (466MB). Your call." },
                { flag: "--license GPL-3.0", color: "text-amber", hover: "hover:border-amber/15", desc: "Free, open source. Read the code, verify, contribute." },
              ].map((f) => (
                <div key={f.flag} className={`glass p-6 transition-all ${f.hover}`}>
                  <div className={`font-mono text-[11px] ${f.color} mb-2 font-semibold`}>{f.flag}</div>
                  <p className="text-xs text-glass-text leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ COMPARISON ════════════════════ */}
        <section id="compare" className="py-28 reveal">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-5">diff --competitors</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-glass-white tracking-tight">Stacks up</h2>
            </div>
            <div className="glass overflow-hidden">
              <div className="term-bar border-b border-white/5">
                <div className="term-dot bg-teal/50" />
                <span className="ml-2 text-[9px] font-mono text-white/15">murmur --compare</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] font-mono min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 text-glass-text font-normal">field</th>
                      <th className="py-3 px-3 text-teal font-bold">murmur</th>
                      <th className="py-3 px-3 text-glass-text font-normal"><a href="/compare/wispr-flow" className="hover:text-teal transition-colors">wispr</a></th>
                      <th className="py-3 px-3 text-glass-text font-normal">glaido</th>
                      <th className="py-3 px-3 text-glass-text font-normal"><a href="/compare/nerd-dictation" className="hover:text-teal transition-colors">nerd_dict</a></th>
                      <th className="py-3 px-3 text-glass-text font-normal"><a href="/compare/vocalinux" className="hover:text-teal transition-colors">vocalinux</a></th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr className="border-b border-white/[0.03]">
                      <td className="text-left py-2.5 px-4 text-glass-light">platform</td>
                      <td className="py-2.5 px-3 text-amber">linux</td>
                      <td className="py-2.5 px-3 text-glass-text">mac,win,ios</td>
                      <td className="py-2.5 px-3 text-glass-text">mac,win</td>
                      <td className="py-2.5 px-3 text-glass-text">linux</td>
                      <td className="py-2.5 px-3 text-glass-text">linux</td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="text-left py-2.5 px-4 text-glass-light">processing</td>
                      <td className="py-2.5 px-3 text-teal">local</td>
                      <td className="py-2.5 px-3 text-glass-text">cloud</td>
                      <td className="py-2.5 px-3 text-glass-text">servers</td>
                      <td className="py-2.5 px-3 text-glass-text">local</td>
                      <td className="py-2.5 px-3 text-glass-text">local</td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="text-left py-2.5 px-4 text-glass-light">gui</td>
                      <td className="py-2.5 px-3 text-amber">widget</td>
                      <td className="py-2.5 px-3 text-glass-text">tray</td>
                      <td className="py-2.5 px-3 text-glass-text">standard</td>
                      <td className="py-2.5 px-3 text-glass-text">none</td>
                      <td className="py-2.5 px-3 text-glass-text">gtk</td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="text-left py-2.5 px-4 text-glass-light">engine</td>
                      <td className="py-2.5 px-3 text-teal">whisper.cpp</td>
                      <td className="py-2.5 px-3 text-glass-text">proprietary</td>
                      <td className="py-2.5 px-3 text-glass-text">undisclosed</td>
                      <td className="py-2.5 px-3 text-glass-text">vosk</td>
                      <td className="py-2.5 px-3 text-glass-text">whisper.cpp</td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="text-left py-2.5 px-4 text-glass-light">binary</td>
                      <td className="py-2.5 px-3 text-teal">~5MB</td>
                      <td className="py-2.5 px-3 text-glass-text">~50MB</td>
                      <td className="py-2.5 px-3 text-glass-text">unknown</td>
                      <td className="py-2.5 px-3 text-glass-text">~1MB</td>
                      <td className="py-2.5 px-3 text-glass-text">~200MB+</td>
                    </tr>
                    <tr>
                      <td className="text-left py-2.5 px-4 text-glass-light">cost</td>
                      <td className="py-2.5 px-3 text-amber font-bold">$0</td>
                      <td className="py-2.5 px-3 text-glass-text">$144/yr</td>
                      <td className="py-2.5 px-3 text-glass-text">$20/mo</td>
                      <td className="py-2.5 px-3 text-glass-text">$0</td>
                      <td className="py-2.5 px-3 text-glass-text">$0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ USE CASES ════════════════════ */}
        <section className="py-28 reveal">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[11px] font-mono uppercase tracking-widest text-amber mb-5">use cases</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-glass-white tracking-tight">Who it&apos;s for</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { path: "~/dev", color: "text-teal", title: "Developers", desc: "Voice-code in your IDE. Dictate commits. VS Code, Neovim, Cursor, terminals." },
                { path: "~/write", color: "text-amber", title: "Writers", desc: "Draft at the speed of speech. 3x faster than typing." },
                { path: "~/a11y", color: "text-teal", title: "Accessibility", desc: "RSI, motor disabilities, tired hands. Voice input for Linux." },
                { path: "~/secure", color: "text-amber", title: "Air-Gapped", desc: "No internet needed. No cloud. Sensitive environments." },
              ].map((uc) => (
                <div key={uc.path} className="glass p-7">
                  <div className={`font-mono text-[11px] ${uc.color} mb-1`}>{uc.path}</div>
                  <h3 className="font-bold text-glass-white text-lg mb-2">{uc.title}</h3>
                  <p className="text-xs text-glass-text leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ SPECS ════════════════════ */}
        <section id="specs" className="py-28 reveal">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-5">neofetch</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-glass-white tracking-tight">Specs</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { value: "~5MB", label: ".deb" },
                { value: "~50MB", label: "ram" },
                { value: "<1s", label: "startup" },
                { value: "~3s", label: "transcribe" },
              ].map((s) => (
                <div key={s.label} className="glass p-5 text-center">
                  <div className="text-2xl font-extrabold grad-text mb-0.5">{s.value}</div>
                  <div className="text-[10px] font-mono text-glass-text uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass p-5">
                <div className="font-mono text-[11px] text-teal mb-3">stack:</div>
                <div className="space-y-1.5 text-[11px] font-mono">
                  {[["backend", "Rust + Tauri 2"], ["frontend", "SolidJS"], ["stt", "whisper.cpp"], ["audio", "cpal"], ["inject", "xdotool"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between"><span className="text-glass-text">{k}</span><span className="text-glass-light">{v}</span></div>
                  ))}
                </div>
              </div>
              <div className="glass p-5">
                <div className="font-mono text-[11px] text-amber mb-3">models:</div>
                <div className="space-y-1.5 text-[11px] font-mono">
                  {[["tiny.en", "75MB · ~3-4s"], ["base.en", "142MB · ~8-10s"], ["small.en", "466MB · ~20-30s"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between"><span className="text-glass-text">{k}</span><span className="text-glass-light">{v}</span></div>
                  ))}
                </div>
                <div className="text-[9px] font-mono text-glass-text/30 mt-2">auto-download · sha256</div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ DOWNLOAD ════════════════════ */}
        <section id="download" className="py-28 reveal">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[11px] font-mono uppercase tracking-widest text-amber mb-5">install</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-3">Ready in 30 seconds</h2>
            <p className="text-glass-text mb-10 text-sm">No account. No cloud.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="/download" className="cta-grad text-sm font-mono flex items-center gap-2"><DownloadIcon /> .deb</a>
              <a href="/download" className="glass px-6 py-3.5 text-sm font-mono text-glass-white hover:bg-white/5 transition-colors flex items-center gap-2 rounded-xl"><DownloadIcon /> .AppImage</a>
            </div>
            <div className="glass p-4 text-left font-mono text-[11px] max-w-md mx-auto">
              <div className="text-glass-text/25"># quick install</div>
              <div className="text-teal/70 mt-1">wget <span className="text-glass-text/40">https://github.com/murmurlinux/murmur/releases/latest</span></div>
              <div className="text-teal/70">chmod +x <span className="text-glass-text/40">latest.AppImage &amp;&amp; ./latest.AppImage</span></div>
            </div>
          </div>
        </section>

        {/* ════════════════════ WAITLIST ════════════════════ */}
        <section id="waitlist" className="py-20 reveal">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-[11px] font-mono uppercase tracking-widest text-amber mb-5">pro tier</p>
            <h2 className="text-2xl font-extrabold text-glass-white tracking-tight mb-3">
              Get notified when Pro launches
            </h2>
            <p className="text-sm text-glass-text mb-8">
              Cloud STT, LLM cleanup, 99+ languages, CLI mode. Be first to know.
            </p>
            <WaitlistForm />
          </div>
        </section>

        {/* ════════════════════ OPEN SOURCE ════════════════════ */}
        <section className="py-28 reveal">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-4">Open source</h2>
            <p className="text-glass-text mb-8 max-w-md mx-auto text-sm">GPL v3. Read it. Verify it. Contribute.</p>
            <a href="https://github.com/murmurlinux/murmur" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 glass px-7 py-3.5 rounded-xl text-sm font-mono text-glass-white hover:bg-white/5 transition-colors">
              <GitHubIcon /> git clone murmur
            </a>
          </div>
        </section>

        {/* ════════════════════ FAQ ════════════════════ */}
        <section className="py-28 reveal">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-extrabold text-glass-white tracking-tight">Questions</h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* Footer is now in layout.tsx */}
      </div>
    </>
  );
}
