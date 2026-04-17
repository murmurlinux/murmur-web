import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://murmurlinux.com";
  // Stamp every build with the current date. Static sitemap generation runs
  // at build time, so this reflects when the site was last deployed.
  const lastBuild = new Date().toISOString();

  return [
    { url: baseUrl, lastModified: lastBuild, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/download`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: lastBuild, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/docs`, lastModified: lastBuild, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: lastBuild, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/blog/why-murmur`, lastModified: lastBuild, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/blog/how-it-runs-local`, lastModified: lastBuild, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/blog/introducing-pro`, lastModified: lastBuild, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/changelog`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: lastBuild, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: lastBuild, changeFrequency: "yearly", priority: 0.3 },
  ];
}
