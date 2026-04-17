"use client";

import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import ViewAnimation from "@/components/ViewAnimation";

export default function HowItRunsLocalPage() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span><Link href="/blog">blog</Link><span className="sep">/</span>how-it-runs-local</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cat /posts/how-it-runs-local.md</span></div>
      <p className="view-title">How It Runs Local</p>
      <p className="view-sub">whisper.cpp, silero vad, and the full local pipeline. Published April 2026.</p>

      <div className="manpage">
        <h3>the pipeline</h3>
        <p>When you hold the hotkey and speak, six things happen in sequence: audio capture, voice activity detection, resampling, transcription, output sanitisation, and text injection. No network calls. No cloud. Everything runs in a single process on your machine. Here&apos;s how each stage works.</p>

        <h3>audio capture</h3>
        <p>Murmur captures audio through <code>cpal</code>, a cross-platform Rust audio library. On Linux, cpal talks to PipeWire or PulseAudio, whichever your system provides. It opens the default input device and starts streaming audio frames the moment you press the hotkey.</p>
        <p>The raw audio comes in at whatever sample rate your microphone provides, typically 44.1 kHz or 48 kHz, in whatever channel layout the device reports. Murmur collects these frames into a buffer in real time. The buffer grows as long as you hold the key or until auto-stop triggers.</p>

        <h3>voice activity detection</h3>
        <p>Murmur uses <strong>Silero VAD</strong> (Voice Activity Detection), a small neural network that distinguishes speech from silence. It runs continuously on the incoming audio during recording.</p>
        <p>This serves two purposes. In tap mode, it enables auto-stop: when Silero detects sustained silence after speech, Murmur stops recording automatically so you don&apos;t have to press the key again. In both modes, it trims trailing silence from the buffer before transcription. This matters because whisper.cpp has a known tendency to hallucinate words like &quot;Thank you&quot; or &quot;Thanks for watching&quot; when fed silence. Trimming the tail reduces these phantom outputs significantly.</p>

        <h3>resampling</h3>
        <p>Whisper expects 16 kHz mono PCM audio. Most microphones don&apos;t record at 16 kHz. Before transcription, Murmur resamples the captured audio: stereo is mixed down to mono, and the sample rate is converted to 16,000 Hz. This happens in memory, on the raw buffer. The resampled audio is passed directly to the whisper.cpp context.</p>

        <h3>speech-to-text</h3>
        <p>Transcription runs through <code>whisper.cpp</code>, accessed via the <code>whisper-rs 0.16</code> Rust bindings. whisper.cpp is a C/C++ port of OpenAI&apos;s Whisper model, optimised for CPU inference. It runs the full encoder-decoder transformer locally, with no server component.</p>
        <p>Three models are available:</p>
        <p className="indent"><strong>tiny.en</strong> (75 MB): ~3-4 seconds for 10 seconds of speech. Good enough for casual dictation. This is the default.</p>
        <p className="indent"><strong>base.en</strong> (142 MB): ~8-10 seconds. Better accuracy, especially for less common words. A good middle ground.</p>
        <p className="indent"><strong>small.en</strong> (466 MB): ~20-30 seconds on CPU. The most accurate local option. Best for longer dictation sessions where precision matters.</p>
        <p>Speed estimates are for CPU inference on a modern x86 processor. When Vulkan GPU acceleration is available (via whisper-rs&apos;s Vulkan backend), all models run significantly faster. Murmur detects Vulkan support at startup and uses it automatically. If Vulkan isn&apos;t available, it falls back to CPU without any user intervention.</p>
        <p>Models download from Hugging Face on first use and are SHA256-verified. After that, they&apos;re cached in <code>~/.local/share/com.murmurlinux.murmur/models/</code> and loaded from disk on each launch.</p>

        <h3>output sanitisation</h3>
        <p>whisper.cpp sometimes returns artefacts: leading/trailing whitespace, repeated punctuation, or hallucinated tokens from silence at the edges of the audio. Murmur runs a sanitisation pass on the raw output before injecting it. This is straightforward string processing, not an LLM. It trims whitespace, collapses redundant punctuation, and removes known hallucination patterns. The goal is to give you clean text without altering what you actually said.</p>

        <h3>text injection</h3>
        <p>The final step: getting the transcribed text into whatever application you&apos;re using. Murmur supports two injection backends depending on your display server.</p>
        <p>On <strong>X11</strong>, it uses <code>xdotool</code> to simulate keystrokes. xdotool types each character into the currently focused window, as if you had pressed the keys yourself. This works in any application that accepts keyboard input.</p>
        <p>On <strong>Wayland</strong>, it uses <code>wtype</code>, which does the same thing through Wayland&apos;s input protocols.</p>
        <p>If neither tool is installed, Murmur falls back to copying the text to your clipboard. You paste with Ctrl+V. Functional, just less seamless.</p>

        <h3>why it&apos;s small</h3>
        <p>The installed binary is ~15 MB. RAM usage at idle is ~50 MB. During transcription, memory usage rises based on the model size (the model weights are loaded into memory), then drops back down.</p>
        <p>This is possible because the heavy lifting is done by whisper.cpp, which is C code compiled and linked statically. The Tauri 2 shell uses the system&apos;s WebView rather than bundling a browser engine. SolidJS compiles to minimal vanilla JS. There&apos;s no Electron, no Chromium, no 200 MB runtime. The result is a native app that behaves like one.</p>

        <h3>the full sequence</h3>
        <p>To put it all together:</p>
        <p className="indent">1. You press the hotkey. Murmur opens the default audio input via cpal.</p>
        <p className="indent">2. Audio frames stream into a buffer. Silero VAD monitors for speech and silence.</p>
        <p className="indent">3. You release the hotkey (or auto-stop triggers after sustained silence).</p>
        <p className="indent">4. The buffer is resampled to 16 kHz mono PCM.</p>
        <p className="indent">5. whisper.cpp transcribes the audio using the selected model.</p>
        <p className="indent">6. The raw output is sanitised.</p>
        <p className="indent">7. The cleaned text is injected at your cursor via xdotool, wtype, or clipboard.</p>
        <p>Start to finish, the entire pipeline runs in a single process on your machine. No network calls, no cloud, no telemetry. The audio exists in memory for the duration of the transcription and is then discarded. You can verify all of this in the <a href="https://github.com/murmurlinux/murmur">source code</a>.</p>
      </div>

      <div className="cta-row" style={{ marginTop: 24 }}>
        <Link href="/blog" className="cta">back to posts</Link>
        <Link href="/download" className="cta">download free</Link>
        <Link href="/pricing" className="cta primary">get pro</Link>
        <a href="https://github.com/murmurlinux" className="cta"><GithubIcon />github</a>
      </div>

      <div className="footer">
        <Link href="/blog">blog</Link><span className="dot">&middot;</span>
        <Link href="/">home</Link><span className="dot">&middot;</span>
        <Link href="/docs">docs</Link>
      </div>
    </ViewAnimation>
  );
}
