"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Is it really 100% offline?",
    answer:
      "Yes. Only the model download. Then zero network. Open source \u2014 verify.",
  },
  {
    question: "Wayland?",
    answer:
      "X11 now. Wayland via ydotool in V2. Recording works on both.",
  },
  {
    question: "How does Murmur compare to other tools?",
    answer:
      "Murmur uses Rust and Tauri for a small, fast binary with a floating widget UI. Other great tools like Vocalinux and Nerd Dictation take different approaches. We recommend trying a few and using what works best for you.",
  },
  {
    question: "Paid version?",
    answer:
      "Core free GPL v3. Pro planned: cloud STT + AI cleanup. Free has no limits.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div
          key={faq.question}
          className={`faq-item glass overflow-hidden${openIndex === i ? " open" : ""}`}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex items-center gap-3 p-4 cursor-pointer text-xs w-full text-left"
            aria-expanded={openIndex === i}
          >
            <span className="faq-chevron font-mono text-glass-text/30" aria-hidden="true">
              &#x25b6;
            </span>
            <span className="text-glass-light font-medium">
              {faq.question}
            </span>
          </button>
          <div className="faq-body px-4 text-[11px] text-glass-text leading-relaxed" role="region">
            <div className="pb-4 pl-6">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
