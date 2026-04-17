import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import TerminalBar from "@/components/TerminalBar";
import Lightbox from "@/components/Lightbox";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "murmur // voice dictation for linux that doesn't suck",
    template: "%s // murmur",
  },
  description:
    "AI voice to text for Linux. 100% offline, open source, powered by whisper.cpp. Press a hotkey, speak, text at your cursor.",
  metadataBase: new URL("https://murmurlinux.com"),
  openGraph: {
    title: "murmur // voice dictation for linux that doesn't suck",
    description:
      "Press a hotkey, speak, text at your cursor. 100% offline. Your voice never leaves your machine.",
    url: "https://murmurlinux.com",
    siteName: "Murmur",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "murmur // voice dictation for linux that doesn't suck",
    description: "Press a hotkey, speak, text at your cursor. 100% offline.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://murmurlinux.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.className}>
      <body>
        <ScrollToTop />
        {children}
        <div id="terminal-output"></div>
        <TerminalBar />
        <Lightbox />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
