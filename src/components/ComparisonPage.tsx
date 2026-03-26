interface CompRow {
  label: string;
  murmur: string;
  murmurColor?: string;
  competitor: string;
  competitorColor?: string;
}

interface ComparisonPageProps {
  competitor: string;
  tagline: string;
  intro: string;
  rows: CompRow[];
  whySwitch: { title: string; desc: string }[];
}

export default function ComparisonPage({ competitor, tagline, intro, rows, whySwitch }: ComparisonPageProps) {
  return (
    <>
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-5">diff --compare</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-glass-white tracking-tight mb-4">
            Murmur vs {competitor}
          </h1>
          <p className="text-lg text-glass-text mb-4">{tagline}</p>
          <p className="text-sm text-glass-text leading-relaxed max-w-2xl mb-12">{intro}</p>

          {/* Comparison table */}
          <div className="glass overflow-hidden mb-16">
            <div className="term-bar border-b border-white/5">
              <div className="term-dot bg-teal/50" />
              <span className="ml-2 text-[9px] font-mono text-white/15">murmur --compare {competitor.toLowerCase().replace(/\s+/g, "-")}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px] font-mono min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-3 px-5 text-glass-text font-normal w-1/3">field</th>
                    <th className="py-3 px-4 text-teal font-bold w-1/3">Murmur</th>
                    <th className="py-3 px-4 text-glass-text font-normal w-1/3">{competitor}</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {rows.map((row) => (
                    <tr key={row.label} className="border-b border-white/[0.03]">
                      <td className="text-left py-3 px-5 text-glass-light">{row.label}</td>
                      <td className={`py-3 px-4 ${row.murmurColor || "text-teal"}`}>{row.murmur}</td>
                      <td className={`py-3 px-4 ${row.competitorColor || "text-glass-text"}`}>{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How we differ */}
          <h2 className="text-2xl font-extrabold text-glass-white tracking-tight mb-8">Where Murmur differs</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {whySwitch.map((item) => (
              <div key={item.title} className="glass p-6">
                <h3 className="font-bold text-glass-white mb-2">{item.title}</h3>
                <p className="text-xs text-glass-text leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a href="/download" className="cta-grad text-sm font-mono inline-flex items-center gap-2">
              $ murmur --install
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
