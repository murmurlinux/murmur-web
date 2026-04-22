import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "download",
  description:
    "Download Murmur for Linux. .deb package for Ubuntu, Debian, Pop!_OS. APT repo for one-command install and auto-updates. Free and open source.",
  alternates: { canonical: "https://murmurlinux.com/download" },
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
