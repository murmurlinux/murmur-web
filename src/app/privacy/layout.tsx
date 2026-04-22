import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "privacy",
  description:
    "How Murmur handles your data. What we collect, what we do not, where your voice goes (nowhere, by default), and your rights.",
  alternates: { canonical: "https://murmurlinux.com/privacy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
