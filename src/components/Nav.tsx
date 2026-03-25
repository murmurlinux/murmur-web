export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-bg">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="font-bold text-lg text-glass-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-teal text-sm">&#x276f;</span> murmur
        </a>
        <div className="hidden md:flex items-center gap-7 text-xs font-mono text-glass-text">
          <a href="/#features" className="hover:text-teal transition-colors">--features</a>
          <a href="/#compare" className="hover:text-teal transition-colors">--compare</a>
          <a href="/pricing" className="hover:text-teal transition-colors">--pricing</a>
          <a href="/docs" className="hover:text-teal transition-colors">--docs</a>
        </div>
        <a href="/download" className="text-xs font-mono font-semibold px-4 py-2 rounded-lg bg-teal/15 text-teal hover:bg-teal/25 transition-colors border border-teal/20">
          $ install
        </a>
      </div>
    </nav>
  );
}
