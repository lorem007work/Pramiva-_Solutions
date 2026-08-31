import { site } from "@/data/site";

/**
 * Per-route metadata.
 *
 * Titles and descriptions are PUBLISHED CONTENT — they appear in Google
 * results and link previews, so the same content rules apply as to page copy.
 * Everything here is built from the confirmed description set; nothing
 * describes benefits, results or how work is performed.
 *
 * Organization JSON-LD is defined separately in lib/structured-data.ts, where
 * every contact value comes from the confirmed company data in site.ts.
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
    title: `${site.name} — Digital marketing and customer operations`,
    description:
      "SEO, content, social media, paid advertising, CRM setup and customer service from Pramiva Solutions in Lalitpur, Nepal.",
  },
  about: {
    path: "/about/",
    title: "About",
    description: `Learn about ${site.name}, a marketing and customer operations company based in ${site.location}.`,
  },
  services: {
    path: "/services/",
    title: "Services",
    description:
      "Explore SEO, content, social media, paid advertising, CRM setup and customer service from Pramiva Solutions.",
  },
  servicesDigitalMarketing: {
    path: "/services/digital-marketing/",
    title: "Digital Marketing",
    description:
      "SEO and content marketing, social media management and paid advertising on Google and Facebook, from Pramiva Solutions in Lalitpur, Nepal.",
  },
  servicesCustomerService: {
    path: "/services/customer-service-systems/",
    title: "Customer Service and Systems",
    description:
      "CRM setup and integration, and customer service by phone, text and email, from Pramiva Solutions in Lalitpur, Nepal.",
  },
  servicesAiAutomation: {
    path: "/services/ai-and-automation/",
    title: "AI and Automation",
    description:
      "The next service direction for Pramiva Solutions in Lalitpur, Nepal: practical AI and automation for suitable business tasks. Not currently offered as a service.",
  },
  careers: {
    path: "/careers/",
    title: "Careers",
    description:
      "Join a young, growing business and operations team in Lalitpur, Nepal.",
  },
  careersApply: {
    path: "/careers/apply/",
    title: "Apply",
    description:
      "Submit an application to join Pramiva Solutions in Lalitpur, Nepal.",
  },
  contact: {
    path: "/contact/",
    title: "Contact",
    // 44 chars was well under the ~70 floor, and it named neither the company
    // nor the city. Composed from confirmed atoms only, like seo.home above —
    // no new claim, and the original sentence is kept verbatim on the end.
    description: `Contact ${site.name}, a business and operations company in ${site.location}. Send an enquiry or find our contact details.`,
  },
  privacy: {
    path: "/privacy/",
    title: "Privacy",
    description:
      "What Pramiva Solutions collects through this website, and how long it is kept.",
  },
} satisfies Record<string, RouteSeo>;
