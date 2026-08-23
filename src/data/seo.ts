/**
 * Per-route metadata.
 *
 * Titles and descriptions are PUBLISHED CONTENT — they appear in Google
 * results and link previews, so the same content rules apply as to page copy.
 *
 * Organization JSON-LD is deliberately NOT defined here. Structured data
 * asserting a false address or phone number gets indexed and republished into
 * knowledge panels, where a placeholder is far worse than an absent block.
 * Add it only once Q6–Q9 are answered.
 */

export type RouteSeo = {
  title: string;
  description: string;
};

export const seo: Record<string, RouteSeo> = {
  home: {
    title: "PLACEHOLDER: home page title (Q6)",
    description: "PLACEHOLDER: home meta description (Q6)",
  },
  about: {
    title: "About",
    description: "PLACEHOLDER: about meta description (Q6)",
  },
  services: {
    title: "Services",
    description: "PLACEHOLDER: services meta description (Q5)",
  },
  contact: {
    title: "Contact",
    description: "PLACEHOLDER: contact meta description (Q6)",
  },
};
