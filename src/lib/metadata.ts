import type { Metadata } from "next";
import type { RouteSeo } from "@/data/seo";
import { site } from "@/data/site";

const socialImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: site.name,
} as const;

/** Keep canonical, Open Graph and Twitter metadata consistent on every page. */
export function createPageMetadata(route: RouteSeo): Metadata {
  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: route.path },
    openGraph: {
      title: route.title,
      description: route.description,
      url: route.path,
      siteName: site.name,
      type: "website",
      locale: "en_GB",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [socialImage.url],
    },
  };
}
