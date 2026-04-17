"use client";

import { useState } from "react";

export default function CopyButton({ targetId }: { targetId: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const pre = document.getElementById(targetId);
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent || "").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      className={`copy-btn${copied ? " copied" : ""}`}
      type="button"
      onClick={handleCopy}
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}
