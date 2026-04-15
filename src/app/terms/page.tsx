"use client";

import Link from "next/link";
import ViewAnimation from "@/components/ViewAnimation";

export default function TermsPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>terms</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cat terms.txt</span></div>
      <p className="view-title">terms of service</p>
      <p className="view-sub">This is a terms of service document. Don&apos;t worry, we kept it short. Effective: 2026-04-15.</p>

      <div className="manpage">
        <h3>free tier</h3>
        <p>The free version of Murmur is licensed under GPL v3. You can use it, modify it, and redistribute it under the terms of that license. See <code>LICENSE</code> in the source repository. No account required. No restrictions on usage.</p>

        <h3>pro tier</h3>
        <p>Pro is a paid subscription covering access to cloud STT engines, LLM text cleanup, and other premium features. Payment is processed by LemonSqueezy (Merchant of Record), who handles billing, tax, and refunds on our behalf.</p>
        <p>You can cancel your subscription at any time from your account page or by contacting <a href="mailto:billing@murmurlinux.com">billing@murmurlinux.com</a>. Access continues until the end of your current billing period. Lifetime purchases do not expire.</p>

        <h3>accounts</h3>
        <p>Your account is created automatically when you purchase Pro. You sign in with the email address you used at checkout via a magic link (no password). One account covers unlimited devices for one user. Do not share your account credentials.</p>

        <h3>cloud audio processing</h3>
        <p>Pro unlocks the ability to use cloud STT engines (Groq Whisper, Deepgram Nova-3). You provide your own API keys for these services. Your audio is sent directly from the Murmur app to the provider using your key. We never receive, store, proxy, or process your audio. Usage and costs are between you and the provider. See our <Link href="/privacy">privacy policy</Link> for details.</p>

        <h3>intellectual property</h3>
        <p>Your transcriptions belong to you. We claim no rights to any text produced by Murmur. The Murmur software, website, and brand are our property. The free version source code is available under GPL v3. Pro features are proprietary.</p>

        <h3>liability</h3>
        <p>Murmur is provided as-is. We do our best to ship a stable, reliable app, but we cannot guarantee perfection. Transcription accuracy depends on audio quality, model selection, and environmental conditions. Formal liability is limited to the amount you paid for Pro in the preceding 12 months.</p>

        <h3>termination</h3>
        <p>You may stop using Murmur at any time. We may terminate accounts that violate these terms. The free version is always available regardless of account status.</p>

        <h3>changes to these terms</h3>
        <p>We may update these terms. Material changes will be emailed to Pro subscribers at least 14 days before they take effect. Continued use after changes constitutes acceptance. The latest version is always available at this page.</p>

        <h3>contact</h3>
        <p className="indent">General: <a href="mailto:hello@murmurlinux.com">hello@murmurlinux.com</a></p>
        <p className="indent">Billing: <a href="mailto:billing@murmurlinux.com">billing@murmurlinux.com</a></p>
        <p className="indent">Support: <a href="mailto:support@murmurlinux.com">support@murmurlinux.com</a></p>
      </div>

      <div className="footer">
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/privacy">privacy</Link><span className="dot">&middot;</span>
        <Link href="/about">about</Link>
      </div>
    </ViewAnimation>
  );
}
