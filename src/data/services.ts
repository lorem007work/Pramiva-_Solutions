/**
 * Service catalogue.
 *
 * TITLES were updated and approved by the owner on 2026-08-30.
 *
 * Back-office administration was removed: it is not on the confirmed list, and
 * the wording describes how work is divided with clients, which is
 * confidential.
 *
 * DESCRIPTIONS are CONFIRMED (2026-08-24). They are deliberately concise: do
 * not expand them into benefits, performance claims, or internal process detail
 * without a new approval.
 */

export type Service = {
  title: string;
  description: string;
  /** CONFIRMED 2026-08-26 by the owner. */
  details?: string[];
  /** CONFIRMED 2026-08-26 by the owner. Who the service is for. */
  audience?: string;
  /**
   * Presentation metadata, not published copy. Names a shape in
   * ui/service-icon.tsx. Changing it alters no approved wording.
   */
  icon: string;
};

export type ServiceGroup = {
  heading: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    heading: "Digital Marketing",
    services: [
      {
        title: "SEO and Content Marketing",
        audience:
          "For businesses that want more people to find them through search.",
        icon: "search",
        description:
          "We research what your customers search for, improve your website pages and create useful content that helps people find and understand your business.",
        details: [
          "Keyword research and strategy",
          "On-page and technical SEO optimisation",
          "Content creation and publication",
          "Monthly performance reporting and recommendations",
        ],
      },
      {
        title: "Social Media Management",
        audience:
          "For businesses that want to stay active on social media without managing it all themselves.",
        icon: "social",
        description:
          "We plan and publish social content, respond to comments and messages, and keep your accounts active and organised.",
        details: [
          "Strategy development and content calendars",
          "Daily content creation and posting",
          "Community engagement and brand building",
          "Analytics and performance optimisation",
        ],
      },
      {
        title: "Paid Advertising on Google and Facebook",
        audience:
          "For businesses that want help planning and managing paid campaigns.",
        icon: "advertising",
        description:
          "We set up and manage campaigns on Google and Facebook, from audience targeting and ad creative to budget tracking and reporting.",
        details: [
          "Campaign strategy and audience targeting",
          "Ad creative development",
          "Budget management and optimisation",
          "Campaign performance tracking and reporting",
        ],
      },
    ],
  },
  {
    heading: "Customer Service and Systems",
    services: [
      {
        title: "CRM Setup and Integration",
        audience:
          "For businesses that need their customer information and follow-up in one place.",
        icon: "systems",
        description:
          "We set up and connect CRM systems so customer details, conversations and follow-up tasks stay in one organised place.",
        details: [
          "System selection and setup",
          "Data migration and integration",
          "Team training and process development",
          "Ongoing optimisation and support",
        ],
      },
      {
        title: "Customer Service by Phone, Text and Email",
        audience:
          "For businesses that need someone to handle regular customer enquiries.",
        icon: "support",
        description:
          "We handle customer enquiries by phone, text and email, and keep clear records for follow-up.",
        details: [
          "Inbound and outbound call handling",
          "Email management and response",
          "Text-based customer support",
          "Customer records kept current and organised",
        ],
      },
    ],
  },
  {
    heading: "Next Direction",
    services: [
      {
        title: "AI and Automation Solutions",
        audience:
          "Forward-thinking businesses looking to leverage AI for competitive advantage.",
        icon: "automation",
        description:
          "The next service direction, focused on practical AI and Automation for suitable business tasks.",
      },
    ],
  },
];
