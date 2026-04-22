"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { APP_VERSION } from "@/lib/app-version";

const NAV_MAP: Record<string, string> = {
  home: "/", "cd /": "/", "cd ~": "/", cd: "/",
  pricing: "/pricing", "cd pricing": "/pricing", "cd /pricing": "/pricing",
  download: "/download", "cd download": "/download", "cd /download": "/download",
  login: "/login", signin: "/login", "sign in": "/login",
  signup: "/pricing", register: "/pricing", useradd: "/pricing",
  account: "/account", "cd account": "/account", "cd /account": "/account",
  docs: "/docs", man: "/docs", "man murmur": "/docs",
  changelog: "/changelog", log: "/changelog", "git log": "/changelog",
  blog: "/blog", posts: "/blog", "cd /posts": "/blog",
  about: "/about", "cat about.txt": "/about",
  privacy: "/privacy", "cat privacy.txt": "/privacy",
  terms: "/terms", "cat terms.txt": "/terms",
};

const FORTUNES = [
  '"The best interface is no interface." - Golden Krishna',
  '"Talk is cheap. Show me the code." - Linus Torvalds. Or just talk and let Murmur show the text.',
  '"Any sufficiently advanced voice recognition is indistinguishable from someone typing really fast."',
  '"I have not failed. I have just found 10,000 words that Whisper transcribed wrong." - Edison, probably.',
  '"In a world of AI chatbots, be a dictation app."',
  '"chmod +x your_voice"',
  '"There are only two hard things in CS: cache invalidation, naming things, and getting whisper to stop hallucinating."',
];

const NOT_FOUNDS = [
  (cmd: string) => "command not found: " + cmd,
  (cmd: string) => "command not found: " + cmd + ". this incident will NOT be reported.",
  (cmd: string) => "bash: " + cmd + ": command not found. wait, this isn't bash.",
  (cmd: string) => cmd + ": permission denied. just kidding, command not found.",
];

// DOM helpers (matching static site approach)
function el(tag: string, className?: string) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  return e;
}

function span(className: string, text: string) {
  const s = el("span", className);
  s.textContent = text;
  return s;
}

function para(className: string | null, ...parts: (string | Node)[]) {
  const p = el("p", className || undefined);
  parts.forEach((part) => {
    if (typeof part === "string") p.appendChild(document.createTextNode(part));
    else p.appendChild(part);
  });
  return p;
}

function link(href: string, text: string) {
  const a = el("a") as HTMLAnchorElement;
  a.href = href;
  a.textContent = text;
  return a;
}

function getOutputContainer() {
  return document.getElementById("terminal-output");
}

function appendCmdLine(cmd: string) {
  const container = getOutputContainer();
  if (!container) return;
  const line = el("div", "cmd-line dynamic");
  line.appendChild(span("cmd-prompt", "$"));
  const cmdSpan = el("span", "cmd");
  cmdSpan.textContent = cmd;
  line.appendChild(cmdSpan);
  container.appendChild(line);
}

function appendOutput(...children: Node[]) {
  const container = getOutputContainer();
  if (!container) return;
  const out = el("div", "cmd-output dynamic");
  children.forEach((c) => out.appendChild(c));
  container.appendChild(out);
}

export default function TerminalBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const router = useRouter();
  const pathname = usePathname();

  // Clear dynamic outputs on navigation
  useEffect(() => {
    const container = getOutputContainer();
    if (container) {
      container.querySelectorAll(".dynamic").forEach((n) => n.remove());
    }
  }, [pathname]);

  const handleCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;
      const c = cmd.toLowerCase();

      setCmdHistory((prev) => [c, ...prev]);
      setHistoryIdx(-1);
      appendCmdLine(cmd);

      // Navigation
      if (c in NAV_MAP) {
        router.push(NAV_MAP[c]);
        return;
      }

      // Demo
      if (c === "demo" || c === "watch" || c === "watch demo") {
        const lb = document.getElementById("lightbox");
        if (lb) {
          const title = document.getElementById("lightbox-title");
          if (title) title.textContent = "murmur demo";
          lb.classList.add("active");
          lb.setAttribute("aria-hidden", "false");
        }
        return;
      }

      // Subscribe
      if (c.startsWith("subscribe ")) {
        const email = cmd.replace(/^subscribe\s+/i, "").trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          appendOutput(
            para("err", "usage: subscribe you@email.com"),
            para("muted", "enter a valid email address.")
          );
        } else {
          fetch("/api/waitlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          appendOutput(
            para("ok", "subscribed: " + email),
            para("muted", "you'll receive updates about new features, blog posts, and releases. no spam, unsubscribe anytime.")
          );
        }
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        return;
      }
      if (c === "subscribe") {
        appendOutput(
          para("muted", "usage: subscribe you@email.com"),
          para("muted", "get notified about new features, blog posts, and releases.")
        );
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        return;
      }

      // Help
      if (c === "help") {
        appendOutput(
          para("muted", "navigation:"),
          para(null, span("accent", "home"), "       return to the home view"),
          para(null, span("accent", "pricing"), "    free vs pro"),
          para(null, span("accent", "demo"), "       watch the demo video"),
          para(null, span("accent", "download"), "   install instructions"),
          para(null, span("accent", "docs"), "       man page"),
          para(null, span("accent", "changelog"), "  release history"),
          para(null, span("accent", "blog"), "       project writing"),
          para(null, span("accent", "login"), "      sign in"),
          para(null, span("accent", "account"), "    your account (after sign in)"),
          para(null, span("accent", "about"), "      who, why, what"),
          para("muted", "subscribe:"),
          para(null, span("accent", "subscribe"), "  subscribe <email> to get notified"),
          para("muted", "other:"),
          para(null, span("accent", "ls"), "         list features on home"),
          para(null, span("accent", "github"), "     open source repo"),
          para(null, span("accent", "clear"), "      clear this session"),
          para(null, span("accent", "sudo"), "       nice try")
        );
      } else if (c === "whoami") {
        appendOutput(para(null, "Murmur. Voice dictation for Linux that doesn't suck."));
      } else if (c === "ls" || c === "ls /features/" || c === "ls -la /features/") {
        appendOutput(
          para(null, "push_to_talk  whisper.cpp  silero_vad  ai_cleanup"),
          para(null, "hotkey_config  clipboard_paste  auto_update")
        );
      } else if (c === "github") {
        appendOutput(para(null, "opening ", link("https://github.com/murmurlinux", "github.com/murmurlinux"), "..."));
        window.open("https://github.com/murmurlinux", "_blank");
      } else if (c === "clear") {
        const container = getOutputContainer();
        if (container) container.querySelectorAll(".dynamic").forEach((n) => n.remove());
        window.scrollTo(0, 0);
        return;
      } else if (c === "sudo" || c.startsWith("sudo ")) {
        if (c === "sudo make me a sandwich") {
          appendOutput(para("ok", "okay."));
        } else {
          appendOutput(para("err", "permission denied. you are not in the sudoers file. this incident has been reported."));
        }
      } else if (c === "exit" || c === "quit" || c === "logout") {
        appendOutput(para("muted", "nothing to exit from. you're just on a website."));
      } else if (c === "rm -rf" || c === "rm -rf /" || c === "rm -rf /*" || c === "rm -rf ~") {
        appendOutput(para("err", "please do not."));
      } else if (c === "uname -a" || c === "uname") {
        appendOutput(para(null, `murmur_os ${APP_VERSION} #1 SMP PREEMPT Linux rust/tauri GNU/Linux`));
      } else if (c === "make me a sandwich") {
        appendOutput(para("err", "what? make it yourself."));
      } else if (c === "cowsay" || c.startsWith("cowsay ")) {
        const msg = c.replace(/^cowsay\s*/, "") || "moo-rmur";
        const cowPre = document.createElement("pre");
        cowPre.style.margin = "0";
        cowPre.style.fontFamily = "inherit";
        cowPre.style.fontSize = "13px";
        const bar = "-".repeat(msg.length + 2);
        cowPre.textContent =
          " " + bar + "\n" +
          "< " + msg + " >\n" +
          " " + bar + "\n" +
          "        \\   ^__^\n" +
          "         \\  (oo)\\_______\n" +
          "            (__)\\       )\\/\\\n" +
          "                ||----w |\n" +
          "                ||     ||";
        const cowOut = el("div", "cmd-output dynamic");
        cowOut.appendChild(cowPre);
        getOutputContainer()?.appendChild(cowOut);
      } else if (c === "neofetch") {
        const nfPre = document.createElement("pre");
        nfPre.style.margin = "0";
        nfPre.style.fontFamily = "inherit";
        nfPre.style.fontSize = "13px";
        nfPre.textContent =
          "       m)))          murmur@linux\n" +
          `      -------        OS: murmur_os ${APP_VERSION}\n` +
          "                     Host: your machine, not ours\n" +
          "                     Kernel: rust + tauri 2\n" +
          "                     Shell: this website\n" +
          "                     Engine: whisper.cpp\n" +
          "                     Memory: ~50 MB\n" +
          "                     Telemetry: none";
        const nfOut = el("div", "cmd-output dynamic");
        nfOut.appendChild(nfPre);
        getOutputContainer()?.appendChild(nfOut);
      } else if (c === "fortune") {
        appendOutput(para(null, FORTUNES[Math.floor(Math.random() * FORTUNES.length)]));
      } else if (c === "sl") {
        const slPre = document.createElement("pre");
        slPre.style.margin = "0";
        slPre.style.fontFamily = "inherit";
        slPre.style.fontSize = "13px";
        slPre.textContent =
          "      ====        ________\n" +
          "  _D _|  |_______/        \\__I\n" +
          "   |(_)---  |   H\\________/ |\n" +
          "   /     |  |   H  |  |     |\n" +
          "  |      |  |   H  |__|     |\n" +
          "  | ________|___H__|__|_____/\n" +
          "  //I     I        I     I\n" +
          " ----------        -----------";
        const slOut = el("div", "cmd-output dynamic");
        slOut.appendChild(para("muted", "(a tiny mass transit vehicle chugs across your terminal)"));
        slOut.appendChild(slPre);
        getOutputContainer()?.appendChild(slOut);
      } else if (c === "htop" || c === "top") {
        appendOutput(
          para("muted", "murmur is using approximately 0.3% of your CPU."),
          para("muted", "the other 99.7% is chrome tabs. as usual.")
        );
      } else if (c === "ping" || c.startsWith("ping ")) {
        appendOutput(
          para(null, "64 bytes from localhost: icmp_seq=1 ttl=64 time=0.0ms"),
          para("ok", "murmur is alive and well. your data never left.")
        );
      } else if (c === "apt update" || c === "apt upgrade" || c === "pacman -syu") {
        appendOutput(para("ok", "everything is already up to date. murmur auto-updates, remember?"));
      } else if (c === "vim" || c === "vi") {
        appendOutput(para("muted", "good luck getting out of this one. try :q! or just use murmur to dictate instead."));
      } else if (c === "emacs") {
        appendOutput(para("muted", "a fine operating system. just needs a good text editor. and a voice dictation app."));
      } else {
        const nf = NOT_FOUNDS[Math.floor(Math.random() * NOT_FOUNDS.length)](cmd);
        appendOutput(
          para("err", nf),
          para("muted", "type ", span("accent", "help"), " for commands")
        );
      }

      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputRef.current?.value || "");
      if (inputRef.current) inputRef.current.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(newIdx);
      if (inputRef.current) inputRef.current.value = cmdHistory[newIdx] || "";
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        if (inputRef.current) inputRef.current.value = cmdHistory[newIdx] || "";
      } else {
        setHistoryIdx(-1);
        if (inputRef.current) inputRef.current.value = "";
      }
    }
  };

  // Focus input on click anywhere (except links/buttons/inputs)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["A", "BUTTON", "INPUT", "TEXTAREA"].includes(tag)) return;
      if ((e.target as HTMLElement).closest("#lightbox")) return;
      inputRef.current?.focus();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div
      id="terminal-input"
      className={hasFocus ? "has-focus" : ""}
    >
      <span className="cmd-prompt">$</span>
      <div className="input-cursor" />
      <input
        ref={inputRef}
        type="text"
        placeholder="PgDn for more : type a command : try help : or subscribe you@email.com"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
