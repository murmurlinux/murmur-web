"use client";

import { useEffect, useRef } from "react";

export default function Lightbox() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const closeBtn = el.querySelector("#lightbox-close-btn");

    const close = () => {
      el.classList.remove("active");
      el.setAttribute("aria-hidden", "true");
    };

    const handleClick = (e: MouseEvent) => {
      if (e.target === el) close();
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    el.addEventListener("click", handleClick);
    closeBtn?.addEventListener("click", close);
    document.addEventListener("keydown", handleEsc);
    return () => {
      el.removeEventListener("click", handleClick);
      closeBtn?.removeEventListener("click", close);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div
      ref={ref}
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-hidden="true"
    >
      <div className="lightbox-panel">
        <div className="lightbox-head">
          <div className="lightbox-title" id="lightbox-title"></div>
          <button className="lightbox-close" type="button" id="lightbox-close-btn">[ close ]</button>
        </div>
        <div className="lightbox-body" id="lightbox-body"></div>
      </div>
    </div>
  );
}
