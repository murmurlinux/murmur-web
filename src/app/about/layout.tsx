import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "about",
  description:
    "Murmur is a voice dictation app for Linux. 100% offline, open source, built in Rust with whisper.cpp. Learn who made it and why.",
  alternates: { canonical: "https://murmurlinux.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
