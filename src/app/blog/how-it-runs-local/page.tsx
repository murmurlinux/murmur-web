"use client";

import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";

export default function HowItRunsLocalPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span><Link href="/blog">blog</Link><span className="sep">/</span>how-it-runs-local</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cat /posts/how-it-runs-local.md</span></div>
      <p className="view-title">How It Runs Local</p>
      <p className="view-sub">whisper.cpp, silero vad, and the full local pipeline. Published April 2026.</p>

      <div className="manpage">
        <p>[Article content to be written. This post will cover: the audio capture pipeline (cpal), voice activity detection (silero vad), speech-to-text (whisper.cpp), text cleanup, and clipboard injection. A technical walkthrough of how Murmur processes your voice without any network calls.]</p>
      </div>

      <div className="cta-row" style={{ marginTop: 24 }}>
        <Link href="/blog" className="cta">back to posts</Link>
        <Link href="/download" className="cta">download free</Link>
        <Link href="/pricing" className="cta primary">get pro</Link>
        <a href="https://github.com/murmurlinux" className="cta"><GithubIcon />github</a>
      </div>

      <div className="footer">
        <Link href="/blog">blog</Link><span className="dot">&middot;</span>
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/docs">docs</Link>
      </div>
    </ViewAnimation>
  );
}
