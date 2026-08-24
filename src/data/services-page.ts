import { site } from "@/data/site";

/**
 * Services page framing copy.
 *
 * The catalogue itself lives in `services.ts`: titles confirmed, descriptions
 * placeholdered pending Q5.
 *
 * The headings here assert nothing factual, and the introduction uses the
 * approved high-level description rather than a written-up version of it.
 * PRD §5.3 also lists "benefits" and a process block for this page — both are
 * omitted, benefits because they would be invented claims, the process because
 * public "how we work" content is barred.
 */

export const servicesPage = {
  header: {
    eyebrow: "Services",
    title: "What we do.",
    description: site.summary,
  },

  catalogue: {
    eyebrow: "01 — The catalogue",
    title: "Grouped by the part of the business they support.",
    /** [BLOCKED] Q5 — the approved wording for the offer as a whole. */
    description: "PLACEHOLDER: approved services overview paragraph (Q5)",
  },

  cta: {
    eyebrow: "02 — Start a conversation",
    title: "Not sure which of these you need?",
    description:
      "Send an enquiry describing what you are trying to get done, and we will suggest where to start.",
  },
} as const;
