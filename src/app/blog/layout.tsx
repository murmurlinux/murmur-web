import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "blog", template: "%s // murmur" },
  description:
    "Notes from the people building Murmur. How it runs local, why we built it, what is coming in Pro, and the occasional technical deep dive.",
  alternates: { canonical: "https://murmurlinux.com/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
