export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="font-mono text-[11px] text-amber uppercase tracking-widest mb-4">404</p>
      <h1 className="text-4xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-4">
        Page not found
      </h1>
      <p className="text-glass-text mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <a href="/" className="cta-grad text-sm font-mono">
        $ cd ~
      </a>
    </div>
  );
}
