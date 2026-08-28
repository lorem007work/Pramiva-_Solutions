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
 *
 * [BLOCKED] Q4 — still awaiting final approved wording. "Contact Us" was the
 * previous working default; "Start an enquiry" replaces it because a label
 * naming the action a visitor is about to take converts better than one naming
 * the page it leads to. Both are working defaults, neither is approved.
 */
export const primaryCta: NavLink = {
  label: "Start an enquiry",
  href: "/contact",
};

/**
 * The CTA system.
 *
 * ONE destination, several labels. Every conversion action on the site leads
 * to /contact; what changes is the wording, matched to how far through the
 * page the visitor has read. "Discuss your requirements" suits someone who has
 * seen only the fold; "Start a conversation" suits someone who has read to the
 * end. A single repeated "Contact Us" asks the same question of both.
 *
 * The two service labels are the deliberate exception — they are discovery,
 * not conversion, and they point at /services. Keeping them visually quieter
 * than the primary action is what stops them competing with it.
 *
 * Labels are structural copy: none of them asserts anything that could be
 * false, so they need no content approval beyond Q4's final wording.
 */
export const ctas = {
  /** Header and mobile drawer. */
  nav: primaryCta,
  /** Hero, above the fold — the visitor knows least here. */
  heroPrimary: { label: "Discuss your requirements", href: "/contact" },
  heroSecondary: { label: "Explore services", href: "/services" },
  /** After the three capability pillars. */
  services: { label: "View all services", href: "/services" },
  /** The closing band, after everything has been read. */
  closing: { label: "Start a conversation", href: "/contact" },
} as const satisfies Record<string, NavLink>;

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
    /**
     * The three capability areas, matching the homepage pillars.
     *
     * Labels are the Q5-approved group headings, copied from services.ts
     * rather than reworded. Every one points at /services — there are no
     * per-service pages, and a footer link that lands somewhere generic is
     * worse than no link, so these are deliberately the three groups rather
     * than the six services.
     */
    heading: "Services",
    links: [
      { label: "Digital Marketing", href: "/services" },
      { label: "Customer Service and Systems", href: "/services" },
      { label: "AI and Automation", href: "/services" },
    ],
  },
  {
    heading: "Legal",
    // Q21 answered for /privacy only: the application form collects a name,
    // address, phone number and CV, so a notice explaining what happens to
    // them is not optional. Terms and a cookie policy remain [BLOCKED] — the
    // first has no confirmed content, the second has nothing to describe.
    links: [{ label: "Privacy", href: "/privacy" }],
  },
];
