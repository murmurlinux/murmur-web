import Link from "next/link";
import ViewAnimation from "@/components/ViewAnimation";
import PageFooter from "@/components/PageFooter";

export default function NotFound() {
  return (
    <ViewAnimation>
      <p className="view-crumb"><Link href="/">~</Link><span className="sep">/</span>404</p>
      <div className="cmd-line"><span className="cmd-prompt">$</span><span className="cmd">cd /the-page-you-wanted</span></div>
      <p className="view-title">page not found</p>
      <p className="view-sub">No such file or directory. The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>

      <div className="cmd-output">
        <p className="err">404: not found</p>
      </div>

      <div className="cta-row" style={{ marginTop: 16 }}>
        <Link href="/" className="cta primary">home</Link>
        <Link href="/download" className="cta">download</Link>
        <Link href="/docs" className="cta">docs</Link>
      </div>

      <PageFooter />
    </ViewAnimation>
  );
}
