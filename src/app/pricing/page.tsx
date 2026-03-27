import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Murmur is free and open source. Pro tier adds cloud STT, LLM cleanup, multi-language, and CLI mode.",
};

const CheckIcon = () => (
  <svg className="w-4 h-4 text-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-4 h-4 text-white/10 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
  </svg>
);

interface FeatureRow {
  label: string;
  free: boolean | string;
  pro: boolean | string;
}

const features: FeatureRow[] = [
  { label: "Local whisper (all models)", free: true, pro: true },
  { label: "All skins + accent colours", free: true, pro: true },
  { label: "VAD tap-to-record", free: true, pro: true },
  { label: "GPU acceleration (Vulkan)", free: true, pro: true },
  { label: "Wayland + X11", free: true, pro: true },
  { label: "Configurable hotkey", free: true, pro: true },
  { label: "Transcript history", free: true, pro: true },
  { label: "Voice commands", free: "Basic", pro: "Full set" },
  { label: "Cloud STT (Groq/Deepgram)", free: "BYOK", pro: "Managed" },
  { label: "LLM text cleanup", free: false, pro: true },
  { label: "Multi-language (99+)", free: "English", pro: "All" },
  { label: "CLI mode (murmur-cli)", free: false, pro: true },
  { label: "Auto-update", free: false, pro: true },
  { label: "Support", free: "Community", pro: "Priority email" },
];

function CellContent({ value }: { value: boolean | string }) {
  if (value === true) return <CheckIcon />;
  if (value === false) return <CrossIcon />;
  return <span className="text-xs">{value}</span>;
}

const faqs = [
  {
    q: "What does BYOK mean?",
    a: "Bring Your Own Key. Free users can enter their own Groq or Deepgram API keys to use cloud STT. Pro users get managed access with no setup.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no lock-in. Cancel from your account and you keep access until the end of your billing period.",
  },
  {
    q: "Is the free version limited?",
    a: "No. The free tier is a complete, genuinely great product. Unlimited local whisper, all skins, GPU acceleration, VAD. No artificial limits. Pro adds cloud speed and extra polish.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, within 14 days of purchase if you're not satisfied.",
  },
];

export default function PricingPage() {
  return (
    <>

      <div className="pt-24 pb-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">
          <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-5">pricing</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-4">
            Free forever. <span className="grad-text">Pro when you need it.</span>
          </h1>
          <p className="text-glass-text max-w-lg mx-auto">
            The free tier is a complete product with no limits. Pro adds cloud speed, AI cleanup, and multi-language support.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-6 mb-20">
          {/* Free */}
          <div className="glass p-8">
            <div className="font-mono text-[11px] text-teal mb-2">--tier free</div>
            <h2 className="text-2xl font-extrabold text-glass-white mb-1">Free</h2>
            <p className="text-glass-text text-sm mb-6">Complete product. No limits. Forever.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-glass-white">$0</span>
              <span className="text-glass-text text-sm ml-1">/ forever</span>
            </div>
            <a href="https://github.com/murmurlinux/murmur/releases" className="block text-center glass px-6 py-3 rounded-xl text-sm font-mono text-glass-white hover:bg-white/5 transition-colors mb-6">
              Download Free
            </a>
            <ul className="space-y-3">
              {features.filter(f => f.free !== false).map(f => (
                <li key={f.label} className="flex items-center gap-3 text-xs text-glass-text">
                  <CheckIcon />
                  <span>{f.label}{typeof f.free === "string" ? ` (${f.free})` : ""}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-teal/10 to-transparent pointer-events-none" />
            <div className="glass p-8 border-teal/20 relative">
              <div className="font-mono text-[11px] text-amber mb-2">--tier pro</div>
              <h2 className="text-2xl font-extrabold text-glass-white mb-1">Pro</h2>
              <p className="text-glass-text text-sm mb-6">Cloud speed + AI polish. For power users.</p>
              <div className="mb-2">
                <span className="text-4xl font-extrabold text-glass-white">$12</span>
                <span className="text-glass-text text-sm ml-1">/ month</span>
              </div>
              <p className="text-[10px] text-glass-text/50 mb-6">Billed annually. $15/mo monthly.</p>
              <div className="cta-grad text-center text-sm font-mono mb-6 cursor-default opacity-70">
                Coming Soon
              </div>
              <ul className="space-y-3">
                {features.map(f => (
                  <li key={f.label} className="flex items-center gap-3 text-xs text-glass-light">
                    <CheckIcon />
                    <span>{f.label}{typeof f.pro === "string" ? ` (${f.pro})` : ""}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Key message */}
        <div className="max-w-2xl mx-auto px-6 text-center mb-20">
          <div className="glass p-6">
            <p className="text-sm text-glass-light leading-relaxed">
              <span className="text-teal font-semibold">The free tier is not a trial.</span> It&apos;s the full app: unlimited local whisper, all skins, GPU acceleration, Wayland support. Pro is for people who want <span className="text-amber">cloud speed</span> (&lt;200ms) and <span className="text-amber">AI text cleanup</span>.
            </p>
          </div>
        </div>

        {/* Pricing FAQ */}
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-xl font-extrabold text-glass-white tracking-tight text-center mb-8">Pricing FAQ</h2>
          <div className="space-y-2">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass p-5">
                <h3 className="text-sm font-semibold text-glass-light mb-2">{faq.q}</h3>
                <p className="text-xs text-glass-text leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
