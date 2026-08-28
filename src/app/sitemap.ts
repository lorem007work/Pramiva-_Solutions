import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Required by `output: "export"`: without this Next refuses to collect page data
// for a route handler, since it cannot prove the output is static.
export const dynamic = "force-static";

/**
 * Generated at build time into out/sitemap.xml by the static export.
 *
 * Routes are listed explicitly rather than derived from the filesystem: a
 * sitemap is a public claim about what exists, and a glob would silently start
 * advertising any future route the moment its folder appeared — including one
 * still holding unapproved copy.
 *
 * `/contact` carries no lastModified. Its content is a form, not copy, so a
 * date here would be noise rather than a signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/+$/, "");

  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about/`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/services/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/careers/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact/`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/privacy/`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
