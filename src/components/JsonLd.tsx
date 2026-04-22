import type { ReactElement } from "react";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Murmur",
      description:
        "AI voice to text for Linux. 100% offline, open source, powered by whisper.cpp. Press a hotkey, speak, text at your cursor.",
      operatingSystem: "Linux",
      applicationCategory: "UtilitiesApplication",
      url: "https://murmurlinux.com",
      downloadUrl: "https://murmurlinux.com/download",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "0",
        highPrice: "149",
        offerCount: 4,
      },
    },
    {
      "@type": "Organization",
      name: "Murmur Linux",
      url: "https://murmurlinux.com",
      logo: "https://murmurlinux.com/logo.png",
      sameAs: ["https://github.com/murmurlinux"],
    },
  ],
};

export default function JsonLd(): ReactElement {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
    />
  );
}
