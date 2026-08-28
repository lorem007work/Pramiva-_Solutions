import { site } from "@/data/site";

/**
 * Homepage-specific copy.
 *
 * Rewritten 2026-08-24 against the confirmed information set. Two sections
 * were removed rather than reworded:
 *
 *  - **Why Pramiva** — every line of it was either a benefit claim, which is
 *    not ours to invent, or a description of how work is divided with clients,
 *    which is confidential.
 *  - **Process / "How we work"** — drawn from induction material and now
 *    explicitly barred from public pages.
 *
 * Restructured 2026-08-25 for the split-hero redesign. The section set changed;
 * the content rules did not. What remains asserts only confirmed facts:
 * business type, location, markets, founding year, the vision, the motto and
 * the Q5-approved service wording.
 *
 * 🔴 The redesign mockup supplied for this work carried benefit copy on the
 * pillar cards and the team block — "drives growth", "strengthen loyalty",
 * "future-ready advantage", "our strength comes from practical experience".
 * None of it is written here. Those are claims about how good the company is,
 * and they are management's to assert, not a designer's or a developer's. Each
 * one is replaced below by wording that traces to an approved source. If
 * management wants the stronger lines, they can approve them and they drop
 * straight into this file.
 */
export const homepage = {
  /**
   * The fold.
   *
   * No imageAlt: the hero panel is the company's own brand artwork, not a
   * photograph. Decorative artwork is aria-hidden and carries no alternative
   * text. All real photography was removed from the homepage on request.
   *
   * The H1 states the offer rather than the company category. "A business and
   * operations company in Lalitpur, Nepal" told a visitor what this is; it did
   * not tell them what they can get help with, and that is what the first
   * screen has to answer. The three capability areas are the approved Q5
   * groupings, so the headline is a fact already cleared for publication.
   */
  hero: {
    /** CONFIRMED — business type and location, assembled from confirmed facts. */
    eyebrow: site.descriptor,
    /** CONFIRMED — the company tagline, verbatim. Public on the logo already. */
    title: site.tagline,
    /** CONFIRMED 2026-08-26 by the owner. */
    lead: "Digital marketing and customer solutions — in Nepal and internationally.",
  },

  positioning: {
    eyebrow: "Our vision",
    /** CONFIRMED — the company's vision, verbatim. */
    statement: site.vision,
  },

  /** Framing for the three capability pillars. The pillars are in pillars.ts. */
  services: {
    eyebrow: "What we do",
    title: "Areas we support.",
    /** CONFIRMED — the approved high-level description of the offer. */
    description:
      "We support businesses in Nepal and internationally through digital marketing and customer solutions.",
    /** Structural label applied to the pillar that is not sold today. */
    futureLabel: "Next Direction",
  },

  /**
   * The company block, and the homepage's route through to /about.
   *
   * Both paragraphs are approved wording lifted from the About page rather
   * than a fresh write-up.
   *
   * The staff-photo collage and then the office photograph were both
   * withdrawn; no real photography appears on the homepage. The copy stayed
   * because it is approved, still true without a picture, and is the landing
   * page's only route into the company story. The photographs are on /about.
   */
  team: {
    eyebrow: "Our people",
    /** Already published verbatim on the About page. */
    title: "The people behind the work.",
    description: [
      `Meet the team working from ${site.location}.`,
      "We work with businesses in Nepal and internationally, supporting them through digital marketing and customer solutions.",
    ],
    /** Never the company name — see CLAUDE.md rule 5. */
    ctaLabel: "More about the company",
  },

  cta: {
    title: "Tell us what you need handled.",
    description:
      "Send an enquiry and we will come back to you with a practical next step.",
  },
} as const;
