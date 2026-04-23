import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "pricing",
  description:
    "Murmur Free is free forever. Murmur Pro adds cloud engines, LLM cleanup, and more. Founding-member pricing: $69/year or $149 lifetime.",
  alternates: { canonical: "https://murmurlinux.com/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
