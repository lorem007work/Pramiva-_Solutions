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

  /** CONFIRMED — registered legal entity. Used for legal pages and JSON-LD. */
  legalName: "Pramiva Solutions Private Limited",

  /** CONFIRMED. Published only where it reads as fact, never as experience. */
  founded: 2025,

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
    "A business and operations company based in Lalitpur, Nepal, supporting businesses in Nepal and internationally through digital marketing, customer systems and customer service.",

  /** CONFIRMED — the approved company description, verbatim. Used for SEO. */
  description:
    "Pramiva Solutions Private Limited is a business and operations company based in Lalitpur, Nepal. We support businesses in Nepal and internationally through digital marketing, customer systems and customer service.",

  /** CONFIRMED — the company's stated vision, verbatim. Do not paraphrase. */
  vision:
    "To help businesses everywhere grow smarter, by combining real-world experience with innovative solutions.",

  /** Q7 answered 2026-08-24 — mailbox created on the domain. */
  email: "support@pramivasolutions.com.np",
  phone: "PLACEHOLDER: display phone number (Q8)",

  /** The city is confirmed; the street address is not. */
  address: "PLACEHOLDER: full postal address in Lalitpur (Q27)",

  /** Baked into canonical URLs and the sitemap AT BUILD TIME. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  /** Only add keys management confirms exist (Q11). Empty links look worse than none. */
  social: {} as Record<string, string>,
} as const;
