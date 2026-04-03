export default function Footer() {
  return (
    <footer className="py-14 border-t border-white/[0.04] relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="font-bold text-glass-white mb-2 flex items-center gap-1.5">
              <span className="font-mono text-teal text-xs">&#x276f;</span> murmur
            </div>
            <p className="text-[10px] text-glass-text">AI voice to text for Linux.<br />Free. Open source. Offline.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-mono text-glass-text/30 uppercase tracking-wider mb-3">product</h4>
            <ul className="space-y-1.5 text-xs text-glass-text">
              <li><a href="/#features" className="hover:text-teal transition-colors">Features</a></li>
              <li><a href="/pricing" className="hover:text-teal transition-colors">Pricing</a></li>
              <li><a href="/download" className="hover:text-teal transition-colors">Download</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-mono text-glass-text/30 uppercase tracking-wider mb-3">resources</h4>
            <ul className="space-y-1.5 text-xs text-glass-text">
              <li><a href="/docs" className="hover:text-teal transition-colors">Docs</a></li>
              <li><a href="/about" className="hover:text-teal transition-colors">About</a></li>
              <li><a href="/changelog" className="hover:text-teal transition-colors">Changelog</a></li>
              <li><a href="https://github.com/murmurlinux/murmur/blob/main/CONTRIBUTING.md" className="hover:text-teal transition-colors">Contributing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-mono text-glass-text/30 uppercase tracking-wider mb-3">community</h4>
            <ul className="space-y-1.5 text-xs text-glass-text">
              <li><a href="https://github.com/murmurlinux/murmur" className="hover:text-teal transition-colors">GitHub</a></li>
              <li><a href="https://github.com/murmurlinux/murmur/discussions" className="hover:text-teal transition-colors">Discussions</a></li>
              <li><a href="https://github.com/murmurlinux/murmur/blob/main/LICENSE" className="hover:text-teal transition-colors">License</a></li>
              <li><a href="/privacy" className="hover:text-teal transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-6 flex flex-wrap justify-between text-[10px] text-glass-text/20">
          <span>&copy; 2026 Murmur. GPL v3.</span>
          <span className="font-mono">exit 0</span>
        </div>
      </div>
    </footer>
  );
}
