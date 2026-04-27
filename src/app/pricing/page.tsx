"use client";

import { useState } from "react";
import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";
import PageFooter from "@/components/PageFooter";

const PLANS = {
  monthly: { amount: "$12", strike: "", period: " / month", note: "billed monthly. cancel anytime.", save: "most flexible", founding: false, footer: "no long-term commitment. cancel anytime from your account." },
  yearly: { amount: "$69", strike: "$99", period: " / year", note: "founding member price. billed annually.", save: "save 52%", founding: true, footer: "billed as one payment of $69/year. standard price $99/year after launch." },
  lifetime: { amount: "$149", strike: "$249", period: "", note: "one-time purchase. yours forever.", save: "best value", founding: true, footer: "founding member lifetime deal. standard price $249 after launch. no recurring charges." },
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

        const line1 = document.createElement("p");
        line1.textContent = "Demo coming soon.";
        line1.style.fontSize = "15px";
        line1.style.marginBottom = "10px";
        placeholder.appendChild(line1);

        const line2 = document.createElement("p");
        line2.style.fontSize = "13px";
        line2.style.opacity = "0.8";
        line2.appendChild(document.createTextNode("Drop a line to "));
        const mail = document.createElement("a");
        mail.href = "mailto:hello@murmurlinux.com";
        mail.textContent = "hello@murmurlinux.com";
        mail.style.textDecoration = "underline";
        line2.appendChild(mail);
        line2.appendChild(document.createTextNode(" and we'll send it when it's ready."));
        placeholder.appendChild(line2);

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
      <p className="view-sub">Murmur Free gives you fast, accurate local dictation with no restrictions, no account, and no telemetry. It&apos;s the full app. Murmur Pro is for power users and professionals who want cloud-speed transcription, LLM text cleanup, and tools like voice commands and CLI mode. Founding member pricing.</p>

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
            <li>zero telemetry by default (opt-in crash reporting via Sentry), open source (GPL v3)</li>
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
          <p className="muted" style={{ fontSize: 12, marginBottom: 10 }}>Pro requires your own API keys for Groq and Deepgram. Audio goes direct to the provider.</p>
          <ul>
            <li>everything in free, plus:</li>
            <li>groq whisper cloud stt (faster than realtime, BYOK)</li>
            <li>deepgram nova-3 cloud stt (best accuracy, BYOK)</li>
            <li>llm text cleanup (punctuation, filler removal, BYOK)</li>
            <li>custom dictionaries + hot words</li>
            <li>context-aware prompt conditioning</li>
            <li>transcript history + search</li>
            <li>voice commands</li>
            <li>cli mode (murmur-cli)</li>
            <li>priority support</li>
          </ul>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            <button type="button" className="cta primary" id="go-pro-btn" disabled style={{ cursor: "not-allowed", opacity: 0.6 }} aria-disabled="true">coming soon</button>
          </div>
        </div>
      </div>

      <p className="muted" style={{ marginTop: 14, fontSize: 13 }}>Not ready to buy? Type <span className="accent">subscribe you@email.com</span> below to get notified about new features and updates.</p>

      <p className="muted" style={{ marginTop: 12, marginBottom: 6, fontSize: 12 }} id="pricing-footer-note">
        {p.footer}
      </p>

      <PageFooter />
    </ViewAnimation>
  );
}
