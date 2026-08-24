import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Required by `output: "export"`: without this Next refuses to collect page data
// for a route handler, since it cannot prove the output is static.
export const dynamic = "force-static";

/**
 * Generated at build time into out/robots.txt.
 *
 * NOTE: this file allows crawling. It is not what currently keeps the review
 * deploy out of search results — that is the `X-Robots-Tag: noindex, nofollow`
 * header in public/.htaccess, which overrides robots.txt because it applies to
 * pages already fetched.
 *
 * Removing the header is the Phase 9 launch step. This file is deliberately
 * written for the launched state so that the switch is a single deletion in one
 * place, rather than two files that can disagree.
 *
 * `/api/` is disallowed: contact.php is a POST endpoint with nothing to index.
 */
export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/+$/, "");

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
