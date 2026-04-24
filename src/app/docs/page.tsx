"use client";

import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";
import PageFooter from "@/components/PageFooter";
import { debFilename, appImageFilename, debUrl, appImageUrl } from "@/lib/app-version";

export default function DocsPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>docs</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">man murmur</span></div>
      <p className="view-title">murmur(1)  &middot;  user manual  &middot;  murmur(1)</p>

      <div className="manpage">
        <h3>name</h3>
        <p className="indent">murmur: AI voice-to-text dictation for Linux</p>

        <h3>description</h3>
        <p className="indent">Murmur is a voice dictation app built specifically for Linux. Press a hotkey, speak, and your words appear wherever your cursor is. Any app, any text field.</p>
        <p className="indent">The free version runs entirely offline using whisper.cpp. Nothing is sent over the network, ever. No account needed, no telemetry, no tracking. Your voice stays on your machine.</p>
        <p className="indent">Murmur Pro adds optional cloud engines (Groq Whisper, Deepgram Nova-3) for users who want faster or more accurate transcription. When using a cloud engine, your audio is sent directly to that provider for processing. Murmur never sees or stores it. Cloud features are always opt-in. The local engine works with no internet connection at all.</p>

        <h3>quick start</h3>
        <p className="indent">1. Install Murmur (instructions below, or see <Link href="/download">download</Link>).</p>
        <p className="indent">2. Launch the app. A small widget appears on your desktop.</p>
        <p className="indent">3. Hold your hotkey. The default is <code>Ctrl+Shift+Space</code>.</p>
        <p className="indent">4. Speak normally. No need to talk slowly or enunciate.</p>
        <p className="indent">5. Let go. Your words appear at the cursor, typed into whatever app you&apos;re using.</p>
        <p className="indent">On first launch, Murmur downloads the default speech model (~75 MB). After that, it starts in under a second.</p>

        <h3>requirements</h3>
        <p className="indent"><strong>Operating system:</strong> Linux. Tested on Ubuntu 22.04+, Fedora 38+, and Arch. Should work on most modern distros that support PipeWire or PulseAudio.</p>
        <p className="indent"><strong>Audio:</strong> PipeWire or PulseAudio. Most modern Linux distros include one of these by default. If you can hear sound on your computer, you probably have it.</p>
        <p className="indent"><strong>Text injection:</strong> To type text directly into apps, Murmur needs <code>xdotool</code> (if you use X11) or <code>wtype</code> (if you use Wayland). These are small packages that handle sending keystrokes to other applications.</p>
        <p className="indent">Not sure which display server you use? Most older setups are X11. Ubuntu 22.04+ and Fedora 38+ default to Wayland. You can check by running <code>echo $XDG_SESSION_TYPE</code> in a terminal.</p>
        <p className="indent">If xdotool/wtype aren&apos;t installed, Murmur still works. It just copies text to your clipboard instead of typing it directly. You can then paste with Ctrl+V.</p>
        <div className="shell-block" style={{ marginLeft: 24, maxWidth: 560 }}>
          <div className="block-header">
            <span className="label">install dependencies (if needed)</span>
            <CopyButton targetId="docs-deps" />
          </div>
          <pre id="docs-deps">sudo apt install xdotool wtype</pre>
        </div>

        <h3>install</h3>
        <p className="indent">Three ways to install. Pick whichever suits your setup.</p>

        <div className="shell-block" style={{ marginLeft: 24, maxWidth: 600 }}>
          <div className="block-header">
            <span className="label">apt repository (recommended, auto-updates)</span>
            <CopyButton targetId="docs-apt" />
          </div>
          <pre id="docs-apt">{`curl -fsSL https://murmurlinux.github.io/apt/gpg.key | sudo tee /etc/apt/keyrings/murmur.asc > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/murmur.asc] https://murmurlinux.github.io/apt/ stable main" | sudo tee /etc/apt/sources.list.d/murmur.list
sudo apt update && sudo apt install murmur`}</pre>
        </div>
        <p className="indent" style={{ fontSize: 12, color: "var(--text-dim)" }}>This adds the Murmur repository to your system. Future updates arrive automatically via <code>sudo apt upgrade</code>.</p>

        <div className="shell-block" style={{ marginLeft: 24, maxWidth: 600 }}>
          <div className="block-header">
            <span className="label">.deb direct download</span>
            <CopyButton targetId="docs-deb" />
          </div>
          <pre id="docs-deb">{`wget ${debUrl}
sudo dpkg -i ${debFilename}`}</pre>
        </div>

        <div className="shell-block" style={{ marginLeft: 24, maxWidth: 600 }}>
          <div className="block-header">
            <span className="label">appimage (portable, auto-updates on launch)</span>
            <CopyButton targetId="docs-appimage" />
          </div>
          <pre id="docs-appimage">{`wget ${appImageUrl}
chmod +x ${appImageFilename}
./${appImageFilename}`}</pre>
        </div>
        <p className="indent" style={{ fontSize: 12, color: "var(--text-dim)" }}>AppImages run without installing. Just download, make executable, and run. The app checks for updates each time it launches.</p>

        <div className="indent" style={{ margin: "14px 0" }}>
          <div className="distro-grid">
            <div className="hdr">distro</div><div className="hdr">format</div><div className="hdr">size</div><div className="hdr">status</div>
            <div>Ubuntu / Debian / Mint</div><div>APT repo / .deb</div><div>~15 MB</div><div className="ok">[stable]</div>
            <div>Fedora / RHEL / openSUSE</div><div>.AppImage</div><div>~18 MB</div><div className="ok">[stable]</div>
            <div>Arch / Manjaro</div><div>AUR</div><div></div><div className="muted">[planned]</div>
            <div>Flathub</div><div>.flatpak</div><div></div><div className="muted">[planned]</div>
            <div>Snap Store</div><div>.snap</div><div></div><div className="muted">[planned]</div>
          </div>
        </div>

        <h3>uninstall</h3>
        <p className="indent">To remove Murmur and its repository:</p>
        <div className="shell-block" style={{ marginLeft: 24, maxWidth: 560 }}>
          <div className="block-header">
            <span className="label">remove the app</span>
            <CopyButton targetId="docs-uninstall" />
          </div>
          <pre id="docs-uninstall">sudo apt remove murmur</pre>
        </div>
        <div className="shell-block" style={{ marginLeft: 24, maxWidth: 560 }}>
          <div className="block-header">
            <span className="label">remove the repository (optional)</span>
            <CopyButton targetId="docs-uninstall-repo" />
          </div>
          <pre id="docs-uninstall-repo">{`sudo rm /etc/apt/sources.list.d/murmur.list
sudo rm /etc/apt/keyrings/murmur.asc`}</pre>
        </div>
        <p className="indent">For AppImage, just delete the .AppImage file. No system changes to undo.</p>
        <p className="indent">User settings live in <code>~/.local/share/com.murmurlinux.murmur/</code>. Delete that folder to remove all settings, models, and data.</p>

        <h3>usage</h3>
        <p className="indent"><strong>How dictation works:</strong></p>
        <p className="indent">Open any app where you can type. Click to place your cursor. Hold your hotkey and speak. When you release, Murmur transcribes your speech and types the result at your cursor, as if you&apos;d typed it by hand.</p>

        <p className="indent"><strong>Recording modes:</strong></p>
        <p className="indent">There are two ways to record. You can switch between them in settings.</p>
        <p className="indent"><code>hold</code> (default): hold the hotkey down while you speak. Let go when you&apos;re done. Simple and predictable.</p>
        <p className="indent"><code>tap</code>: press the hotkey once to start recording, press again to stop. In this mode, Murmur also listens for silence and auto-stops when you finish speaking, so you don&apos;t always need to press twice.</p>

        <p className="indent"><strong>Where does the text go?</strong></p>
        <p className="indent">Murmur types directly into whatever app has focus, using xdotool (X11) or wtype (Wayland). It works in terminals, browsers, text editors, chat apps, code editors, email, anything with a text cursor. If xdotool or wtype aren&apos;t installed, the text goes to your clipboard instead, and you paste with Ctrl+V.</p>

        <p className="indent"><strong>System tray:</strong></p>
        <p className="indent">You can hide the desktop widget and Murmur moves to your system tray. Right-click the tray icon to show/hide the widget, open settings, toggle always-on-top, or quit. The tray tooltip shows whether Murmur is idle, recording, or transcribing.</p>

        <h3>configuration</h3>
        <p className="indent">Open settings by clicking the gear icon on the widget. All options are also available in the settings file if you prefer to edit directly.</p>
        <p className="indent">Settings file: <code>~/.local/share/com.murmurlinux.murmur/settings.json</code></p>
        <div className="indent" style={{ marginBottom: 14 }}>
          <div className="status-grid">
            <dt>hotkey</dt><dd>the keyboard shortcut that starts and stops dictation. default: <code>Ctrl+Shift+Space</code>. you can change this to any key combination.</dd>
            <dt>model</dt><dd>which whisper model to use. tiny.en is the fastest, small.en is the most accurate, base.en is a good middle ground. models download automatically the first time you select them.</dd>
            <dt>language</dt><dd>what language you&apos;re speaking. default: <code>en</code> (English). Murmur supports 99+ languages via Whisper.</dd>
            <dt>translate</dt><dd>when on, translates non-English speech into English. useful if you speak one language and want to type in English. default: off.</dd>
            <dt>record mode</dt><dd><code>hold</code> (hold the hotkey to record) or <code>tap</code> (press once to start, again to stop). default: hold.</dd>
            <dt>auto-stop</dt><dd>voice activity detection. Murmur listens for silence and stops recording automatically when you finish speaking. default: on.</dd>
            <dt>always on top</dt><dd>keeps the widget above other windows so it&apos;s always visible. default: on.</dd>
            <dt>start on login</dt><dd>launches Murmur automatically when you log into your computer. default: off.</dd>
            <dt>accent colour</dt><dd>changes the glow colour on the widget. purely cosmetic. default: <code>#10b981</code> (teal).</dd>
          </div>
        </div>

        <h3>whisper models</h3>
        <p className="indent">Murmur uses whisper.cpp to transcribe your speech locally. You choose which model to use based on how fast you want results and how accurate you need them to be. Models download automatically from Hugging Face when you first select them. Each download is SHA256-verified.</p>
        <div className="indent" style={{ marginBottom: 14 }}>
          <div className="distro-grid">
            <div className="hdr">model</div><div className="hdr">size</div><div className="hdr">speed</div><div className="hdr">accuracy</div>
            <div>tiny.en</div><div>75 MB</div><div>~3-4s</div><div>good</div>
            <div>base.en</div><div>142 MB</div><div>~8-10s</div><div>better</div>
            <div>small.en</div><div>466 MB</div><div>~20-30s</div><div>best</div>
          </div>
        </div>
        <p className="indent">Speed estimates are based on ~10 seconds of speech on a modern CPU without GPU acceleration. With Vulkan GPU acceleration enabled, all models run significantly faster. Most people start with tiny.en and move up if they need better accuracy.</p>

        <h3>engines (pro)</h3>
        <p className="indent">The free version always uses the local whisper engine. Nothing goes online.</p>
        <p className="indent">Pro subscribers can optionally switch to cloud-based engines for faster and more accurate results. Pro is BYOK: you supply your own API keys for Groq and Deepgram. When you enable a cloud engine, your audio is sent directly from Murmur to the provider&apos;s servers using your key. The audio is not routed through Murmur servers and Murmur never sees or stores it.</p>
        <div className="indent" style={{ marginBottom: 14 }}>
          <div className="status-grid">
            <dt>groq whisper</dt><dd>the same Whisper model, but running on Groq&apos;s cloud hardware. Faster than realtime. Good choice if you want the local Whisper quality but don&apos;t want to wait.</dd>
            <dt>deepgram nova-3</dt><dd>a purpose-built commercial speech model. Highest accuracy, especially for professional and technical vocabulary.</dd>
          </div>
        </div>
        <p className="indent">You can switch between local and cloud engines at any time in settings.</p>

        <h3>build from source</h3>
        <p className="indent">If you want to build Murmur yourself instead of using a pre-built package:</p>
        <div className="shell-block" style={{ marginLeft: 24, maxWidth: 600 }}>
          <div className="block-header">
            <span className="label">prerequisites (ubuntu / debian)</span>
            <CopyButton targetId="docs-prereq" />
          </div>
          <pre id="docs-prereq">sudo apt install libwebkit2gtk-4.1-dev libayatana-appindicator3-dev xdotool wtype</pre>
        </div>
        <div className="shell-block" style={{ marginLeft: 24, maxWidth: 600 }}>
          <div className="block-header">
            <span className="label">clone and build</span>
            <CopyButton targetId="docs-build" />
          </div>
          <pre id="docs-build">{`git clone https://github.com/murmurlinux/murmur.git
cd murmur
pnpm install
pnpm tauri build`}</pre>
        </div>
        <p className="indent">You&apos;ll need Rust (stable, latest) and Node.js 18+ with pnpm. The built binary ends up in <code>src-tauri/target/release/murmur</code>.</p>

        <h3>project structure</h3>
        <div className="shell-block" style={{ marginLeft: 24, maxWidth: 560 }}>
          <div className="block-header">
            <span className="label">repository layout</span>
          </div>
          <pre>{`murmur/
  src/                    SolidJS frontend
    components/           UI components
    lib/                  Utilities (settings, colour)
    assets/               Static assets
  src-tauri/              Rust backend
    src/
      audio/              Audio capture (cpal)
      commands/           Tauri IPC commands
      inject/             Text injection (xdotool/wtype)
      stt/                Speech-to-text (whisper.cpp)
      lib.rs              App setup + state`}</pre>
        </div>

        <h3>tech stack</h3>
        <div className="indent" style={{ marginBottom: 14 }}>
          <div className="status-grid">
            <dt>backend</dt><dd>Rust + Tauri 2</dd>
            <dt>frontend</dt><dd>SolidJS + TypeScript</dd>
            <dt>stt engine</dt><dd>whisper.cpp (via whisper-rs)</dd>
            <dt>audio</dt><dd>cpal (PipeWire / PulseAudio)</dd>
            <dt>text inject</dt><dd>xdotool (X11), wtype (Wayland)</dd>
            <dt>build</dt><dd>Vite 6 + Cargo</dd>
          </div>
        </div>

        <h3>troubleshooting</h3>

        <p className="indent"><strong>Nothing happens when I press the hotkey.</strong></p>
        <p className="indent">First, make sure Murmur is actually running. Check your system tray for the Murmur icon. If it&apos;s not there, launch the app. If it is there, the hotkey might be conflicting with another app. Try changing the hotkey in settings to something else (like <code>Ctrl+Alt+Space</code>) and see if that helps.</p>

        <p className="indent"><strong>I can hear Murmur recording, but no text appears.</strong></p>
        <p className="indent">This usually means the text injection tool isn&apos;t installed. Murmur needs xdotool (on X11) or wtype (on Wayland) to type text into other apps. Run <code>sudo apt install xdotool wtype</code> to install both. Without them, Murmur copies text to your clipboard instead. You can paste with Ctrl+V.</p>

        <p className="indent"><strong>My microphone isn&apos;t being detected.</strong></p>
        <p className="indent">Make sure your mic is plugged in and not muted at the system level. Check your system sound settings to confirm the correct input device is selected. If you&apos;re on PipeWire or PulseAudio, you can list available inputs by running <code>pactl list sources short</code> in a terminal.</p>

        <p className="indent"><strong>The transcription is inaccurate or contains phantom words.</strong></p>
        <p className="indent">If you&apos;re seeing words like &quot;Thank you&quot; or musical notes that you didn&apos;t say, that&apos;s a known Whisper quirk when it processes silence. Murmur trims trailing silence automatically to reduce this. If it keeps happening, try switching to a larger model (base.en or small.en) for better accuracy. Speaking clearly and avoiding long pauses also helps.</p>

        <p className="indent"><strong>The hotkey doesn&apos;t work on Wayland.</strong></p>
        <p className="indent">Some Wayland compositors (like GNOME on Wayland) restrict global hotkeys by default. You may need to grant permission through your compositor&apos;s settings. Check your desktop environment&apos;s documentation for &quot;global shortcuts&quot; or &quot;input capture&quot; protocols. This is a Wayland platform limitation, not a Murmur bug.</p>

        <p className="indent"><strong>Model download fails or is very slow.</strong></p>
        <p className="indent">Whisper models download from Hugging Face the first time you use them. If your network is slow or blocks Hugging Face, you can download the model manually and place it in <code>~/.local/share/com.murmurlinux.murmur/models/</code>. Model files are available on the <a href="https://huggingface.co/ggerganov/whisper.cpp">whisper.cpp Hugging Face page</a>.</p>

        <p className="indent"><strong>Still stuck?</strong></p>
        <p className="indent">Pro users can run <code>murmur-cli doctor</code> to diagnose common issues automatically. Everyone is welcome to email us at <a href="mailto:hello@murmurlinux.com">hello@murmurlinux.com</a>. We&apos;re less judgemental than Stack Overflow.</p>

        <h3>contributing</h3>
        <p className="indent">We welcome contributions. Fork the repo, create a branch, make your changes, and open a PR. Use conventional commit format (<code>feat:</code>, <code>fix:</code>, <code>docs:</code>). Run <code>cargo fmt</code> before committing. Full guide: <a href="https://github.com/murmurlinux/murmur/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a>.</p>

        <h3>license</h3>
        <p className="indent">GPL-3.0. Free and open source. Read the code, verify the privacy claims, contribute features.</p>

        <h3>see also</h3>
        <p className="indent"><Link href="/download">download(1)</Link> &middot; <Link href="/changelog">changelog(1)</Link> &middot; <Link href="/pricing">pricing(7)</Link> &middot; <Link href="/privacy">privacy(7)</Link> &middot; <Link href="/about">about(7)</Link></p>
      </div>

      <div className="cta-row" style={{ marginTop: 24 }}>
        <Link href="/download" className="cta">download free</Link>
        <Link href="/pricing" className="cta primary">get pro</Link>
        <a href="https://github.com/murmurlinux" className="cta"><GithubIcon />github</a>
      </div>

      <PageFooter />
    </ViewAnimation>
  );
}
