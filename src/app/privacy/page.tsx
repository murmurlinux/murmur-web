"use client";

import Link from "next/link";
import ViewAnimation from "@/components/ViewAnimation";

export default function PrivacyPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>privacy</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cat privacy.txt</span></div>
      <p className="view-title">privacy policy</p>
      <p className="view-sub">tl;dr: we don&apos;t spy on you. Scroll down for the lawyer-friendly version. Last updated: 2026-04-11.</p>

      <div className="manpage">
        <h3>the short version</h3>
        <p>The free version of Murmur runs entirely on your machine. Your audio, your transcriptions, and your configuration never leave your computer. There is no telemetry, no analytics, no phone-home.</p>

        <h3>what we don&apos;t collect</h3>
        <p className="indent">- Audio recordings.</p>
        <p className="indent">- Transcribed text.</p>
        <p className="indent">- Usage metrics or session data.</p>
        <p className="indent">- Crash reports (unless you opt in).</p>

        <h3>pro tier (cloud engines)</h3>
        <p>If you use a cloud engine in Pro (Groq Whisper or Deepgram Nova-3), your audio is sent to that provider for transcription. Providers have their own retention policies:</p>
        <p className="indent">- Groq: does not retain audio after transcription (as of writing).</p>
        <p className="indent">- Deepgram: configurable retention. We use zero-retention mode by default.</p>
        <p>We never receive a copy of this audio or the transcript. The connection goes directly from Murmur to the provider using your license-associated API quota.</p>

        <h3>website</h3>
        <p>This website uses minimal analytics (Vercel Speed Insights, privacy-preserving). No cookies for tracking. Optional chat widget is self-hosted and doesn&apos;t share conversations with third parties.</p>

        <h3>contact</h3>
        <p className="indent">Questions: <a href="mailto:privacy@murmurlinux.com">privacy@murmurlinux.com</a></p>
      </div>

      <div className="footer">
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/terms">terms</Link><span className="dot">&middot;</span>
        <Link href="/about">about</Link>
      </div>
    </ViewAnimation>
  );
}
