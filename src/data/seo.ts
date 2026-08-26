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
  path: `/${string}`;
  title: string;
  description: string;
};

export const seo = {
  home: {
    path: "/",
    /*
      The brand name is built in HERE, unlike every other route.

      The old comment said the layout template appends it — that is true for
      /about, /services, /careers and /contact, and false for this one. Next
      applies `title.template` to CHILD segments only; app/page.tsx sits in the
      same segment as app/layout.tsx, so it never inherits the template and
      only `title.default` would cover it. The homepage was therefore shipping
      as "Business and operations company" with no company name in the single
      most important title on the site — and the same string in og:title.

      Composed from `site.name` rather than typed, so the unresolved spelling
      still lives in exactly one file (CLAUDE.md rule 5).
    */
    title: `${site.name} — business and operations company`,
    // 154 chars. site.description is 213, so services fell past Google's ~155 cut.
    description: `Digital marketing, customer systems and customer service from a business and operations company in ${site.location}. Supporting businesses internationally.`,
  },
  about: {
    path: "/about/",
    title: "About",
    description: `A business and operations company based in ${site.location}, working with businesses in Nepal and internationally.`,
  },
  services: {
    path: "/services/",
    title: "Services",
    description:
      "Digital marketing, customer systems and customer service for businesses in Nepal and internationally.",
  },
  careers: {
    path: "/careers/",
    title: "Careers",
    description:
      "Join a young, growing business and operations team in Lalitpur, Nepal.",
  },
  contact: {
    path: "/contact/",
    title: "Contact",
    description: "Send an enquiry or find our contact details.",
  },
} satisfies Record<string, RouteSeo>;
