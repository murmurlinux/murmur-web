"use client";

import Link from "next/link";
import ViewAnimation from "@/components/ViewAnimation";

export default function ChangelogPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>changelog</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">git log --oneline --decorate</span></div>
      <p className="view-title">changelog</p>
      <p className="view-sub">Every Murmur release in reverse chronological order.</p>

      <div style={{ marginTop: 16 }}>
        <div className="commit">
          <div><span className="hash">a3f9c1d</span><span className="tag">v0.3.3</span></div>
          <div className="meta">2026-04-08 &middot; Murmur Team</div>
          <p className="msg">Hallucination fix + GPU acceleration</p>
          <ul>
            <li>trim trailing silence before whisper to prevent phantom text</li>
            <li>vulkan GPU acceleration via whisper-rs 0.16</li>
            <li>onboarding: interactive mic check</li>
            <li>system tray tooltip shows current status</li>
          </ul>
        </div>

        <div className="commit">
          <div><span className="hash">9e2b4c7</span><span className="tag">v0.3.0</span></div>
          <div className="meta">2026-03-18 &middot; Murmur Team</div>
          <p className="msg">Pluggable engines + multi-language</p>
          <ul>
            <li>pluggable STT engine architecture (C1)</li>
            <li>groq whisper cloud engine (C2)</li>
            <li>multi-language support (99+ languages)</li>
            <li>onboarding wizard with hotkey setup</li>
          </ul>
        </div>

        <div className="commit">
          <div><span className="hash">4d1a830</span><span className="tag">v0.2.1</span></div>
          <div className="meta">2026-02-24 &middot; Murmur Team</div>
          <p className="msg">Production hardening</p>
          <ul>
            <li>CLI mode (murmur-cli)</li>
            <li>auto-update system</li>
            <li>start-on-login setting</li>
          </ul>
        </div>

        <div className="commit">
          <div><span className="hash">c7e5f22</span><span className="tag">v0.2.0</span></div>
          <div className="meta">2026-02-01 &middot; Murmur Team</div>
          <p className="msg">Initial public release</p>
          <ul>
            <li>local whisper.cpp transcription</li>
            <li>silero vad gate</li>
            <li>global hotkey + clipboard paste</li>
          </ul>
        </div>
      </div>

      <p className="muted" style={{ marginTop: 24, fontSize: 12 }}>
        full history: <a href="https://github.com/murmurlinux/murmur/blob/main/CHANGELOG.md">CHANGELOG.md</a> &middot;
        releases: <a href="https://github.com/murmurlinux/murmur/releases">github.com/murmurlinux/murmur/releases</a>
      </p>

      <div className="footer">
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/download">download</Link><span className="dot">&middot;</span>
        <Link href="/docs">docs</Link>
      </div>
    </ViewAnimation>
  );
}
