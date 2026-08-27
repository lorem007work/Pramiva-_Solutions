import { site } from "@/data/site";

/**
 * About page copy.
 *
 * The public page uses confirmed company facts and company-supplied office
 * photographs edited only for exposure and privacy.
 * Client relationships, internal workflows, induction rules and employee
 * counts remain omitted pending separate publication approval.
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

  history: {
    eyebrow: "02 — Our story",
    title: "How the company started.",
    /** CONFIRMED 2026-08-26 by the owner. */
    paragraphs: [
      `${site.name} was founded on August 5, 2025, by ${site.founder} with a vision to bridge the gap between businesses in developed countries and cost-effective, high-quality backend solutions.`,
      "The company was established based on practical experience in growing businesses from startup to multi-million dollar operations across multiple countries.",
    ],
  },

  workspace: {
    eyebrow: "03 — Our workspace",
    title: "Inside the office.",
    description: `A real look at our workspace in ${site.location}.`,
    // Every value describes what the photograph actually shows. Where a
    // privacy treatment was applied it is named; where it was not, it is not
    // claimed. Order runs entrance, team, desks, empty room.
    photos: [
      {
        src: "/images/office/office-sign.webp",
        width: 1000,
        height: 1333,
        alt: `The ${site.name} sign above the office entrance in ${site.addressParts.locality}`,
        caption: "The office entrance in Lalitpur.",
      },
      {
        src: "/images/office/office-active-blurred.webp",
        width: 1000,
        height: 750,
        alt: "Four colleagues working at desks in the Lalitpur office, faces blurred for privacy",
        caption: "The team room. Faces are blurred for privacy.",
      },
      {
        src: "/images/office/office-room-1.webp",
        width: 1000,
        height: 1250,
        alt: "A colleague working at a desk in the Lalitpur office, photographed from behind with their face obscured",
        caption: "A workstation in the Lalitpur office.",
      },
      {
        src: "/images/office/office-focus-blurred.webp",
        width: 1000,
        height: 750,
        alt: "A colleague at a desk in the Lalitpur office, photographed from behind with screen contents blurred",
        caption: "Screen contents are blurred for privacy.",
      },
      {
        src: "/images/office/office-room-2.webp",
        width: 1000,
        height: 1250,
        alt: "A colleague at a desk beside the office window, photographed from behind",
        caption: "A desk beside the office window.",
      },
      {
        src: "/images/office/office-empty-enhanced.webp",
        width: 1000,
        height: 1333,
        alt: "Desks, monitors and chairs in the Lalitpur office with nobody at them",
        caption: "The office before the day starts.",
      },
    ],
  },

  vision: {
    eyebrow: "04 — Vision",
    /** CONFIRMED — verbatim. Do not paraphrase or shorten. */
    statement: site.vision,
  },

  values: {
    eyebrow: "05 — What we value",
    title: "How we work.",
  },

  disciplines: {
    eyebrow: "06 — Our team",
    title: "The skills we keep in-house.",
    description:
      "The disciplines our team covers.",
  },

  cta: {
    eyebrow: "07 — Start a conversation",
    title: "Tell us what you need handled.",
    description:
      "Send an enquiry and we will come back to you with a practical next step.",
  },
} as const;
