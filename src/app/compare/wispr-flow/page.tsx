import type { Metadata } from "next";
import ComparisonPage from "@/components/ComparisonPage";

export const metadata: Metadata = {
  title: "Murmur vs Wispr Flow | Linux Voice Dictation Alternative",
  description: "Compare Murmur and Wispr Flow. Offline Linux-native alternative to cloud-based voice dictation.",
  alternates: { canonical: "https://murmurlinux.com/compare/wispr-flow" },
};

export default function WisprFlowComparison() {
  return (
    <ComparisonPage
      competitor="Wispr Flow"
      tagline="A Linux-native, offline alternative."
      intro="Wispr Flow is the leading voice dictation tool on Mac, Windows, and iOS: polished, fast, and feature-rich. Murmur takes a different approach: Linux-native, 100% offline, and open source. They serve different audiences and different priorities."
      rows={[
        { label: "platform", murmur: "Linux", murmurColor: "text-amber", competitor: "Mac, Win, iOS" },
        { label: "processing", murmur: "100% local", murmurColor: "text-teal", competitor: "Cloud" },
        { label: "privacy", murmur: "Zero network", murmurColor: "text-teal", competitor: "Cloud processing" },
        { label: "account", murmur: "None required", murmurColor: "text-teal", competitor: "Required" },
        { label: "gui", murmur: "Floating widget", murmurColor: "text-amber", competitor: "Tray icon" },
        { label: "engine", murmur: "whisper.cpp (local)", competitor: "Proprietary (cloud)" },
        { label: "binary", murmur: "~15MB", murmurColor: "text-teal", competitor: "~50MB" },
        { label: "open source", murmur: "GPL v3", murmurColor: "text-teal", competitor: "Proprietary" },
        { label: "cost", murmur: "Free", murmurColor: "text-amber", competitor: "$144/yr" },
      ]}
      whySwitch={[
        { title: "Built for Linux", desc: "Murmur is Linux-native from the ground up: X11 + Wayland, PipeWire, xdotool/wtype. If Linux is your home, this was built for you." },
        { title: "Your voice stays local", desc: "All processing happens on your machine. No network requests, no cloud dependency. The code is open source. Verify it yourself." },
        { title: "Free and open source", desc: "GPL v3. The core app is free with no limits. A Pro tier will add optional cloud features for those who want speed." },
        { title: "Lightweight", desc: "~15MB binary, ~50MB RAM. Starts in under a second. Built with Rust and Tauri." },
      ]}
    />
  );
}
