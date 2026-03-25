import type { Metadata } from "next";
import ComparisonPage from "@/components/ComparisonPage";

export const metadata: Metadata = {
  title: "Murmur vs Nerd Dictation — Linux Voice Dictation Comparison",
  description: "Compare Murmur and Nerd Dictation. Whisper vs VOSK accuracy, floating GUI vs CLI-only, modern stack vs Python script.",
};

export default function NerdDictationComparison() {
  return (
    <ComparisonPage
      competitor="Nerd Dictation"
      tagline="Same spirit. Better engine. Actual GUI."
      intro="Nerd Dictation is a beloved CLI tool for Linux voice dictation using VOSK. Murmur takes the same offline-first philosophy but pairs it with whisper.cpp (significantly better accuracy), a floating desktop widget, and a modern Rust/Tauri stack."
      rows={[
        { label: "engine", murmur: "whisper.cpp", murmurColor: "text-teal", competitor: "VOSK" },
        { label: "accuracy", murmur: "~5% WER (small)", murmurColor: "text-teal", competitor: "~15-20% WER" },
        { label: "gui", murmur: "Floating widget", murmurColor: "text-amber", competitor: "None (CLI only)", competitorColor: "text-white/15" },
        { label: "stack", murmur: "Rust + Tauri 2", competitor: "Python" },
        { label: "binary", murmur: "~3MB", murmurColor: "text-teal", competitor: "~1MB (+ deps)" },
        { label: "memory", murmur: "~50MB", competitor: "~200MB" },
        { label: "skins", murmur: "Multiple + custom", murmurColor: "text-amber", competitor: "N/A", competitorColor: "text-white/15" },
        { label: "hotkey", murmur: "Configurable GUI", murmurColor: "text-teal", competitor: "Manual xdotool/evdev" },
        { label: "text inject", murmur: "Automatic (XTEST)", competitor: "Automatic (xdotool)" },
        { label: "pro tier", murmur: "Cloud STT + LLM", murmurColor: "text-amber", competitor: "None", competitorColor: "text-white/15" },
        { label: "cost", murmur: "Free", murmurColor: "text-amber font-bold", competitor: "Free" },
      ]}
      whySwitch={[
        { title: "Whisper accuracy", desc: "whisper.cpp's small model achieves ~5% word error rate — dramatically better than VOSK. The difference is night and day for technical dictation." },
        { title: "No CLI setup", desc: "Download the AppImage and run. No Python venv, no manual xdotool keybinding, no shell scripts. Configuration through a visual settings panel." },
        { title: "Desktop presence", desc: "The Comm Badge sits on your desktop as a floating widget. Visual feedback when recording, waveform display, status LEDs. Not invisible." },
        { title: "Future-proof", desc: "Cloud STT for <200ms speed, LLM text cleanup, multi-language, CLI mode for scripting. A platform, not just a script." },
      ]}
    />
  );
}
