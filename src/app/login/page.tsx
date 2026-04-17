import Link from "next/link";
import ViewAnimation from "@/components/ViewAnimation";

export default function LoginPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>login</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">login</span></div>
      <p className="view-title">sign in</p>
      <p className="view-sub">Sign-in goes live with Murmur Pro. We&apos;re finalising the checkout flow with our payment provider. Free users don&apos;t need an account &mdash; just <Link href="/download">download murmur</Link>.</p>

      <div className="cmd-output">
        <p className="muted">pro accounts: coming soon</p>
      </div>

      <div className="manpage" style={{ marginTop: 16 }}>
        <h3>want to be notified at launch?</h3>
        <p>Head to the <Link href="/pricing">pricing page</Link> and enter your email in the notify box. We&apos;ll send one email when Pro goes live. No drip campaigns, no spam.</p>

        <h3>free users</h3>
        <p>No account needed. Full local dictation, zero telemetry, all yours. <Link href="/download">Download</Link> and go.</p>
      </div>

      <div className="footer">
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/pricing">pricing</Link><span className="dot">&middot;</span>
        <Link href="/download">download</Link>
      </div>
    </ViewAnimation>
  );
}
