"use client";

import { useState } from "react";
import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";

const PLANS = {
  monthly: { amount: "$12", strike: "", period: " / month", note: "billed monthly. cancel anytime.", save: "most flexible", founding: false, footer: "no long-term commitment. cancel anytime from your account." },
  yearly: { amount: "$69", strike: "$99", period: " / year", note: "founding member price. billed annually.", save: "founding price \u00b7 save 52%", founding: true, footer: "billed as one payment of $69/year. standard price $99/year after launch." },
  lifetime: { amount: "$149", strike: "$249", period: "", note: "one-time purchase. yours forever.", save: "founding price \u00b7 best value", founding: true, footer: "founding member lifetime deal. standard price $249 after launch. no recurring charges." },
} as const;

type PlanKey = keyof typeof PLANS;

export default function PricingPage() {
  const [plan, setPlan] = useState<PlanKey>("yearly");
  const p = PLANS[plan];

  function openDemo(e: React.MouseEvent) {
    e.preventDefault();
    const lb = document.getElementById("lightbox");
    if (lb) {
      const title = document.getElementById("lightbox-title");
      if (title) title.textContent = "murmur demo";
      const body = document.getElementById("lightbox-body");
      if (body) {
        body.textContent = "";
        body.style.whiteSpace = "normal";
        const wrap = document.createElement("div");
        wrap.className = "video-lb-body";
        const placeholder = document.createElement("div");
        placeholder.className = "video-placeholder";
        const playIcon = document.createElement("div");
        playIcon.className = "play-icon";
        playIcon.textContent = "\u25B6";
        placeholder.appendChild(playIcon);
        const placeholderText = document.createElement("div");
        placeholderText.textContent = "demo video";
        placeholder.appendChild(placeholderText);
        wrap.appendChild(placeholder);
        body.appendChild(wrap);
      }
      lb.classList.add("active");
      lb.setAttribute("aria-hidden", "false");
    }
  }

  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>pricing</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cat pricing.txt</span></div>
      <p className="view-title">pricing</p>
      <p className="view-sub">Murmur Free gives you fast, accurate local dictation with no restrictions, no account, and no telemetry. It&apos;s the full app. Murmur Pro is for power users and professionals who want cloud-speed transcription, LLM text cleanup, and tools like voice commands and CLI mode. Founding member pricing is available for a limited time.</p>

      <div className="price-toggle" id="price-toggle">
        <button type="button" data-plan="monthly" className={plan === "monthly" ? "active" : ""} onClick={() => setPlan("monthly")}>monthly</button>
        <button type="button" data-plan="yearly" className={plan === "yearly" ? "active" : ""} onClick={() => setPlan("yearly")}>yearly</button>
        <button type="button" data-plan="lifetime" className={plan === "lifetime" ? "active" : ""} onClick={() => setPlan("lifetime")}>lifetime</button>
      </div>
      <span className="price-save" id="price-save">{p.save}</span>

      <div className="price-grid">
        <div className="price-col">
          <h3>free</h3>
          <div className="price-amount">$0</div>
          <div className="price-note">forever. no account required.</div>
          <ul>
            <li>local whisper.cpp (tiny, base, small models)</li>
            <li>gpu acceleration (vulkan)</li>
            <li>push-to-talk: hold or tap to record</li>
            <li>voice activity detection (auto-stop)</li>
            <li>universal text injection (any app)</li>
            <li>99+ languages + translation</li>
            <li>configurable global hotkey</li>
            <li>start on login + auto-updates</li>
            <li>onboarding wizard</li>
            <li>~15 MB install, ~50 MB RAM</li>
            <li>zero telemetry, source-available (GPL v3)</li>
          </ul>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            <Link href="/download" className="cta">download free</Link>
            <a href="https://github.com/murmurlinux" className="cta"><GithubIcon />source</a>
          </div>
        </div>

        <div className="price-col pro">
          {p.founding && <div className="founding" id="founding-badge">founding member price</div>}
          <h3>pro</h3>
          <div className="price-amount" id="pro-price">
            {p.strike && <span style={{ fontSize: 14, color: "var(--text-dim)", textDecoration: "line-through", marginRight: 8 }}>{p.strike}</span>}
            {p.amount}
            {p.period && <span style={{ fontSize: 12, color: "var(--text-dim)", fontWeight: 400 }}>{p.period}</span>}
          </div>
          <div className="price-note" id="pro-note">{p.note}</div>
          <ul>
            <li>everything in free, plus:</li>
            <li>groq whisper cloud stt (faster than realtime)</li>
            <li>deepgram nova-3 cloud stt (best accuracy)</li>
            <li>llm text cleanup (punctuation, filler removal)</li>
            <li>custom dictionaries + hot words</li>
            <li>context-aware prompt conditioning</li>
            <li>transcript history + search</li>
            <li>voice commands</li>
            <li>cli mode (murmur-cli)</li>
            <li>priority support</li>
            <li>supports independent linux software</li>
          </ul>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            <button type="button" className="cta primary" id="go-pro-btn" disabled style={{ cursor: "not-allowed", opacity: 0.6 }} aria-disabled="true">coming soon</button>
            <a href="#" className="cta" onClick={openDemo}>watch demo</a>
          </div>
        </div>
      </div>

      <p className="muted" style={{ marginTop: 14, fontSize: 13 }}>Not ready to buy? Type <span className="accent">subscribe you@email.com</span> below to get notified about new features and updates.</p>

      <p className="muted" style={{ marginTop: 12, marginBottom: 6, fontSize: 12 }} id="pricing-footer-note">
        {p.footer}
      </p>

      <div className="footer">
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/download">download</Link><span className="dot">&middot;</span>
        <Link href="/docs">docs</Link><span className="dot">&middot;</span>
        <Link href="/privacy">privacy</Link><span className="dot">&middot;</span>
        <Link href="/terms">terms</Link><span className="dot">&middot;</span>
        <Link href="/account">my account</Link>
      </div>
    </ViewAnimation>
  );
}
