"use client";

import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";

export default function BlogPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>blog</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">ls -la /posts/</span></div>
      <p className="view-title">blog</p>
      <p className="view-sub">Notes from the workshop. How we build Murmur, why we make the choices we do, and what&apos;s coming next. Written by the people who write the code.</p>

      <div className="post-list">
        <div className="hdr">title</div><div className="hdr">size</div><div className="hdr">date</div><div className="hdr">description</div>

        <div><Link href="/blog/why-murmur">why-murmur.md</Link></div><div>3.2kb</div><div>2026-04</div><div>Why Linux deserved a dictation app that doesn&apos;t suck.</div>
        <div><Link href="/blog/introducing-pro">introducing-pro.md</Link></div><div>2.8kb</div><div>2026-04</div><div>How we structured the Pro tier and what founding members get.</div>
        <div><Link href="/blog/how-it-runs-local">how-it-runs-local.md</Link></div><div>4.1kb</div><div>2026-04</div><div>whisper.cpp, silero vad, and the full local pipeline.</div>
      </div>

      <p className="muted" style={{ marginTop: 24, fontSize: 13 }}>Want to know when we publish? Type <span className="accent">subscribe you@email.com</span> in the terminal below.</p>

      <div className="cta-row" style={{ marginTop: 20 }}>
        <Link href="/download" className="cta">download free</Link>
        <Link href="/pricing" className="cta primary">get pro</Link>
        <a href="https://github.com/murmurlinux" className="cta"><GithubIcon />github</a>
      </div>

      <div className="footer">
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/about">about</Link><span className="dot">&middot;</span>
        <Link href="/docs">docs</Link>
      </div>
    </ViewAnimation>
  );
}
