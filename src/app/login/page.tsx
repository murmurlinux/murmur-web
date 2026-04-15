"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import ViewAnimation from "@/components/ViewAnimation";

export default function LoginPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>login</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">login</span></div>
      <p className="view-title">sign in</p>
      <p className="view-sub">For Pro subscribers. Enter the email you used at checkout and we&apos;ll send a magic link to verify it&apos;s you. No password, no OAuth, no cookies. We respect your <code>~/.config</code> and your time.</p>

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <label htmlFor="login-email">email address</label>
        <input type="email" id="login-email" name="email" placeholder="you@domain.com" required autoComplete="email" />
        <div className="submit-row">
          <button type="submit" className="cta primary">send magic link</button>
        </div>
        {sent && <p className="msg">magic link sent. check your inbox.</p>}
        <p className="disclaimer">
          Your account is created automatically when you purchase Pro. If you haven&apos;t purchased yet, <Link href="/pricing">see pricing</Link>.
          Already purchased but can&apos;t sign in? Make sure you&apos;re using the same email as checkout.
          Free users don&apos;t need an account. Just <Link href="/download">download murmur</Link>.
        </p>
      </form>

      <div className="footer">
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/pricing">pricing</Link><span className="dot">&middot;</span>
        <Link href="/account">my account</Link><span className="dot">&middot;</span>
        <Link href="/download">download</Link>
      </div>
    </ViewAnimation>
  );
}
