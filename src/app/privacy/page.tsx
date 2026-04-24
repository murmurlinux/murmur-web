"use client";

import Link from "next/link";
import ViewAnimation from "@/components/ViewAnimation";
import PageFooter from "@/components/PageFooter";

export default function PrivacyPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>privacy</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cat privacy.txt</span></div>
      <p className="view-title">privacy policy</p>
      <p className="view-sub">tl;dr: we don&apos;t spy on you. Scroll down for the lawyer-friendly version. Last updated: 2026-04-15.</p>

      <div className="manpage">
        <h3>the short version</h3>
        <p>The free version of Murmur runs entirely on your machine. Your audio, your transcriptions, and your configuration never leave your computer. There is no telemetry, no analytics, no phone-home. We cannot see what you dictate, when you use the app, or how often. We designed it this way on purpose. Pro users can optionally enable LLM cleanup, which is cloud-based but goes directly from your device to the provider you choose, not through our servers.</p>

        <h3>what we collect</h3>
        <p className="indent">- <strong>Free users:</strong> nothing. Zero data leaves your machine.</p>
        <p className="indent">- <strong>Pro subscribers:</strong> your email address (for account and billing). That&apos;s it.</p>
        <p className="indent">- <strong>Waitlist/newsletter:</strong> your email address, if you choose to subscribe.</p>

        <h3>what we don&apos;t collect</h3>
        <p className="indent">- Audio recordings.</p>
        <p className="indent">- Transcribed text.</p>
        <p className="indent">- Usage metrics or session data.</p>
        <p className="indent">- Device fingerprints or hardware identifiers.</p>
        <p className="indent">- Crash reports (unless you opt in via Sentry, which is off by default).</p>

        <h3>pro tier: cloud speech engines</h3>
        <p>Pro unlocks the ability to use cloud STT engines (Groq Whisper, Deepgram Nova-3) with your own API keys. The key points:</p>
        <p className="indent">- You provide your own API keys. We do not supply, manage, or have access to them.</p>
        <p className="indent">- Audio goes directly from your machine to the provider. It does not pass through our servers.</p>
        <p className="indent">- We never receive, store, or have access to your audio or transcriptions.</p>
        <p className="indent">- Usage and costs are between you and the provider.</p>
        <p className="indent">- You can switch back to the local engine at any time. Cloud is always opt-in.</p>
        <p>Provider data handling is governed by each provider&apos;s own privacy policy:</p>
        <p className="indent">- <strong>Groq:</strong> does not retain audio after transcription completes (as of writing).</p>
        <p className="indent">- <strong>Deepgram:</strong> configurable retention, supports zero-retention mode.</p>

        <h3>LLM cleanup (Pro, optional)</h3>
        <p>Pro users can enable LLM cleanup, which sends the raw Whisper transcript to a cloud LLM provider of your choice (<a href="https://groq.com" target="_blank" rel="noopener noreferrer">Groq</a> or <a href="https://anthropic.com" target="_blank" rel="noopener noreferrer">Anthropic</a>) for grammar, punctuation, and filler-word cleanup. This only happens when you enable it and provide your own API key (BYOK). Murmur does not run any intermediate server for this feature: the request goes directly from your device to the provider you select. Their data-handling policy applies. The API key is stored locally in Murmur&apos;s settings file on your device (plaintext at rest, mode 0600); we are evaluating OS keyring storage for a future release. The feature is off by default until you enter a key and enable it.</p>

        <h3>website</h3>
        <p>This website uses Vercel Speed Insights (privacy-preserving, no cookies). We do not use tracking cookies, advertising pixels, or third-party analytics.</p>

        <h3>data storage</h3>
        <p>Pro account data (email, subscription status) is stored in Supabase (hosted in ap-southeast-2, Sydney). Waitlist emails are stored in the same database. We use row-level security and encrypted connections.</p>

        <h3>your rights</h3>
        <p>You can request deletion of your data at any time by emailing <a href="mailto:hello@murmurlinux.com">hello@murmurlinux.com</a>. We will delete your account, subscription records, and any associated data within 14 days. Newsletter subscribers can unsubscribe via the link in any email.</p>

        <h3>children</h3>
        <p>Murmur is not directed at children under 13. We do not knowingly collect data from children.</p>

        <h3>changes</h3>
        <p>We may update this policy. Material changes will be emailed to Pro subscribers. The latest version is always available at this page.</p>

        <h3>contact</h3>
        <p className="indent"><a href="mailto:hello@murmurlinux.com">hello@murmurlinux.com</a></p>
      </div>

      <PageFooter />
    </ViewAnimation>
  );
}
