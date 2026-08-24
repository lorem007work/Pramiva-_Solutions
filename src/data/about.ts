import { site } from "@/data/site";

/**
 * About page copy.
 *
 * Rewritten 2026-08-24 against the confirmed information set. Two blocks were
 * deleted outright rather than reworded:
 *
 *  - The **anonymised capability statement** — "six consumer brands ... for an
 *    Australian partner". Client relationships are confidential in any form,
 *    named or not, so there is no version of that sentence that can ship.
 *  - The **values cards** — honesty, pride in work, clear communication. They
 *    came from induction material, they are not in the confirmed set, and
 *    induction material is not a source of public copy. Q28 stays open; if
 *    management approves wording, the block comes back.
 *
 * Everything below is confirmed fact: business type, founding year, location,
 * markets, the vision and the motto. No benefits, no results, no claims about
 * how the work is performed.
 */

export const about = {
  header: {
    eyebrow: "About",
    title: "A business and operations company in Lalitpur, Nepal.",
    description: site.summary,
  },

  story: {
    eyebrow: "01 — The company",
    title: "What we do, in plain terms.",
    paragraphs: [
      `We are a business and operations company, founded in ${site.founded} and based in ${site.location}.`,
      "We work with businesses in Nepal and internationally, supporting them through digital marketing, customer systems and customer service.",
      "AI and automation solutions are a future direction for the company rather than something we offer today.",
    ],
  },

  vision: {
    eyebrow: "02 — Vision",
    /** CONFIRMED — verbatim. Do not paraphrase or shorten. */
    statement: site.vision,
  },

  cta: {
    eyebrow: "03 — Start a conversation",
    title: "Tell us what you need handled.",
    description:
      "Send an enquiry and we will come back to you with a practical next step.",
  },
} as const;
