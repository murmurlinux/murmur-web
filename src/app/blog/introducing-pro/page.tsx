"use client";

import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";

export default function IntroducingProPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span><Link href="/blog">blog</Link><span className="sep">/</span>introducing-pro</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cat /posts/introducing-pro.md</span></div>
      <p className="view-title">Introducing Pro</p>
      <p className="view-sub">How we structured the Pro tier and what founding members get. Published April 2026.</p>

      <div className="manpage">
        <h3>why a paid tier</h3>
        <p>Murmur Free runs whisper.cpp locally and will always be free. No account, no telemetry, no catches. But building and maintaining a desktop app takes time. A paid tier lets us fund continued development without ads, data harvesting, or VC funding.</p>
        <p>The model is simple: the free version is genuinely useful on its own. Pro adds cloud engine integrations, LLM cleanup, and power-user tools. You bring your own API keys for cloud providers, so you control your own costs and data. If you never need cloud features, you never need to pay.</p>

        <h3>what pro includes</h3>
        <p><strong>Cloud speech engines.</strong> Two providers, each with different strengths.</p>
        <p className="indent"><strong>Groq Whisper</strong> runs the same Whisper model you use locally, but on Groq&apos;s LPU hardware. It&apos;s faster than realtime. A 10-second recording comes back in under a second. Same model, same accuracy, just faster.</p>
        <p className="indent"><strong>Deepgram Nova-3</strong> is a purpose-built commercial speech model. It handles technical vocabulary, proper nouns, and accented speech better than Whisper. If accuracy matters more than speed, this is the engine to use.</p>
        <p><strong>LLM text cleanup.</strong> Raw transcription output often has rough edges: missing punctuation, filler words, repeated phrases. Pro runs your transcription through an LLM to clean it up. Proper capitalisation, correct punctuation, filler removal. The meaning stays the same. The text just reads like you meant it to.</p>
        <p><strong>Custom dictionaries.</strong> Teach Murmur specialised terms, project names, or jargon that speech models get wrong. Add them once, and they&apos;re used for every transcription.</p>
        <p><strong>Voice commands.</strong> Speak natural commands like &quot;new line&quot;, &quot;select all&quot;, or &quot;undo that&quot; and Murmur translates them into actions.</p>
        <p><strong>CLI mode.</strong> Run <code>murmur-cli</code> from a terminal for scripting and automation. Pipe output, integrate with other tools, build workflows.</p>
        <p><strong>Transcript history.</strong> Browse and search your past transcriptions. Stored locally on your machine.</p>

        <h3>how cloud engines work</h3>
        <p>You bring your own API keys for Groq and Deepgram. When you use a cloud engine, your audio is sent directly from Murmur on your machine to the provider&apos;s API using your key. It does not pass through our servers. We never see, store, or process your audio. Your voice data goes from your machine to the provider, and the transcription comes back the same way.</p>
        <p>If you&apos;re not comfortable with cloud processing, don&apos;t use it. The local engine is always available, always offline, and always free.</p>

        <h3>founding member pricing</h3>
        <p>We&apos;re offering early adopter pricing on annual and lifetime plans during the launch period. These prices are locked in for as long as you keep your subscription. The monthly price is the same for everyone, founding member or not.</p>
        <p className="indent"><strong>Monthly:</strong> $12/month (no founding discount)</p>
        <p className="indent"><strong>Annual:</strong> $69/year (founding price, normally $99/year)</p>
        <p className="indent"><strong>Lifetime:</strong> $149 once (founding price, normally $249)</p>
        <p>Founding members also get their name in the project&apos;s supporters page, if they want it.</p>

        <h3>what the revenue funds</h3>
        <p>Everything goes back into the project. There are no investors to pay, no board to satisfy. Revenue funds full-time development: more cloud provider options, better local models as they become available, a CLI doctor for self-diagnosis, a mobile port exploration, and the infrastructure to keep it all running.</p>
        <p>The open-core model keeps everyone honest. Free stays free forever. The source stays open. Pro funds the work that makes both tiers better. If we ever stop being worth paying for, you still have a fully functional local dictation app that depends on nothing but your own hardware.</p>
      </div>

      <div className="cta-row" style={{ marginTop: 24 }}>
        <Link href="/blog" className="cta">back to posts</Link>
        <Link href="/download" className="cta">download free</Link>
        <Link href="/pricing" className="cta primary">get pro</Link>
        <a href="https://github.com/murmurlinux" className="cta"><GithubIcon />github</a>
      </div>

      <div className="footer">
        <Link href="/blog">blog</Link><span className="dot">&middot;</span>
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/pricing">pricing</Link>
      </div>
    </ViewAnimation>
  );
}
