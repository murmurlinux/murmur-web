"use client";

import { useEffect, useRef } from "react";

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function ViewAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;
    animated.current = true;

    const el = containerRef.current;
    if (!el) return;

    const cmdLine = el.querySelector(".cmd-line") as HTMLElement | null;
    if (!cmdLine) return;

    const cmdSpan = cmdLine.querySelector(".cmd") as HTMLElement | null;
    if (!cmdSpan) return;

    const cmdText = cmdSpan.textContent || "";
    cmdSpan.textContent = "";

    // Hide everything after the breadcrumb
    const children = Array.from(el.children) as HTMLElement[];
    let pastCrumb = false;
    let pastCmd = false;
    children.forEach((child) => {
      if (child.classList.contains("view-crumb")) { pastCrumb = true; return; }
      if (!pastCrumb) return;
      if (child === cmdLine) { pastCmd = true; child.classList.add("typed-hidden"); return; }
      if (pastCmd) child.classList.add("typed-hidden");
    });

    async function animate() {
      try {
        // Show cmd line with blinking cursor
        cmdLine!.classList.remove("typed-hidden");
        cmdLine!.classList.add("typed-visible");

        const cursor = document.createElement("span");
        cursor.className = "cursor";
        cmdSpan!.appendChild(cursor);
        await wait(1200);

        // Type the command
        cursor.remove();
        for (let i = 0; i < cmdText.length; i++) {
          cmdSpan!.insertBefore(document.createTextNode(cmdText[i]), null);
          await wait(35);
        }
        await wait(150);

        // Reveal each hidden element
        const allChildren = Array.from(el!.children) as HTMLElement[];
        let afterCmd = false;
        for (const child of allChildren) {
          if (child === cmdLine) { afterCmd = true; continue; }
          if (afterCmd && child.classList.contains("typed-hidden")) {
            child.classList.remove("typed-hidden");
            child.classList.add("typed-visible");
            await wait(60);
          }
        }
      } catch {
        // Fallback: reveal everything
        el!.querySelectorAll(".typed-hidden").forEach((h) => {
          h.classList.remove("typed-hidden");
          h.classList.add("typed-visible");
        });
        if (cmdSpan && !cmdSpan.textContent) {
          cmdSpan.textContent = cmdText;
        }
      }
    }

    animate();
  }, []);

  return <div ref={containerRef} style={{ paddingBottom: 10 }}>{children}</div>;
}
