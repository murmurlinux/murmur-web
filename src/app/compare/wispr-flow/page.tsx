import type { Metadata } from "next";
import ComparisonPage from "@/components/ComparisonPage";

export const metadata: Metadata = {
  title: "Murmur vs Wispr Flow — Linux Voice Dictation Alternative",
  description: "Compare Murmur and Wispr Flow. 100% offline vs cloud-only, Linux-native vs no Linux support, free vs $144/yr.",
};

export default function WisprFlowComparison() {
  return (
    <ComparisonPage
      competitor="Wispr Flow"
      tagline="Everything Wispr does, without the cloud. And on Linux."
      intro="Wispr Flow is the market leader in voice dictation — but it doesn't support Linux, requires a cloud connection, captures screenshots, and costs $144/year. Murmur is 100% offline, Linux-native, open source, and free."
      rows={[
        { label: "platform", murmur: "Linux", murmurColor: "text-amber", competitor: "Mac, Win, iOS" },
        { label: "processing", murmur: "100% local", murmurColor: "text-teal", competitor: "Cloud only", competitorColor: "text-red-400/60" },
        { label: "privacy", murmur: "Zero network", murmurColor: "text-teal", competitor: "Screenshots + audio sent to cloud", competitorColor: "text-red-400/60" },
        { label: "account", murmur: "None required", murmurColor: "text-teal", competitor: "Required" },
        { label: "gui", murmur: "Floating widget", murmurColor: "text-amber", competitor: "Tray icon" },
        { label: "engine", murmur: "whisper.cpp (local)", competitor: "Proprietary (cloud)" },
        { label: "binary", murmur: "~3MB", murmurColor: "text-teal", competitor: "~50MB" },
        { label: "memory", murmur: "~50MB", murmurColor: "text-teal", competitor: "~800MB", competitorColor: "text-red-400/60" },
        { label: "open source", murmur: "GPL v3", murmurColor: "text-teal", competitor: "Closed source", competitorColor: "text-white/15" },
        { label: "cost", murmur: "$0", murmurColor: "text-amber font-bold", competitor: "$144/yr", competitorColor: "text-red-400/60" },
      ]}
      whySwitch={[
        { title: "Actually runs on Linux", desc: "Wispr Flow doesn't support Linux at all. Murmur is built for Linux from the ground up — X11, Wayland, PipeWire, xdotool." },
        { title: "Your voice stays on your machine", desc: "Zero network requests. No cloud processing, no screenshots captured, no data sent anywhere. Verify it — the code is open source." },
        { title: "No subscription", desc: "Free forever with unlimited local whisper. Pro tier adds optional cloud STT for speed — still cheaper than Wispr at $12/mo." },
        { title: "Open source", desc: "GPL v3. Read the code, audit the privacy claims, contribute features. Try doing that with Wispr's proprietary binary." },
      ]}
    />
  );
}
