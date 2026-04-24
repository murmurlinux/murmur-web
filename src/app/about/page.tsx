"use client";

import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";
import PageFooter from "@/components/PageFooter";

export default function AboutPage() {
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
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>about</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cat about.txt</span></div>
      <p className="view-title">about</p>

      <div className="manpage">
        <h3>why murmur exists</h3>
        <p>Linux has had good options for almost everything, except voice dictation. Other platforms have had polished tools for years. We wanted to fix that.</p>
        <p>Murmur Free is for privacy-conscious and everyday users. It runs whisper.cpp entirely on your machine. Nothing goes online, no account needed, and it&apos;s open source under GPL v3. Murmur Pro is for professionals and power users who want cloud-speed transcription via Groq and Deepgram. Audio goes directly to the provider, never to us.</p>

        <h3>the philosophy</h3>
        <p>We built Murmur because we wanted something we&apos;d actually use ourselves, every day. Something that worked quietly, respected the user, and didn&apos;t try to be clever about monetisation. Local first. No telemetry. No dark patterns. The free version is genuinely free. Pro funds continued open source development.</p>

        <h3>who</h3>
        <p>A solo developer sharing a solution to a problem they faced. No investors, no VC, no growth hacking. Just the app. <a href="mailto:hello@murmurlinux.com">hello@murmurlinux.com</a></p>
      </div>

      <p className="muted" style={{ marginTop: 10, fontSize: 12 }}>Stay in the loop: type <span className="accent">subscribe you@email.com</span> below.</p>

      <div className="cta-row" style={{ marginTop: 16 }}>
        <a href="#" className="cta" onClick={openDemo}>watch demo</a>
        <Link href="/pricing" className="cta primary">get murmur pro</Link>
        <a href="https://github.com/murmurlinux" className="cta"><GithubIcon />github</a>
      </div>

      <PageFooter />
    </ViewAnimation>
  );
}
