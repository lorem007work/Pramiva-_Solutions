/**
 * Company information — the ONLY place business strings may live.
 *
 * Rules (docs/CONTENT-INVENTORY.md, .claude/skills/content-guard):
 *  - Never hard-code any of this in a component.
 *  - Never invent a value. Unknown → `PLACEHOLDER: <need> (Q<n>)`.
 *  - `grep -rn "PLACEHOLDER:" src/` must return nothing before launch.
 */

export const site = {
  /**
   * 🔴 Q0 UNRESOLVED — the company name is disputed.
   *
   *   logo.png            → "Pramiva Solutions"
   *   induction material  → "Promeva Solutions Private Limited"
   *
   * The value below is taken from the logo because that is the only official
   * artefact we hold. It is NOT confirmed. Management must verify against the
   * company registration certificate.
   *
   * This constant is the single point of change. Never type either spelling
   * anywhere else — not in metadata, JSON-LD, headings, alt text, or comments.
   */
  name: "Pramiva Solutions",

  /** PLACEHOLDER: registered legal entity name, from the certificate (Q0) */
  legalName: "PLACEHOLDER: registered legal entity name (Q0)",

  /** On the logo, therefore already public. Safe to publish. */
  tagline: "Think Bold. Build Smart. Scale Fast.",

  /**
   * Draft exists in docs/CONTENT-INVENTORY.md §3, built on the company's own
   * "engine room" phrasing. NOT approved — do not publish until Q6 returns.
   */
  description: "PLACEHOLDER: approved company description (Q6)",

  email: "PLACEHOLDER: display email address (Q7)",
  phone: "PLACEHOLDER: display phone number (Q8)",

  /** Induction material gives "Lalpur, Nepal" — an area, not a postal address. */
  address: "PLACEHOLDER: full postal address (Q27)",

  /** Baked into canonical URLs and the sitemap AT BUILD TIME. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  /** Only add keys management confirms exist (Q11). Empty links look worse than none. */
  social: {} as Record<string, string>,
} as const;
