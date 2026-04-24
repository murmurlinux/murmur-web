"use client";

import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";
import PageFooter from "@/components/PageFooter";

export default function WhyMurmurPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span><Link href="/blog">blog</Link><span className="sep">/</span>why-murmur</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cat /posts/why-murmur.md</span></div>
      <p className="view-title">Why Murmur</p>
      <p className="view-sub">Why Linux deserved a dictation app that doesn&apos;t suck. Published April 2026.</p>

      <div className="manpage">
        <h3>the gap</h3>
        <p>On macOS, voice dictation is built into the operating system. You enable it in System Settings, press a key, and it works. Apple has shipped this for over a decade. It runs on-device with their Neural Engine, it&apos;s accurate, and it&apos;s free. On Windows, Voice Typing ships with Windows 11. Press Win+H, speak, and text appears. It&apos;s not perfect, but it&apos;s there, it&apos;s integrated, and it works out of the box.</p>
        <p>On Linux, there&apos;s nothing comparable. Not from a distro, not from a desktop environment, not from anyone. If you wanted to dictate text on a Linux machine in 2024, your options ranged from painful to non-existent.</p>

        <h3>what existed before</h3>
        <p>A few projects tried to fill the gap, and they deserve credit for that. But none of them solved the problem in a way that most people could actually use.</p>
        <p><strong>VOSK</strong> had a good offline speech recognition engine, but the ecosystem around it never matured into a polished desktop tool. The last meaningful activity slowed years ago. Integrating it into a daily workflow required significant effort.</p>
        <p><strong>Nerd Dictation</strong> is a CLI tool that pipes VOSK output to xdotool. It works, genuinely. But it&apos;s a command-line script with no GUI, no settings panel, no system tray icon, and no way to configure it without editing files. For developers comfortable in a terminal, it&apos;s usable. For everyone else, it doesn&apos;t exist.</p>
        <p><strong>Browser-based tools</strong> like Google Docs voice typing or various web apps technically work on Linux. But your audio goes to someone else&apos;s servers. You need an internet connection. You&apos;re locked into a browser tab. And you can&apos;t dictate into your terminal, your code editor, or your email client.</p>
        <p>None of these options gave Linux users what Mac and Windows users take for granted: press a key, speak, and text appears wherever your cursor is.</p>

        <h3>why local-first matters</h3>
        <p>When your voice never leaves your machine, several things become true at once.</p>
        <p><strong>Privacy is structural, not a policy.</strong> There&apos;s no server to trust, no terms of service to read, no data retention policy to hope someone follows. The audio exists in memory for the duration of transcription and then it&apos;s gone. You can verify this yourself because the code is open source.</p>
        <p><strong>It works offline.</strong> On a plane, on a train, in a cabin with no signal. Your dictation tool should not require the internet to function.</p>
        <p><strong>No subscription required.</strong> Cloud speech APIs charge per minute of audio. A local model costs nothing to run after the initial download. The tiny model is 75 MB. Once you have it, it&apos;s yours.</p>
        <p><strong>No vendor lock-in.</strong> If we disappeared tomorrow, Murmur Free would still work. It depends on whisper.cpp, an open source project with thousands of contributors. Your tool should outlive the company that made it.</p>

        <h3>what murmur does</h3>
        <p>Hold a hotkey, speak, release. Text appears at your cursor, in any application. That&apos;s the entire interaction model.</p>
        <p>Under the hood: the app is ~15 MB installed, uses ~50 MB of RAM at idle, and is built in Rust with Tauri 2 for the desktop shell and SolidJS for the UI. Speech recognition runs through whisper.cpp, which supports 99+ languages. Audio capture uses cpal, which talks to PipeWire or PulseAudio. Text injection uses xdotool on X11 or wtype on Wayland.</p>
        <p>There&apos;s a small floating widget on your desktop that shows recording state. It stays out of the way. You can hide it to the system tray if you want it gone entirely.</p>

        <h3>on being open source</h3>
        <p>Murmur&apos;s core is GPL v3. You can read every line of code, build it yourself, and verify every claim on this page. We think that matters, especially for an app that listens to your voice.</p>
        <p>The Pro tier adds cloud engines (Groq Whisper, Deepgram Nova-3) and LLM text cleanup. Pro is a licensed desktop binary; the cloud providers are BYOK, meaning you supply the API keys and your audio goes direct to them. The Pro license fee funds ongoing Murmur development. The local engine, the thing that makes Murmur useful without an internet connection, is free and will stay free.</p>
        <p>Linux deserved a dictation app that respected its users. We built one.</p>
      </div>

      <div className="cta-row" style={{ marginTop: 24 }}>
        <Link href="/blog" className="cta">back to posts</Link>
        <Link href="/download" className="cta">download free</Link>
        <Link href="/pricing" className="cta primary">get pro</Link>
        <a href="https://github.com/murmurlinux" className="cta"><GithubIcon />github</a>
      </div>

      <PageFooter />
    </ViewAnimation>
  );
}
