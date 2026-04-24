import Link from "next/link";

interface PageFooterProps {
  links?: { label: string; href: string }[];
  className?: string;
  id?: string;
}

const DEFAULT_LINKS = [
  { label: "home", href: "/" },
  { label: "pricing", href: "/pricing" },
  { label: "download", href: "/download" },
  { label: "docs", href: "/docs" },
  { label: "blog", href: "/blog" },
  { label: "changelog", href: "/changelog" },
  { label: "about", href: "/about" },
  { label: "privacy", href: "/privacy" },
  { label: "terms", href: "/terms" },
  { label: "github", href: "https://github.com/murmurlinux" },
  { label: "hello@murmurlinux.com", href: "mailto:hello@murmurlinux.com" },
];

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export default function PageFooter({ links = DEFAULT_LINKS, className, id }: PageFooterProps) {
  const combined = className ? `footer ${className}` : "footer";
  return (
    <div className={combined} id={id}>
      {links.map((link, i) => (
        <span key={link.href}>
          {isExternal(link.href) ? (
            <a href={link.href}>{link.label}</a>
          ) : (
            <Link href={link.href}>{link.label}</Link>
          )}
          {i < links.length - 1 && <span className="dot">&middot;</span>}
        </span>
      ))}
    </div>
  );
}
