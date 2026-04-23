import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "how it runs local",
  description:
    "A look inside Murmur. Rust, Tauri 2, whisper.cpp, and how we keep transcription fully offline without cutting corners on accuracy or latency.",
  alternates: { canonical: "https://murmurlinux.com/blog/how-it-runs-local" },
};

export default function HowItRunsLocalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
