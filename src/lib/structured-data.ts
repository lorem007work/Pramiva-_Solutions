import { site } from "@/data/site";
import { isPlaceholder } from "@/lib/utils";

/**
 * Organization + WebSite JSON-LD for the homepage.
 *
 * WHY THIS EXISTS NOW, WHEN data/seo.ts SAID TO WAIT
 *
 * That note said to hold structured data until Q7, Q8 and Q27 were answered,
 * because "structured data asserting a false contact point gets indexed and
 * republished into knowledge panels". The reasoning is right and it still
 * governs this file. What changed is the inputs: Q7 (email) and Q27 (address)
 * are answered and confirmed in site.ts. Only Q8 (phone) is outstanding.
 *
 * `telephone` is an optional property. Omitting it emits valid, complete
 * markup that asserts nothing false — which is a different thing from emitting
 * a placeholder, and is what the original warning was actually about.
 *
 * THE SAFETY RULE IN THIS FILE
 *
 * Nothing is typed here. Every value is read from site.ts, and every optional
 * value is passed through `isPlaceholder` first, so a field that is still an
 * unanswered gap is dropped from the graph rather than published. If Q8 is
 * answered by editing site.ts, the phone appears with no change here; if it is
 * never answered, nothing false is ever emitted. The failure mode is a missing
 * property, never a wrong one.
 *
 * DELIBERATELY NOT INCLUDED
 *
 *  - `LocalBusiness` / `ProfessionalService`. Both expect opening hours and
 *    price range, which nobody has supplied. `Organization` is the honest type
 *    for what is actually known.
 *  - `sameAs`. site.social is empty (Q11) and inventing profile URLs would be
 *    both a fabrication and a live link to someone else's account.
 *  - `BreadcrumbList`. The site is one level deep; breadcrumbs would describe
 *    a hierarchy that does not exist.
 *  - `Service` / `hasOfferCatalog`. Listing the catalogue as structured offers
 *    asserts commercial availability, and one of the six is explicitly a
 *    next direction rather than something sold today.
 *  - `foundingDate` is included because 2025 is confirmed, but note it is a
 *    year only — schema.org accepts a bare year for Date.
 */

type JsonLdValue = string | number | boolean | JsonLd | JsonLd[] | readonly string[];
type JsonLd = { [key: string]: JsonLdValue };

/** Drops keys whose value is undefined, so optional gaps vanish from output. */
function compact(input: Record<string, JsonLdValue | undefined>): JsonLd {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as JsonLd;
}

/** Returns the value only when it is real content rather than an open question. */
function confirmed(value: string): string | undefined {
  return isPlaceholder(value) ? undefined : value;
}

export function buildHomeJsonLd() {
  const base = site.url.replace(/\/+$/, "");
  const organizationId = `${base}/#organization`;

  const organization = compact({
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    legalName: site.legalName,
    // The abbreviation people actually search for — see site.alternateNames.
    alternateName: site.alternateNames,
    url: `${base}/`,
    description: site.description,
    foundingDate: String(site.founded),
    email: confirmed(site.email),
    // The logo a search engine shows beside the site. Absolute URL required.
    logo: compact({
      "@type": "ImageObject",
      url: `${base}/images/brand/pramiva-logo.webp`,
      caption: site.name,
    }),
    image: `${base}/og.jpg`,
    // Parts, not the display string — see site.addressParts. Passing the whole
    // "Damodar Marg, Lalitpur 44600, Nepal" line as streetAddress while also
    // setting locality and country states the town and country twice.
    address: compact({
      "@type": "PostalAddress",
      streetAddress: site.addressParts.street,
      addressLocality: site.addressParts.locality,
      postalCode: site.addressParts.postalCode,
      addressCountry: site.addressParts.country,
    }),
    hasMap: confirmed(site.mapUrl),
  });

  const website = compact({
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: `${base}/`,
    name: site.name,
    description: site.description,
    publisher: { "@id": organizationId },
    inLanguage: "en",
  });

  // One @graph rather than two separate script tags: it lets WebSite reference
  // the Organization by @id instead of repeating it, so the two can never
  // disagree about the company's own details.
  return { "@context": "https://schema.org", "@graph": [organization, website] };
}
