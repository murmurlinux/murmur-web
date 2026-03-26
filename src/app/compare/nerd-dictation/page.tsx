import type { Metadata } from "next";
import ComparisonPage from "@/components/ComparisonPage";

export const metadata: Metadata = {
  title: "Murmur vs Nerd Dictation — Linux Voice Dictation Comparison",
  description: "Compare Murmur and Nerd Dictation. Whisper vs VOSK, GUI vs CLI, two different tools for Linux voice input.",
  alternates: { canonical: "https://murmurlinux.com/compare/nerd-dictation" },
};

export default function NerdDictationComparison() {
  return (
    <ComparisonPage
      competitor="Nerd Dictation"
      tagline="Different tools, same offline-first philosophy."
      intro="Nerd Dictation is a beloved CLI tool that pioneered accessible voice dictation on Linux using VOSK. Murmur shares that offline-first philosophy but takes a different approach — whisper.cpp for the engine, Rust/Tauri for the stack, and a floating desktop widget for the UI. Both are free and open source."
      rows={[
        { label: "engine", murmur: "whisper.cpp", murmurColor: "text-teal", competitor: "VOSK" },
        { label: "gui", murmur: "Floating widget", murmurColor: "text-amber", competitor: "CLI" },
        { label: "stack", murmur: "Rust + Tauri 2", competitor: "Python" },
        { label: "binary", murmur: "~3MB", murmurColor: "text-teal", competitor: "~1MB (+ deps)" },
        { label: "memory", murmur: "~50MB", competitor: "~200MB" },
        { label: "skins", murmur: "Multiple + custom", murmurColor: "text-amber", competitor: "N/A" },
        { label: "hotkey", murmur: "Configurable GUI", murmurColor: "text-teal", competitor: "Manual evdev/xdotool" },
        { label: "text inject", murmur: "XTEST", competitor: "xdotool" },
        { label: "cost", murmur: "Free", competitor: "Free" },
      ]}
      whySwitch={[
        { title: "Whisper engine", desc: "Murmur uses whisper.cpp which generally offers higher accuracy than VOSK, especially for technical vocabulary and longer phrases." },
        { title: "Visual interface", desc: "The Comm Badge provides visual feedback — waveform display, status LEDs, recording state. Useful if you prefer a GUI over CLI." },
        { title: "Single binary install", desc: "Download the AppImage and run. Configuration through a visual settings panel rather than config files." },
        { title: "Pro features coming", desc: "Cloud STT for speed, LLM text cleanup, multi-language. Plus a CLI mode for those who prefer the terminal." },
      ]}
    />
  );
}
