import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Murmur privacy policy: what data we collect, how we use it, and your rights.",
  alternates: { canonical: "https://murmurlinux.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-5">cat /etc/privacy</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-xs text-glass-text mb-12">Last updated: 25 March 2026</p>

        <div className="space-y-8 text-sm text-glass-text leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-glass-white mb-3">The short version</h2>
            <p>
              Murmur is built for privacy. The desktop app processes your voice <strong className="text-glass-light">entirely on your machine</strong>. No
              audio is sent anywhere. This website collects minimal data and we never sell or share it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-glass-white mb-3">The Murmur desktop app</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>All speech-to-text processing happens locally using whisper.cpp. <strong className="text-glass-light">No audio data leaves your machine.</strong></li>
              <li>No telemetry, analytics, or usage tracking of any kind.</li>
              <li>No account required. No sign-up. No login.</li>
              <li>The only network request is downloading the Whisper model on first use (~75MB from Hugging Face). After that, zero network activity.</li>
              <li>Settings are stored locally at <code className="text-teal/70 font-mono text-xs">~/.local/share/com.murmurlinux.murmur/</code>.</li>
              <li>The app is open source (GPL v3). You can <a href="https://github.com/murmurlinux/murmur" className="text-teal hover:underline">read the code</a> and verify these claims.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-glass-white mb-3">This website (murmurlinux.com)</h2>
            <h3 className="text-sm font-semibold text-glass-light mb-2">Data we collect</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-glass-light">Waitlist emails:</strong> If you sign up for Pro launch notifications, we store your email address and the date you signed up. That&apos;s it.</li>
              <li><strong className="text-glass-light">Error monitoring:</strong> We use Sentry to catch website errors. Sentry may collect your IP address, browser type, and error context. No personally identifiable information is intentionally collected.</li>
              <li><strong className="text-glass-light">No analytics:</strong> We do not use Google Analytics, Facebook Pixel, or any tracking scripts. No cookies are set for tracking purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-glass-white mb-3">How we use your data</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Waitlist emails are used solely to notify you when the Pro tier launches. We will not send marketing emails or share your email with third parties.</li>
              <li>Error data is used to fix bugs and improve the website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-glass-white mb-3">Data storage</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Waitlist emails are stored in Supabase (hosted in Sydney, Australia).</li>
              <li>Error data is stored by Sentry (US-based).</li>
              <li>The website is hosted on Vercel.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-glass-white mb-3">Your rights</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-glass-light">Deletion:</strong> Email <a href="mailto:dev@murmurlinux.com" className="text-teal hover:underline">dev@murmurlinux.com</a> to request deletion of your waitlist email.</li>
              <li><strong className="text-glass-light">Access:</strong> You can request a copy of any data we hold about you.</li>
              <li><strong className="text-glass-light">Correction:</strong> You can request corrections to your data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-glass-white mb-3">Third-party services</h2>
            <div className="glass p-5">
              <div className="space-y-2 text-[12px] font-mono">
                {[
                  ["Supabase", "Waitlist email storage", "supabase.com/privacy"],
                  ["Sentry", "Error monitoring", "sentry.io/privacy"],
                  ["Vercel", "Website hosting", "vercel.com/legal/privacy-policy"],
                  ["Hugging Face", "Model downloads (app only)", "huggingface.co/privacy"],
                ].map(([name, purpose, url]) => (
                  <div key={name} className="flex justify-between flex-wrap gap-2">
                    <span className="text-glass-light">{name}: {purpose}</span>
                    <span className="text-glass-text/30">{url}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-glass-white mb-3">Future Pro tier</h2>
            <p>
              When the Pro tier launches (with cloud STT and LLM cleanup), additional data processing will occur on third-party servers (Groq, Deepgram).
              This policy will be updated before launch with full details. The free tier will always remain 100% local.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-glass-white mb-3">Changes to this policy</h2>
            <p>
              We will update this page if our practices change. Significant changes will be announced via the website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-glass-white mb-3">Contact</h2>
            <p>
              Questions about privacy? Email <a href="mailto:dev@murmurlinux.com" className="text-teal hover:underline">dev@murmurlinux.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
