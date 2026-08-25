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

  workspace: {
    eyebrow: "02 — Our workspace",
    title: "Inside the office.",
    description: `A real look at our workspace in ${site.location}.`,
    photos: {
      main: {
        src: "/images/office/office-focus-blurred.jpg",
        width: 1448,
        height: 1086,
        alt: "An employee working at computer screens in the Lalitpur office, photographed from behind with screen contents blurred",
        caption: "A workstation in the Lalitpur office. Screen contents are blurred for privacy.",
      },
      culture: {
        src: "/images/office/office-sign.jpg",
        width: 1080,
        height: 1440,
        alt: "The company sign above the Lalitpur office entrance",
        caption: "The office entrance in Lalitpur.",
      },
    },
  },

  vision: {
    eyebrow: "03 — Vision",
    /** CONFIRMED — verbatim. Do not paraphrase or shorten. */
    statement: site.vision,
  },

  cta: {
    eyebrow: "04 — Start a conversation",
    title: "Tell us what you need handled.",
    description:
      "Send an enquiry and we will come back to you with a practical next step.",
  },
} as const;
