/**
 * Services page framing copy.
 *
 * The catalogue itself lives in `services.ts` and is unchanged: group and
 * service TITLES are [DRAFT] from docs/CONTENT-INVENTORY.md §5, and every
 * service DESCRIPTION stays a visible placeholder on purpose.
 *
 * Q5 asks management for "the exact wording you approve" for the services.
 * Drafting our own descriptions would pre-empt the question being asked and,
 * unlike the About copy, a service description is the company's public
 * commercial offer — the one kind of sentence that must not be guessed.
 * That decision was taken when `services.ts` was written; it stands.
 *
 * The headings below assert nothing factual, so they are safe to author.
 */

export const servicesPage = {
  header: {
    eyebrow: "Services",
    title: "What we do.",
    /** [BLOCKED] Q5 — approved introduction to the offer. */
    description: "PLACEHOLDER: approved services page introduction (Q5)",
  },

  catalogue: {
    eyebrow: "01 — The catalogue",
    title: "Grouped by the part of the business they support.",
    /** [BLOCKED] Q5 */
    description: "PLACEHOLDER: approved services overview paragraph (Q5)",
  },

  cta: {
    eyebrow: "02 — Start a conversation",
    title: "Not sure which of these you need?",
    description:
      "Describe the work that keeps landing on the wrong desk and we will suggest where to start.",
  },
} as const;
