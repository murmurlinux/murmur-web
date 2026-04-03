import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Download",
  description: "Download Murmur for Linux. APT repository, AppImage, or .deb. Ubuntu 22.04+, Fedora 38+, Arch.",
};

function DownloadIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

export default function DownloadPage() {
  return (
    <>

      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[11px] font-mono uppercase tracking-widest text-amber mb-5">install</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-4">Download Murmur</h1>
          <p className="text-glass-text mb-12">No account. No cloud. Just download and speak.</p>

          {/* Download buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a href="https://github.com/murmurlinux/murmur/releases/download/v0.3.3/Murmur_0.3.3_amd64.deb" className="cta-grad text-base font-mono flex items-center gap-3"><DownloadIcon /> Download .deb</a>
            <a href="https://github.com/murmurlinux/murmur/releases/download/v0.3.3/Murmur_0.3.3_amd64.AppImage" className="glass px-8 py-4 text-base font-mono text-glass-white hover:bg-white/5 transition-colors flex items-center gap-3 rounded-xl"><DownloadIcon /> Download .AppImage</a>
          </div>

          {/* Install methods */}
          <h2 className="text-2xl font-extrabold text-glass-white tracking-tight mb-6">Install methods</h2>

          <div className="space-y-6 mb-12">
            {/* APT Repository */}
            <div className="glass p-6">
              <h3 className="font-bold text-glass-white mb-1">APT Repository <span className="text-[10px] font-mono text-amber ml-2">recommended</span></h3>
              <p className="text-xs text-glass-text mb-4">Add the repository, then install with apt.</p>
              <CodeBlock
                label="bash"
                code={`curl -fsSL https://murmurlinux.github.io/apt/gpg.key | sudo tee /etc/apt/keyrings/murmur.asc > /dev/null\necho "deb [signed-by=/etc/apt/keyrings/murmur.asc] https://murmurlinux.github.io/apt/ stable main" | sudo tee /etc/apt/sources.list.d/murmur.list\nsudo apt update && sudo apt install murmur`}
              />
              <p className="text-[11px] text-glass-text/60 mt-3">Updates automatically via <code className="font-mono">sudo apt upgrade</code></p>
            </div>

            {/* AppImage */}
            <div className="glass p-6">
              <h3 className="font-bold text-glass-white mb-1">AppImage</h3>
              <p className="text-xs text-glass-text mb-4">Works on any distro. No installation required.</p>
              <CodeBlock
                label="bash"
                code={`wget https://github.com/murmurlinux/murmur/releases/download/v0.3.3/Murmur_0.3.3_amd64.AppImage\nchmod +x Murmur_0.3.3_amd64.AppImage\n./Murmur_0.3.3_amd64.AppImage`}
              />
              <p className="text-[11px] text-glass-text/60 mt-3">Auto-updates on launch</p>
            </div>

            {/* .deb direct */}
            <div className="glass p-6">
              <h3 className="font-bold text-glass-white mb-1">.deb direct</h3>
              <p className="text-xs text-glass-text mb-4">Ubuntu / Debian. Download and install manually.</p>
              <CodeBlock
                label="bash"
                code={`wget https://github.com/murmurlinux/murmur/releases/download/v0.3.3/Murmur_0.3.3_amd64.deb\nsudo dpkg -i Murmur_0.3.3_amd64.deb`}
              />
              <p className="text-[11px] text-glass-text/60 mt-3">Manual download required for updates</p>
            </div>
          </div>

          {/* Uninstall */}
          <h2 className="text-2xl font-extrabold text-glass-white tracking-tight mb-4">Uninstall</h2>
          <div className="glass p-6 mb-12">
            <CodeBlock
              label="bash"
              code="sudo apt remove murmur"
            />
          </div>

          {/* Requirements */}
          <h2 className="text-2xl font-extrabold text-glass-white tracking-tight mb-4">Requirements</h2>
          <div className="glass p-6">
            <div className="space-y-2 text-sm font-mono">
              {[
                ["OS", "Linux (Ubuntu 22.04+, Fedora 38+, Arch)"],
                ["Display", "X11 + Wayland"],
                ["Audio", "PipeWire or PulseAudio"],
                ["Deps", "xdotool (X11) / wtype (Wayland)"],
                ["Disk", "~15MB binary + ~75MB model (auto-downloads)"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-glass-text">{k}</span>
                  <span className="text-glass-light">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
