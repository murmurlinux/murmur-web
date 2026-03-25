import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download",
  description: "Download Murmur for Linux. AppImage, .deb, or build from source. Ubuntu 22.04+, Fedora 38+, Arch.",
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
            <a href="https://github.com/murmurlinux/murmur/releases/download/v0.1.0/Murmur_0.1.0_amd64.deb" className="cta-grad text-base font-mono flex items-center gap-3"><DownloadIcon /> Download .deb</a>
            <a href="https://github.com/murmurlinux/murmur/releases/download/v0.1.0/Murmur_0.1.0_amd64.AppImage" className="glass px-8 py-4 text-base font-mono text-glass-white hover:bg-white/5 transition-colors flex items-center gap-3 rounded-xl"><DownloadIcon /> Download .AppImage</a>
          </div>

          {/* Distro guides */}
          <h2 className="text-2xl font-extrabold text-glass-white tracking-tight mb-6">Install by distro</h2>

          <div className="space-y-4 mb-12">
            {/* Ubuntu / Debian */}
            <div className="glass p-6">
              <h3 className="font-bold text-glass-white mb-3">Ubuntu / Debian</h3>
              <div className="term">
                <div className="term-bar"><div className="term-dot bg-teal/50" /><span className="ml-2 text-[9px] font-mono text-white/15">bash</span></div>
                <div className="p-4 font-mono text-[12px] text-white/40 leading-relaxed">
                  <div className="text-glass-text/25"># Download and install .deb package</div>
                  <div className="text-teal/70">wget <span className="text-glass-text/40">https://github.com/murmurlinux/murmur/releases/latest</span></div>
                  <div className="text-teal/70">sudo dpkg -i <span className="text-glass-text/40">latest.deb</span></div>
                  <div className="mt-2 text-glass-text/25"># Run</div>
                  <div className="text-teal/70">murmur</div>
                </div>
              </div>
            </div>

            {/* Fedora / Arch */}
            <div className="glass p-6">
              <h3 className="font-bold text-glass-white mb-3">Fedora / Arch / Any distro (AppImage)</h3>
              <div className="term">
                <div className="term-bar"><div className="term-dot bg-amber/50" /><span className="ml-2 text-[9px] font-mono text-white/15">bash</span></div>
                <div className="p-4 font-mono text-[12px] text-white/40 leading-relaxed">
                  <div className="text-glass-text/25"># Download AppImage (works on any distro)</div>
                  <div className="text-teal/70">wget <span className="text-glass-text/40">https://github.com/murmurlinux/murmur/releases/latest</span></div>
                  <div className="text-teal/70">chmod +x <span className="text-glass-text/40">latest.AppImage</span></div>
                  <div className="text-teal/70">./latest.AppImage</div>
                </div>
              </div>
            </div>

            {/* Build from source */}
            <div className="glass p-6">
              <h3 className="font-bold text-glass-white mb-3">Build from source</h3>
              <div className="term">
                <div className="term-bar"><div className="term-dot bg-teal/50" /><span className="ml-2 text-[9px] font-mono text-white/15">bash</span></div>
                <div className="p-4 font-mono text-[12px] text-white/40 leading-relaxed">
                  <div className="text-glass-text/25"># Prerequisites (Ubuntu/Debian)</div>
                  <div className="text-teal/70">sudo apt install <span className="text-glass-text/40">libwebkit2gtk-4.1-dev libayatana-appindicator3-dev xdotool</span></div>
                  <div className="mt-2 text-glass-text/25"># Clone and build</div>
                  <div className="text-teal/70">git clone <span className="text-glass-text/40">https://github.com/murmurlinux/murmur.git</span></div>
                  <div className="text-teal/70">cd <span className="text-glass-text/40">murmur</span></div>
                  <div className="text-teal/70">pnpm install</div>
                  <div className="text-teal/70">pnpm tauri build</div>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <h2 className="text-2xl font-extrabold text-glass-white tracking-tight mb-4">Requirements</h2>
          <div className="glass p-6">
            <div className="space-y-2 text-sm font-mono">
              {[
                ["OS", "Linux (Ubuntu 22.04+, Fedora 38+, Arch)"],
                ["Display", "X11 (Wayland in V2)"],
                ["Audio", "PipeWire or PulseAudio"],
                ["Deps", "xdotool"],
                ["Disk", "~3MB binary + ~75MB model (auto-downloads)"],
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
