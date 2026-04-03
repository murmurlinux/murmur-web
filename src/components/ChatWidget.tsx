"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const transport = new DefaultChatTransport({ api: "/api/chat" });

const SESSION_LIMIT = 15;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error } = useChat({ transport });

  const isStreaming = status === "streaming" || status === "submitted";
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const limitReached = userMessageCount >= SESSION_LIMIT;
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened, return focus to toggle on close
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      toggleRef.current?.focus();
    }
  }, [open]);

  // Escape to close + basic focus trap
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      // Trap Tab within the panel
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isStreaming || limitReached) return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded chat panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Chat with Murmur assistant"
          className="absolute bottom-16 right-0 w-[calc(100vw-48px)] max-w-[400px] flex flex-col rounded-2xl border border-glass-border overflow-hidden shadow-2xl shadow-black/30"
          style={{
            background: "rgba(6, 13, 24, 0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            maxHeight: "min(520px, calc(100vh - 120px))",
            animation: "chatSlideUp 0.2s ease-out",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal led" />
              <span className="text-xs font-mono text-glass-light">
                Ask about Murmur
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-glass-text hover:text-glass-light transition-colors p-1"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px]">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="flex gap-2">
                <div className="shrink-0 w-6 h-6 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
                <div className="text-xs text-glass-text leading-relaxed pt-1">
                  Hi! I can help with installing Murmur, features, pricing, or troubleshooting. What would you like to know?
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {message.role === "assistant" && (
                  <div className="shrink-0 w-6 h-6 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    message.role === "user"
                      ? "bg-teal/15 border border-teal/20 text-glass-light"
                      : "bg-white/[0.03] border border-glass-border text-glass-text"
                  }`}
                >
                  {message.parts.map((part, i) =>
                    part.type === "text" ? (
                      <span key={`${message.id}-${i}`} className="whitespace-pre-wrap">
                        {part.text}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-2">
                <div className="shrink-0 w-6 h-6 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
                <div className="bg-white/[0.03] border border-glass-border rounded-xl px-3 py-2 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-glass-text/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-glass-text/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-glass-text/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex gap-2">
                <div className="shrink-0 w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="bg-red-500/5 border border-red-500/10 rounded-xl px-3 py-2 text-xs text-red-300/70">
                  {error.message?.includes("429")
                    ? "Too many messages. Please wait a moment and try again."
                    : "Something went wrong. Please try again."}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Session limit notice */}
          {limitReached && (
            <div className="px-4 py-2 text-[10px] text-amber text-center border-t border-glass-border">
              Session limit reached.{" "}
              <a href="/docs" className="underline hover:text-amber/80">
                Check the docs
              </a>{" "}
              for more help.
            </div>
          )}

          {/* Input */}
          {!limitReached && (
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 px-3 py-3 border-t border-glass-border"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                maxLength={500}
                disabled={isStreaming}
                className="flex-1 bg-white/[0.03] border border-glass-border rounded-lg px-3 py-2 text-xs text-glass-light placeholder:text-glass-text/30 outline-none focus:border-teal/30 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="px-3 py-2 rounded-lg bg-teal/15 border border-teal/20 text-teal text-xs font-mono hover:bg-teal/25 transition-colors disabled:opacity-30 disabled:cursor-default"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="px-4 py-1.5 text-[9px] text-glass-text/20 text-center font-mono">
            Powered by Gemini
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
          open
            ? "bg-teal/20 border border-teal/30 text-teal"
            : "glass text-glass-text/50 hover:text-teal/70 hover:border-teal/20"
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )}
      </button>
    </div>
  );
}
