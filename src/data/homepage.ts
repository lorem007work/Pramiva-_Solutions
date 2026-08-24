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
 * What remains asserts only confirmed facts: business type, location, markets,
 * founding year, the vision and the motto. Service wording stays placeholdered
 * until Q5 returns approved descriptions.
 */
export const homepage = {
  positioning: {
    eyebrow: "02 — Our vision",
    /** CONFIRMED — the company's vision, verbatim. */
    statement: site.vision,
  },
  services: {
    eyebrow: "03 — Services",
    title: "What we do.",
    /** CONFIRMED — the approved high-level description of the offer. */
    description:
      "We support businesses in Nepal and internationally through digital marketing, customer systems and customer service.",
    ctaLabel: "Explore all services",
  },
  company: {
    eyebrow: "04 — About",
    title: "A business and operations company in Lalitpur, Nepal.",
    /** CONFIRMED — founding year, location, business type and markets. */
    description: [
      `Founded in ${site.founded} and based in ${site.location}, we are a business and operations company working with clients in Nepal and internationally.`,
      "Our work covers digital marketing, customer systems and customer service, with AI and automation solutions as a future direction.",
    ],
    ctaLabel: "More about the company",
  },
  cta: {
    eyebrow: "05 — Start a conversation",
    title: "Tell us what you need handled.",
    description:
      "Send an enquiry and we will come back to you with a practical next step.",
  },
} as const;
