/**
 * Navigation structure. Labels are structural, not factual claims, so they are
 * safe to author. The route list itself is [ASSUMED] pending Q3.
 */

export type NavLink = {
  label: string;
  href: string;
};

export const mainNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/**
 * Primary conversion action, repeated site-wide.
 * [BLOCKED] Q4 — "Contact Us" is the working default. One CTA only;
 * competing calls to action dilute conversion.
 */
export const primaryCta: NavLink = {
  label: "Contact Us",
  href: "/contact",
};

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    // [BLOCKED] Q21 — routes are not created until management confirms these
    // pages are required and supplies the copy.
    links: [],
  },
];
