import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Murmur | AI Voice to Text for Linux",
    template: "%s | Murmur",
  },
  description:
    "AI voice to text for Linux. 100% offline, open source, powered by whisper.cpp. Press a hotkey, speak, text at your cursor.",
  metadataBase: new URL("https://murmurlinux.com"),
  openGraph: {
    title: "Murmur | AI Voice to Text for Linux",
    description:
      "Press a hotkey, speak, text at your cursor. 100% offline. Your voice never leaves your machine.",
    url: "https://murmurlinux.com",
    siteName: "Murmur",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murmur | AI Voice to Text for Linux",
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
    <html
      lang="en"
      className={`${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ocean-deep text-white/40 font-sans">
        {/* Background - shared across all pages */}
        <div className="mesh" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-teal focus:text-ocean-deep focus:px-4 focus:py-2 focus:rounded">
          Skip to content
        </a>

        <Nav />
        <main id="main-content" className="relative z-10">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
