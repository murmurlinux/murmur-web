"use client";

import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";

export default function WhyMurmurPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span><Link href="/blog">blog</Link><span className="sep">/</span>why-murmur</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cat /posts/why-murmur.md</span></div>
      <p className="view-title">Why Murmur</p>
      <p className="view-sub">Why Linux deserved a dictation app that doesn&apos;t suck. Published April 2026.</p>

      <div className="manpage">
        <p>[Article content to be written. This post will cover: the gap in Linux voice dictation, what exists on Mac/Windows but not Linux, why local-first matters, and what Murmur does differently.]</p>
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
        <Link href="/pricing">pricing</Link>
      </div>
    </ViewAnimation>
  );
}
