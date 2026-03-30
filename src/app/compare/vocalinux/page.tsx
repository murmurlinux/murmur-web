import type { Metadata } from "next";
import ComparisonPage from "@/components/ComparisonPage";

export const metadata: Metadata = {
  title: "Murmur vs Vocalinux | Linux Voice Dictation Comparison",
  description: "Compare Murmur and Vocalinux for Linux voice dictation. Two different approaches to the same goal.",
  alternates: { canonical: "https://murmurlinux.com/compare/vocalinux" },
};

export default function VocalinuxComparison() {
  return (
    <ComparisonPage
      competitor="Vocalinux"
      tagline="Two approaches to the same goal."
      intro="Both Murmur and Vocalinux use whisper.cpp for offline transcription on Linux. Vocalinux takes a Python/GTK approach with broad engine support (whisper.cpp, VOSK, OpenAI Whisper) and Vulkan GPU acceleration. Murmur takes a Rust/Tauri approach focused on a small binary and a floating widget UI. Both are free and open source."
      rows={[
        { label: "stack", murmur: "Rust + Tauri 2", competitor: "Python + GTK" },
        { label: "binary", murmur: "~15MB", murmurColor: "text-teal", competitor: "~200MB+" },
        { label: "memory", murmur: "~50MB", murmurColor: "text-teal", competitor: "~300MB" },
        { label: "gui", murmur: "Floating widget", murmurColor: "text-amber", competitor: "GTK tray" },
        { label: "skins", murmur: "Multiple + custom", murmurColor: "text-amber", competitor: "Standard" },
        { label: "engines", murmur: "whisper.cpp", competitor: "whisper.cpp / VOSK / Whisper" },
        { label: "gpu", murmur: "Vulkan", murmurColor: "text-teal", competitor: "Vulkan" },
        { label: "wayland", murmur: "X11 + Wayland", murmurColor: "text-teal", competitor: "X11 + Wayland" },
        { label: "install", murmur: "AppImage / .deb", competitor: "pip / installer script" },
        { label: "cost", murmur: "Free", competitor: "Free" },
      ]}
      whySwitch={[
        { title: "Single binary install", desc: "One AppImage or .deb. Download and run. No runtime dependencies to manage." },
        { title: "Floating desktop widget", desc: "The Comm Badge sits on your desktop with customisable skins and accent colours. A different take on the UI." },
        { title: "Lightweight footprint", desc: "~15MB binary, ~50MB RAM. Built with Rust for minimal resource usage." },
        { title: "Pro tier coming", desc: "Cloud STT for speed, LLM text cleanup, 99+ languages, CLI mode. Optional paid features that fund ongoing development." },
      ]}
    />
  );
}
