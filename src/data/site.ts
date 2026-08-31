/**
 * Company information — the ONLY place business strings may live.
 *
 * Rules (docs/CONTENT-INVENTORY.md, .claude/skills/content-guard):
 *  - Never hard-code any of this in a component.
 *  - Never invent a value. Unknown → `PLACEHOLDER: <need> (Q<n>)`.
 *  - `grep -rn "PLACEHOLDER:" src/` must return nothing before launch.
 *
 * Everything not marked PLACEHOLDER below was confirmed for publication on
 * 2026-08-24. Client relationships, internal workflows, academy rules and
 * employee counts remain outside public source unless separately approved.
 */

export const site = {
  /** CONFIRMED — public trading name. */
  name: "Pramiva Solutions",

  /** CONFIRMED 2026-08-25 by the owner. Used for legal pages and JSON-LD. */
  legalName: "Pramiva Solutions Private Limited",

  /**
   * The confirmed legal name abbreviated — not new information. People search
   * "Pramiva Solutions Pvt Ltd" and that string appears nowhere on the site,
   * so Google returns it with "Missing: Pvt Ltd". JSON-LD alternateName only.
   */
  alternateNames: ["Pramiva Solutions Pvt. Ltd.", "Pramiva Solutions Pvt Ltd"],

  /** CONFIRMED 2026-08-26 by the owner. */
  founder: "Saradha Neupane",

  /** CONFIRMED. Published only where it reads as fact, never as experience. */
  founded: 2025,

  /** CONFIRMED 2026-08-26 by the owner. */
  legalStructure: "Private Limited Company",

  /** CONFIRMED. A city, not a postal address — see `address` below. */
  location: "Lalitpur, Nepal",

  /** CONFIRMED — on the logo, therefore public already. */
  tagline: "Think Bold. Build Smart. Scale Fast.",

  /**
   * CONFIRMED — business type and location, assembled from confirmed facts
   * only. Sits above the headline as the hero eyebrow.
   */
  descriptor: "Business and operations · Lalitpur, Nepal",

  /**
   * CONFIRMED — the approved high-level description, minus the legal name so
   * it reads as body copy. Used for the hero lead and page introductions.
   */
  summary:
    "A business and operations company based in Lalitpur, Nepal, supporting businesses in Nepal and internationally through digital marketing and customer solutions.",

  /** CONFIRMED — the approved company description, verbatim. Used for SEO. */
  description:
    "Pramiva Solutions Private Limited is a business and operations company based in Lalitpur, Nepal. We support businesses in Nepal and internationally through digital marketing and customer solutions.",

  /** CONFIRMED — the company's stated vision, verbatim. Do not paraphrase. */
  vision:
    "To help businesses everywhere grow smarter, by combining real-world experience with innovative solutions.",

  /**
   * Q7 and Q10 answered 2026-08-24 — mailbox created on the domain, and the
   * same address both displays publicly and receives enquiries.
   */
  email: "support@pramivasolutions.com.np",

  /** CONFIRMED 2026-08-30 by the owner. International format for dialing. */
  phone: "+977 976 859 1459",

  /**
   * Q27 answered 2026-08-24 from the company's Google Business Profile.
   *
   * Google lists this as "M887+FMH, Damodar Marg, Lalitpur 44600". The leading
   * token is a Plus Code — a geocoded grid reference, not a street number. It
   * is machine-readable rather than human-readable, so it is omitted from the
   * displayed line and carried by `mapUrl` instead, which is what a visitor
   * actually needs to find the office.
   *
   * Full street line confirmed 2026-08-26 by the owner.
   */
  address:
    "160-4 Damodar Marga, Dhungesadu Tole, Thasikhel, Lalitpur 44600, Nepal",

  /**
   * The same Q27 answer, split into its parts for structured data.
   *
   * Not new information and not a second source of truth — every value here is
   * a component of `address` above, decomposed because schema.org PostalAddress
   * wants the parts separately. Emitting the whole display string as
   * `streetAddress` while ALSO setting locality and country repeats the town
   * and the country twice in one address object.
   *
   * Keep the two in step: if `address` changes, change these with it.
   * `country` is the ISO 3166-1 alpha-2 code, which is what schema.org expects.
   */
  addressParts: {
    street: "160-4 Damodar Marga, Dhungesadu Tole, Thasikhel",
    locality: "Lalitpur",
    postalCode: "44600",
    country: "NP",
  },

  /** The company's own Google Business Profile listing. */
  mapUrl: "https://share.google/Bf6ujO5DWbSeZ70f5",

  // Baked into canonicals and the sitemap at build time. No prod fallback:
  // the old "https://example.com" default shipped silently from any clone
  // without .env.local, and a wrong canonical de-indexes the site.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production"
      ? (() => {
          throw new Error(
            "NEXT_PUBLIC_SITE_URL is required for a production build — it is baked into every canonical URL and the sitemap.",
          );
        })()
      : "http://localhost:3000"),

  /** Only add keys management confirms exist (Q11). Empty links look worse than none. */
  social: {} as Record<string, string>,
} as const;
