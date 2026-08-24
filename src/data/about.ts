import { site } from "@/data/site";

/**
 * About page copy.
 *
 * The public page uses confirmed company facts and genuine team photographs.
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

  people: {
    eyebrow: "02 — Our people",
    title: "The people behind the work.",
    description: `Meet the team working from ${site.location}.`,
    photos: {
      /**
       * Re-cropped from the full-resolution original, not from an existing
       * downsample. Captions describe what is actually in the frame: this is a
       * team meal with laptops, not a boardroom, and saying otherwise would be
       * inventing a scene onto a real photograph.
       */
      main: {
        src: "/images/team/team-table.webp",
        width: 1600,
        height: 767,
        alt: "The team seated along a long wooden table with laptops, in a warm room with tall shuttered windows",
        caption: "Team members together in Lalitpur.",
      },
      culture: {
        src: "/images/team/team-rooftop.webp",
        width: 620,
        height: 750,
        alt: "Part of the team around a rooftop table, with the Kathmandu valley behind them",
        caption: "Team members together on a rooftop.",
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
