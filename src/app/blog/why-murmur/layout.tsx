import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "why murmur",
  description:
    "macOS has dictation built in. Windows has Voice Typing. Linux had nothing usable. Here is why we built Murmur, and why local-first matters.",
  alternates: { canonical: "https://murmurlinux.com/blog/why-murmur" },
};

export default function WhyMurmurLayout({ children }: { children: React.ReactNode }) {
  return children;
}
