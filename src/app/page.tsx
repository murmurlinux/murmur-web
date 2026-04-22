"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import { APP_VERSION } from "@/lib/app-version";

const ASCII_LOGO_FULL = ` __  __                                    _     _
|  \\/  |_   _ _ __ _ __ ___  _   _ _ __   | |   (_)_ __  _   ___  __
| |\\/| | | | | '__| '_ \` _ \\| | | | '__|  | |   | | '_ \\| | | \\ \\/ /
| |  | | |_| | |  | | | | | | |_| | |     | |___| | | | | |_| |>  <
|_|  |_|\\__,_|_|  |_| |_| |_|\\__,_|_|     |_____|_|_| |_|\\__,_/_/\\_\\`;

const ASCII_LOGO_MURMUR = ` __  __
|  \\/  |_   _ _ __ _ __ ___  _   _ _ __
| |\\/| | | | | '__| '_ \` _ \\| | | | '__|
| |  | | |_| | |  | | | | | | |_| | |
|_|  |_|\\__,_|_|  |_| |_| |_|\\__,_|_|`;

const ASCII_LOGO_LINUX = ` _     _
| |   (_)_ __  _   ___  __
| |   | | '_ \\| | | \\ \\/ /
| |___| | | | | |_| |>  <
|_____|_|_| |_|\\__,_/_/\\_\\`;

interface BootLineSpec {
  text: string;
  status?: string;
  statusClass?: string;
  isFinal?: boolean;
}

const BOOT_LINES: BootLineSpec[] = [
  { text: `murmur_os v${APP_VERSION} - booting...` },
  { text: "loading whisper_engine.pkg              ", status: "[ok]", statusClass: "ok" },
  { text: "loading silero_vad.pkg                  ", status: "[ok]", statusClass: "ok" },
  { text: "loading global_hotkeys.pkg              ", status: "[ok]", statusClass: "ok" },
  { text: "mounting /microphone                    ", status: "[live]", statusClass: "live" },
  { text: "checking pro_release_status             ", status: "[ok]", statusClass: "ok" },
  { text: "ready.", isFinal: true },
];

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function randBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createBootLine(spec: BootLineSpec): HTMLDivElement {
  const div = document.createElement("div");
  div.className = "boot-line";
  if (spec.isFinal) {
    const span = document.createElement("span");
    span.style.color = "var(--accent)";
    span.style.fontWeight = "700";
    span.style.letterSpacing = "0.06em";
    span.textContent = spec.text;
    div.appendChild(span);
  } else {
    div.appendChild(document.createTextNode(spec.text));
    if (spec.status && spec.statusClass) {
      const statusSpan = document.createElement("span");
      statusSpan.className = spec.statusClass;
      statusSpan.textContent = spec.status;
      div.appendChild(statusSpan);
    }
  }
  return div;
}

export default function HomePage() {
  const bootRef = useRef<HTMLDivElement>(null);
  const hasBooted = useRef(false);

  const reveal = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("typed-hidden");
    el.classList.add("typed-visible");
  }, []);

  const addCursor = useCallback((container: HTMLElement) => {
    const c = document.createElement("span");
    c.className = "cursor";
    container.appendChild(c);
    return c;
  }, []);

  const typeChars = useCallback(
    async (textEl: HTMLElement, text: string, speed: number) => {
      const cur = addCursor(textEl);
      for (let i = 0; i < text.length; i++) {
        textEl.insertBefore(document.createTextNode(text[i]), cur);
        await wait(speed);
      }
      cur.remove();
    },
    [addCursor]
  );

  const typePromptAndReveal = useCallback(
    async (
      promptId: string,
      cmdTextId: string,
      cmdString: string,
      revealIds: string[],
      cmdSpeed = 38
    ) => {
      const promptEl = document.getElementById(promptId);
      const cmdEl = document.getElementById(cmdTextId);
      if (!promptEl || !cmdEl) return;

      promptEl.classList.remove("typed-hidden");
      promptEl.classList.add("typed-visible");
      const cur = addCursor(cmdEl);
      await wait(2800);

      cur.remove();
      await typeChars(cmdEl, cmdString, cmdSpeed);
      await wait(180);

      for (const rid of revealIds) {
        reveal(rid);
        await wait(80);
      }
    },
    [addCursor, typeChars, reveal]
  );

  const initScrollObservers = useCallback(
    (skipAnimation: boolean) => {
      const scrollSections: Record<
        string,
        { prompted: boolean; cmd: string; reveals: string[] }
      > = {
        demo: {
          prompted: skipAnimation,
          cmd: "cat how-it-works.txt",
          reveals: ["demo-panels", "demo-ctas", "demo-scroll"],
        },
        "pricing-home": {
          prompted: skipAnimation,
          cmd: "cat pricing.txt",
          reveals: [
            "pricing-home-output",
            "pricing-home-ctas",
            "footer-home",
          ],
        },
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const key = (entry.target as HTMLElement).dataset.typewriter;
            if (!key) return;
            const sec = scrollSections[key];
            if (!sec || sec.prompted) return;
            sec.prompted = true;
            typePromptAndReveal(
              key + "-prompt",
              key + "-cmd-text",
              sec.cmd,
              sec.reveals,
              35
            );
          });
        },
        { threshold: 0.4 }
      );

      document
        .querySelectorAll("[data-typewriter]")
        .forEach((el) => observer.observe(el));
    },
    [typePromptAndReveal]
  );

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    async function runBoot() {
      const bootEl = bootRef.current;
      if (!bootEl) return;
      const delays = [90, 180, 60, 250, 110, 70, 320, 0];
      for (let i = 0; i < BOOT_LINES.length; i++) {
        const div = createBootLine(BOOT_LINES[i]);
        bootEl.appendChild(div);
        if (i < BOOT_LINES.length - 1) {
          await wait(delays[i] + randBetween(-30, 50));
        }
      }
      const readyEl = bootEl.lastElementChild;
      const readyText = readyEl?.querySelector("span") || (readyEl as HTMLElement);
      const dotsSpan = document.createElement("span");
      readyText?.appendChild(dotsSpan);
      for (let d = 0; d < 4; d++) {
        await wait(randBetween(280, 520));
        dotsSpan.textContent += ".";
      }
      await wait(350);
      dotsSpan.remove();
      if (readyText) readyText.textContent = "done.";
      await wait(1000);
    }

    async function collapseBoot() {
      const bootEl = bootRef.current;
      if (!bootEl) return;
      await wait(350);
      bootEl.style.opacity = "0";
      bootEl.style.maxHeight = "0";
      bootEl.style.marginBottom = "0";
      await wait(450);
      bootEl.style.display = "none";
    }

    async function runHeroSequence() {
      await runBoot();
      await collapseBoot();
      await typePromptAndReveal(
        "hero-prompt",
        "hero-cmd-text",
        "whoami",
        ["hero-output", "hero-compare", "hero-ctas"],
        45
      );
      await wait(600);
      reveal("scroll-hint");
      initScrollObservers(false);
    }

    runHeroSequence();
  }, [typePromptAndReveal, reveal, initScrollObservers]);

  function scrollToNext(e: React.MouseEvent) {
    const hint = (e.target as HTMLElement).closest(".scroll-hint");
    if (!hint) return;
    const screen = hint.closest(".screen");
    if (screen) {
      const next = screen.nextElementSibling;
      if (next && next.classList.contains("screen")) {
        const top = (next as HTMLElement).offsetTop - 24;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }

  function openDemo(e: React.MouseEvent) {
    e.preventDefault();
    const lb = document.getElementById("lightbox");
    if (lb) {
      lb.classList.add("active");
      lb.setAttribute("aria-hidden", "false");
    }
  }

  return (
    <>
      {/* SCREEN 1: HERO */}
      <section className="screen" id="screen-hero">
        <div className="site-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Murmur" className="site-logo" />
          <pre className="ascii-logo" aria-label="Murmur">{ASCII_LOGO_MURMUR}</pre>
          <span className="site-version">v{APP_VERSION}</span>
        </div>
        <div id="boot-screen" ref={bootRef}></div>

        <div className="hero-body">
          <div className="cmd-line typed-hidden" id="hero-prompt">
            <span className="cmd-prompt">$</span>
            <span className="cmd" id="hero-cmd-text"></span>
          </div>
          <div className="cmd-output typed-hidden" id="hero-output">
            <p>Murmur. Voice dictation for Linux that doesn&apos;t suck.</p>
            <p>
              Built in Rust and Tauri.{" "}
              <span className="ok">100% local by default.</span> Zero telemetry.
            </p>
            <p className="muted">
              Press a hotkey, speak, text at your cursor. In any app. ~15 MB.
              Free forever, Pro available.
            </p>
          </div>
          <div className="hero-compare typed-hidden" id="hero-compare">
            <div className="hdr">feature</div>
            <div className="hdr">free</div>
            <div className="hdr">pro</div>
            <div>local whisper.cpp (3 models)</div><div className="on">[+]</div><div className="on">[+]</div>
            <div>gpu acceleration (vulkan)</div><div className="on">[+]</div><div className="on">[+]</div>
            <div>push-to-talk + voice detection</div><div className="on">[+]</div><div className="on">[+]</div>
            <div>universal text injection</div><div className="on">[+]</div><div className="on">[+]</div>
            <div>99+ languages + translation</div><div className="on">[+]</div><div className="on">[+]</div>
            <div>cloud stt (groq + deepgram)</div><div className="off">[-]</div><div className="on">[+]</div>
            <div>llm cleanup + punctuation</div><div className="off">[-]</div><div className="on">[+]</div>
            <div>custom dictionaries + hot words</div><div className="off">[-]</div><div className="on">[+]</div>
            <div>context-aware conditioning</div><div className="off">[-]</div><div className="on">[+]</div>
            <div>transcript history</div><div className="off">[-]</div><div className="on">[+]</div>
            <div>voice commands + cli mode</div><div className="off">[-]</div><div className="on">[+]</div>
          </div>
          <div className="screen-cta typed-hidden" id="hero-ctas">
            <Link href="/pricing" className="cta primary">get murmur pro</Link>
            <span className="or">or</span>
            <Link href="/download" className="cta">download free</Link>
            <span className="or">&middot;</span>
            <a href="https://github.com/murmurlinux" className="cta"><GithubIcon />github</a>
          </div>
        </div>
        <div className="scroll-hint typed-hidden" id="scroll-hint" onClick={scrollToNext}>
          click or scroll for more &darr;
        </div>
      </section>

      {/* SCREEN 2: HOW IT WORKS */}
      <section className="screen" id="screen-demo" data-typewriter="demo">
        <div className="cmd-line typed-hidden" id="demo-prompt">
          <span className="cmd-prompt">$</span>
          <span className="cmd" id="demo-cmd-text"></span>
        </div>

        <div className="typed-hidden" id="demo-panels">
          <div className="demo-block">
            <span className="demo-label">murmur free : 100% offline</span>
            <p className="step">1. hold your hotkey (default: Ctrl+Shift+Space)</p>
            <p className="step">2. speak naturally</p>
            <p className="step">3. release</p>
            <p className="output">&quot;The quick brown fox jumps over the lazy dog.&quot;</p>
            <p className="meta">Text appears at your cursor. Any app. Nothing leaves your machine, ever. Runs whisper.cpp locally on your CPU. Free, open source (GPL v3), no account needed. For anyone who wants solid voice dictation without the overhead.</p>
          </div>

          <div className="demo-block" style={{ borderColor: "var(--accent)" }}>
            <span className="demo-label">murmur pro : cloud + cli<span className="pro-tag">pro</span></span>
            <p><span className="cmd-prompt">$</span> murmur-cli record --clipboard</p>
            <p className="step">Recording... press Ctrl+C to stop</p>
            <p className="step">Captured 2.3s of audio</p>
            <p className="step">Transcribing...</p>
            <p className="output">&quot;The quick brown fox jumps over the lazy dog.&quot;</p>
            <p className="meta">Copied to clipboard.</p>
            <p className="meta">Everything in free, plus cloud engines (Groq, Deepgram) for faster, more accurate transcription. Audio goes directly to the provider, never to us. Adds CLI mode, LLM cleanup, custom dictionaries, and more. Closed source. For professionals and heavy users.</p>
          </div>
        </div>

        <div className="screen-cta typed-hidden" id="demo-ctas">
          <a href="#" className="cta" onClick={openDemo}>watch demo</a>
          <span className="or">&middot;</span>
          <Link href="/pricing" className="cta primary">get murmur pro</Link>
          <span className="or">&middot;</span>
          <Link href="/download" className="cta">download free</Link>
        </div>
        <div className="scroll-hint typed-hidden" id="demo-scroll" onClick={scrollToNext}>
          click or scroll for more &darr;
        </div>
      </section>

      {/* SCREEN 3: PRICING + CLOSE */}
      <section className="screen" id="screen-pricing" data-typewriter="pricing-home">
        <div className="cmd-line typed-hidden" id="pricing-home-prompt">
          <span className="cmd-prompt">$</span>
          <span className="cmd" id="pricing-home-cmd-text"></span>
        </div>
        <div className="cmd-output typed-hidden" id="pricing-home-output">
          <p><span className="accent">FREE</span> <span className="muted">&middot;</span> The full desktop app with local whisper.cpp transcription. Unlimited use, 99+ languages, zero telemetry. Open source under GPL v3, no account required, yours forever. Everything you need for everyday voice dictation.</p>
          <p style={{ marginTop: 10 }}><span className="accent">PRO</span> <span className="muted">&middot;</span> Everything in free, plus cloud engines (Groq Whisper, Deepgram Nova-3) for faster, more accurate results. Adds LLM text cleanup, custom dictionaries, voice commands, CLI mode, and priority support. For professionals and heavy users who want the best.</p>

          <div style={{ marginTop: 14, padding: "12px 16px", border: "1px solid var(--border)", background: "var(--card)", maxWidth: 480 }}>
            <p style={{ margin: "0 0 6px" }}><span className="accent" style={{ fontWeight: 700 }}>Founding member special:</span> <span style={{ textDecoration: "line-through", color: "var(--text-dim)" }}>$249</span> <strong>$149</strong> one-time lifetime purchase. Limited availability.</p>
            <p style={{ margin: 0, fontSize: 12 }} className="muted">Or subscribe: $69/year (founding price, normally $99) &middot; $12/month. Cancel anytime.</p>
          </div>

          <p className="muted" style={{ marginTop: 10, fontSize: 12 }}>Want to stay in the loop? Type <span className="accent">subscribe you@email.com</span> below.</p>
        </div>
        <div className="screen-cta typed-hidden" id="pricing-home-ctas">
          <Link href="/pricing" className="cta">see full pricing</Link>
          <span className="or">or</span>
          <Link href="/pricing" className="cta primary">get murmur pro</Link>
        </div>

        <div className="footer typed-hidden" id="footer-home">
          <Link href="/about">about</Link><span className="dot">&middot;</span>
          <Link href="/docs">docs</Link><span className="dot">&middot;</span>
          <Link href="/changelog">changelog</Link><span className="dot">&middot;</span>
          <Link href="/blog">blog</Link><span className="dot">&middot;</span>
          <Link href="/privacy">privacy</Link><span className="dot">&middot;</span>
          <Link href="/terms">terms</Link><span className="dot">&middot;</span>
          <a href="https://github.com/murmurlinux">github</a><span className="dot">&middot;</span>
          <a href="mailto:hello@murmurlinux.com">hello@murmurlinux.com</a>
        </div>
      </section>
    </>
  );
}
