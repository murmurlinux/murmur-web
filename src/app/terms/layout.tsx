import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "terms",
  description:
    "Terms of service for Murmur Linux. The short version: use it, enjoy it, do not abuse it. The long version: this page.",
  alternates: { canonical: "https://murmurlinux.com/terms" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
