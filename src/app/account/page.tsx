"use client";

import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";

export default function AccountPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>account</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">whoami &amp;&amp; cat license.key</span></div>
      <p className="view-title">account</p>
      <p className="view-sub">This is your Pro dashboard. View your license key, manage your subscription, and check your plan status.</p>

      <div className="cmd-output">
        <p className="err">401 unauthorized. you&apos;re not signed in.</p>
      </div>

      <div className="manpage" style={{ marginTop: 16 }}>
        <h3>what is this page?</h3>
        <p>After purchasing Murmur Pro, this page shows your license key, subscription status, and billing controls. Your account is created automatically at checkout.</p>

        <h3>how do i get here?</h3>
        <p>Purchase Pro from the pricing page. You&apos;ll receive a magic link email. Click it and you&apos;ll land here, logged in. From here you can view your license key, check your plan status, and manage your subscription.</p>
        <div style={{ margin: "10px 0 16px" }}><Link href="/pricing" className="cta primary">get murmur pro</Link></div>

        <h3>already purchased?</h3>
        <p>Sign in with the email you used at checkout. We&apos;ll send a new magic link.</p>
        <div style={{ margin: "10px 0 16px" }}><Link href="/login" className="cta">sign in</Link></div>

        <h3>just want the free version?</h3>
        <p>No account needed. Just download and go. No judgement.</p>
        <div style={{ margin: "10px 0", display: "flex", gap: 10, flexWrap: "wrap" as const }}>
          <Link href="/download" className="cta">download free</Link>
          <a href="https://github.com/murmurlinux" className="cta"><GithubIcon />source</a>
        </div>
      </div>

      <div className="footer">
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/login">sign in</Link><span className="dot">&middot;</span>
        <Link href="/pricing">pricing</Link><span className="dot">&middot;</span>
        <Link href="/download">download</Link>
      </div>
    </ViewAnimation>
  );
}
