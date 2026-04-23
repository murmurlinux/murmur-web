import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "introducing pro",
  description:
    "Murmur Pro adds cloud engines, LLM cleanup, and more, while keeping the free local engine free forever. Here is what Pro does and why it exists.",
  alternates: { canonical: "https://murmurlinux.com/blog/introducing-pro" },
};

export default function IntroducingProLayout({ children }: { children: React.ReactNode }) {
  return children;
}
