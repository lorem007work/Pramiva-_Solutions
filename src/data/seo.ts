import { site } from "@/data/site";

/**
 * Per-route metadata.
 *
 * Titles and descriptions are PUBLISHED CONTENT — they appear in Google
 * results and link previews, so the same content rules apply as to page copy.
 * Everything here is built from the confirmed description set; nothing
 * describes benefits, results or how work is performed.
 *
 * Organization JSON-LD is still NOT defined here. The legal name and location
 * are now confirmed, but the address, phone and email are not, and structured
 * data asserting a false contact point gets indexed and republished into
 * knowledge panels. Add it once Q7, Q8 and Q27 are answered.
 */

export type RouteSeo = {
  title: string;
  description: string;
};

export const seo: Record<string, RouteSeo> = {
  home: {
    /** The layout template appends the site name, so this must not repeat it. */
    title: "Business and operations company",
    description: site.description,
  },
  about: {
    title: "About",
    description: `A business and operations company based in ${site.location}, working with businesses in Nepal and internationally.`,
  },
  services: {
    title: "Services",
    description:
      "Digital marketing, customer systems and customer service for businesses in Nepal and internationally.",
  },
  contact: {
    title: "Contact",
    description: "Send an enquiry or find our contact details.",
  },
};
