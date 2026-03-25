import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import ChatPlaceholder from "@/components/ChatPlaceholder";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Murmur — Voice Dictation for Linux",
    template: "%s | Murmur",
  },
  description:
    "Voice dictation for Linux. 100% offline, open source, powered by whisper.cpp. Press a hotkey, speak, text at your cursor.",
  metadataBase: new URL("https://murmurlinux.com"),
  openGraph: {
    title: "Murmur — Voice Dictation for Linux",
    description:
      "Press a hotkey, speak, text at your cursor. 100% offline. Your voice never leaves your machine.",
    url: "https://murmurlinux.com",
    siteName: "Murmur",
    images: [{ url: "/logo.png", width: 512, height: 512 }],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
  robots: {
    index: false,
    follow: false,
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
        {children}
        <ChatPlaceholder />
      </body>
    </html>
  );
}
