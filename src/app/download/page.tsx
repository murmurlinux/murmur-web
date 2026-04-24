"use client";

import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import ViewAnimation from "@/components/ViewAnimation";
import PageFooter from "@/components/PageFooter";
import { debFilename, appImageFilename, debUrl, appImageUrl } from "@/lib/app-version";

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
        <pre id="deb-install">{`wget ${debUrl}
sudo dpkg -i ${debFilename}`}</pre>
      </div>

      <div className="shell-block">
        <div className="block-header">
          <span className="label">.appimage (any distro, auto-updates on launch)</span>
          <CopyButton targetId="appimage-install" />
        </div>
        <pre id="appimage-install">{`wget ${appImageUrl}
chmod +x ${appImageFilename}
./${appImageFilename}`}</pre>
      </div>

      <div className="cta-row" style={{ marginTop: 14 }}>
        <a href={debUrl} className="cta">download .deb</a>
        <a href={appImageUrl} className="cta">download .AppImage</a>
        <Link href="/pricing" className="cta primary">get pro</Link>
      </div>

      <PageFooter />
    </ViewAnimation>
  );
}
