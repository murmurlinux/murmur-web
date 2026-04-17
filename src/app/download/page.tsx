"use client";

import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import ViewAnimation from "@/components/ViewAnimation";

export default function DownloadPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>download</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">ls -la /releases/latest/</span></div>
      <p className="view-title">download</p>
      <p className="view-sub">Murmur Free is a fully functional voice dictation app with local whisper.cpp, 99+ languages, and zero telemetry. Pick your distro and you&apos;re up in under a minute. No <code>curl | sudo bash</code>. We promise. Want cloud engines and more? <Link href="/pricing">See Pro</Link>.</p>

      <div className="shell-block">
        <div className="block-header">
          <span className="label">apt repository (recommended, auto-updates)</span>
          <CopyButton targetId="apt-install" />
        </div>
        <pre id="apt-install">{`curl -fsSL https://murmurlinux.github.io/apt/gpg.key | sudo tee /etc/apt/keyrings/murmur.asc > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/murmur.asc] https://murmurlinux.github.io/apt/ stable main" | sudo tee /etc/apt/sources.list.d/murmur.list
sudo apt update && sudo apt install murmur`}</pre>
      </div>

      <div className="shell-block">
        <div className="block-header">
          <span className="label">.deb direct download</span>
          <CopyButton targetId="deb-install" />
        </div>
        <pre id="deb-install">{`wget https://github.com/murmurlinux/murmur/releases/download/v0.3.3/Murmur_0.3.3_amd64.deb
sudo dpkg -i Murmur_0.3.3_amd64.deb`}</pre>
      </div>

      <div className="shell-block">
        <div className="block-header">
          <span className="label">.appimage (any distro, auto-updates on launch)</span>
          <CopyButton targetId="appimage-install" />
        </div>
        <pre id="appimage-install">{`wget https://github.com/murmurlinux/murmur/releases/download/v0.3.3/Murmur_0.3.3_amd64.AppImage
chmod +x Murmur_0.3.3_amd64.AppImage
./Murmur_0.3.3_amd64.AppImage`}</pre>
      </div>

      <div className="cta-row" style={{ marginTop: 14 }}>
        <a href="https://github.com/murmurlinux/murmur/releases/download/v0.3.3/Murmur_0.3.3_amd64.deb" className="cta">download .deb</a>
        <a href="https://github.com/murmurlinux/murmur/releases/download/v0.3.3/Murmur_0.3.3_amd64.AppImage" className="cta">download .AppImage</a>
        <Link href="/pricing" className="cta primary">get pro</Link>
      </div>

      <div className="footer">
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/pricing">pricing</Link><span className="dot">&middot;</span>
        <Link href="/changelog">changelog</Link><span className="dot">&middot;</span>
        <Link href="/docs">docs</Link>
      </div>
    </ViewAnimation>
  );
}
