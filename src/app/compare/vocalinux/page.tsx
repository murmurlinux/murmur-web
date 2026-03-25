import type { Metadata } from "next";
import ComparisonPage from "@/components/ComparisonPage";

export const metadata: Metadata = {
  title: "Murmur vs Vocalinux — Linux Voice Dictation Comparison",
  description: "Compare Murmur and Vocalinux for Linux voice dictation. Rust vs Python, 3MB vs 200MB, floating widget vs GTK tray.",
};

export default function VocalinuxComparison() {
  return (
    <ComparisonPage
      competitor="Vocalinux"
      tagline="Same engine. Different everything else."
      intro="Both Murmur and Vocalinux use whisper.cpp for offline transcription on Linux. But Murmur is built with Rust and Tauri (~3MB binary), while Vocalinux is Python and GTK (~200MB+ with dependencies). Murmur features a floating Comm Badge widget with customisable skins; Vocalinux uses a standard GTK system tray app."
      rows={[
        { label: "stack", murmur: "Rust + Tauri 2", competitor: "Python + GTK" },
        { label: "binary", murmur: "~3MB", murmurColor: "text-teal", competitor: "~200MB+", competitorColor: "text-red-400/60" },
        { label: "memory", murmur: "~50MB", murmurColor: "text-teal", competitor: "~300MB" },
        { label: "startup", murmur: "<1s", murmurColor: "text-teal", competitor: "~3-5s" },
        { label: "gui", murmur: "Floating widget", murmurColor: "text-amber", competitor: "GTK tray" },
        { label: "skins", murmur: "Multiple + custom", murmurColor: "text-amber", competitor: "None" },
        { label: "engine", murmur: "whisper.cpp", competitor: "whisper.cpp / VOSK" },
        { label: "gpu", murmur: "Vulkan (planned)", competitor: "Vulkan" },
        { label: "wayland", murmur: "X11 + Wayland (V2)", competitor: "X11 + Wayland" },
        { label: "pro tier", murmur: "Cloud STT + LLM", murmurColor: "text-amber", competitor: "None", competitorColor: "text-white/15" },
        { label: "install", murmur: "AppImage / .deb", competitor: "pip + venv" },
        { label: "cost", murmur: "Free", murmurColor: "text-amber font-bold", competitor: "Free" },
      ]}
      whySwitch={[
        { title: "No dependency hell", desc: "One AppImage or .deb. No Python venv, no pip install, no GTK dependency chain. Download, run, done." },
        { title: "Floating desktop gadget", desc: "The Comm Badge sits on your desktop as a floating widget with customisable skins and accent colours. Not hidden in a system tray." },
        { title: "50x smaller binary", desc: "~3MB Rust binary vs ~200MB Python + dependencies. Starts in under a second. Uses ~50MB RAM." },
        { title: "Pro tier for power users", desc: "Cloud STT (<200ms), LLM text cleanup, 99+ languages, CLI mode. Vocalinux can't monetise — we can invest in features." },
      ]}
    />
  );
}
