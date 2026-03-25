import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://murmurlinux.com";
  const lastBuild = "2026-03-25";

  return [
    { url: baseUrl, lastModified: lastBuild, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/download`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/docs`, lastModified: lastBuild, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/changelog`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/compare/vocalinux`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/wispr-flow`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/nerd-dictation`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: lastBuild, changeFrequency: "yearly", priority: 0.3 },
  ];
}
