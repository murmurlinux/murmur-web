import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "docs",
  description:
    "How to install, configure, and use Murmur on Linux. Hotkeys, supported engines, troubleshooting, and reference for every setting.",
  alternates: { canonical: "https://murmurlinux.com/docs" },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
