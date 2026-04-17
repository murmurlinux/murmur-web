import Link from "next/link";

interface PageFooterProps {
  links?: { label: string; href: string }[];
}

const DEFAULT_LINKS = [
  { label: "home", href: "/" },
  { label: "pricing", href: "/pricing" },
  { label: "download", href: "/download" },
  { label: "docs", href: "/docs" },
  { label: "changelog", href: "/changelog" },
  { label: "blog", href: "/blog" },
  { label: "about", href: "/about" },
  { label: "privacy", href: "/privacy" },
  { label: "terms", href: "/terms" },
];

export default function PageFooter({ links = DEFAULT_LINKS }: PageFooterProps) {
  return (
    <div className="footer">
      {links.map((link, i) => (
        <span key={link.href}>
          <Link href={link.href}>{link.label}</Link>
          {i < links.length - 1 && <span className="dot">&middot;</span>}
        </span>
      ))}
    </div>
  );
}
