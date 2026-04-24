"use client";

import Link from "next/link";
import ViewAnimation from "@/components/ViewAnimation";
import PageFooter from "@/components/PageFooter";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>error</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">echo $?</span></div>
      <p className="view-title">something went wrong</p>
      <p className="view-sub">An unexpected error occurred. You can try again, head home, or curse quietly.</p>

      <div className="cmd-output">
        <p className="err">exit code 1: unknown error</p>
      </div>

      <div className="cta-row" style={{ marginTop: 16 }}>
        <button type="button" className="cta primary" onClick={() => reset()}>retry</button>
        <Link href="/" className="cta">home</Link>
      </div>

      <PageFooter />
    </ViewAnimation>
  );
}
