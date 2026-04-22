import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "changelog",
  description:
    "Release notes for Murmur. Every version, every change, every fix, in one place. Murmur ships often and keeps the history honest.",
  alternates: { canonical: "https://murmurlinux.com/changelog" },
};

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
