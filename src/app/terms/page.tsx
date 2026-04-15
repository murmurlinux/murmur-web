"use client";

import Link from "next/link";
import ViewAnimation from "@/components/ViewAnimation";

export default function TermsPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>terms</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cat terms.txt</span></div>
      <p className="view-title">terms of service</p>
      <p className="view-sub">This is a terms of service document. Don&apos;t worry, we kept it short. Effective: 2026-04-13.</p>

      <div className="manpage">
        <h3>free tier</h3>
        <p>The free version of Murmur is licensed under GPL v3. You can use it, modify it, and redistribute it under the terms of that license. See <code>LICENSE</code> in the source repository.</p>

        <h3>pro tier</h3>
        <p>Pro is a paid subscription covering access to cloud engines and premium features. Payment processed by LemonSqueezy (Merchant of Record). Cancel anytime. No refunds on pro-rated unused time.</p>

        <h3>license keys</h3>
        <p>Each paid account receives a license key validated on the desktop app. One license covers unlimited devices for one user. Team plans available on request.</p>

        <h3>fair use</h3>
        <p>Pro cloud engines are metered fairly: 10 hours of dictation per month included. Excess usage gets rate-limited, not billed. Team plans have higher limits.</p>

        <h3>liability</h3>
        <p>Murmur is provided as-is. We do our best to ship a stable app but we can&apos;t guarantee perfection. If Murmur breaks something, we&apos;ll work with you to fix it, but the formal liability is limited to the amount you paid for Pro in the preceding 12 months.</p>

        <h3>updates</h3>
        <p>We may update these terms. Material changes get emailed to Pro subscribers. Continued use after changes constitutes acceptance.</p>
      </div>

      <div className="footer">
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/privacy">privacy</Link><span className="dot">&middot;</span>
        <Link href="/about">about</Link>
      </div>
    </ViewAnimation>
  );
}
