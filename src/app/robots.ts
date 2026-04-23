import type { MetadataRoute } from "next";

// Keep Vercel preview deployments out of Google's index. Only production
// should be crawlable; preview URLs would otherwise dilute the main
// domain's ranking signals as duplicate content.
export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";

  if (!isProd) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://murmurlinux.com/sitemap.xml",
    host: "https://murmurlinux.com",
  };
}
