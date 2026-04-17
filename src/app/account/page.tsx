import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";

export default function AccountPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>account</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">whoami &amp;&amp; cat license.key</span></div>
      <p className="view-title">account</p>
      <p className="view-sub">Pro accounts launch alongside Murmur Pro. This page will show your license key, subscription status, and billing controls once Pro is live.</p>

      <div className="cmd-output">
        <p className="muted">pro accounts: coming soon</p>
      </div>

      <div className="manpage" style={{ marginTop: 16 }}>
        <h3>what is this page?</h3>
        <p>Once Murmur Pro launches, this is your Pro dashboard. Your account will be created automatically at checkout. You&apos;ll view your license key, check subscription status, and manage billing from here.</p>

        <h3>when will Pro launch?</h3>
        <p>We&apos;re finalising the checkout flow with our payment provider. To be notified, head to the <Link href="/pricing">pricing page</Link> and drop your email in the notify box. One email when Pro goes live. No drip campaigns.</p>
        <div style={{ margin: "10px 0 16px" }}><Link href="/pricing" className="cta">see pricing</Link></div>

        <h3>just want the free version?</h3>
        <p>No account needed. Full local dictation, zero telemetry, all yours. Just download and go.</p>
        <div style={{ margin: "10px 0", display: "flex", gap: 10, flexWrap: "wrap" as const }}>
          <Link href="/download" className="cta">download free</Link>
          <a href="https://github.com/murmurlinux" className="cta"><GithubIcon />source</a>
        </div>
      </div>

      <div className="footer">
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/pricing">pricing</Link><span className="dot">&middot;</span>
        <Link href="/download">download</Link>
      </div>
    </ViewAnimation>
  );
}
