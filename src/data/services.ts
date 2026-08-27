/**
 * Service catalogue.
 *
 * TITLES are CONFIRMED (2026-08-24) and match the approved list exactly. Do
 * not reword them — "Google and Facebook paid advertising" is the approved
 * phrasing, not "paid advertising"; "Customer service through calls, text and
 * email" is the approved phrasing, not "multi-channel customer service".
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
    heading: "Digital marketing",
    services: [
      {
        title: "Search and content marketing",
        audience:
          "Businesses looking to establish or improve their online presence and attract customers through search engines.",
        icon: "search",
        description:
          "Create useful, search-friendly content that helps people discover and understand a business online.",
        details: [
          "Keyword research and strategy",
          "On-page and technical SEO optimisation",
          "Content creation and publication",
          "Monthly performance reporting and recommendations",
        ],
      },
      {
        title: "Social media management",
        audience:
          "Companies seeking to build brand awareness, engage with customers, and drive sales through social media channels.",
        icon: "social",
        description:
          "Plan, publish and manage social content that keeps a business active and connected with its audience.",
        details: [
          "Strategy development and content calendars",
          "Daily content creation and posting",
          "Community engagement and brand building",
          "Analytics and performance optimisation",
        ],
      },
      {
        title: "Google and Facebook paid advertising",
        audience:
          "Businesses looking to scale their customer acquisition through targeted digital advertising.",
        icon: "advertising",
        description:
          "Set up and manage targeted advertising campaigns across Google and Facebook to reach relevant audiences.",
        details: [
          "Campaign strategy and audience targeting",
          "Ad creative development",
          "Budget management and optimisation",
          "Return on ad spend tracking and reporting",
        ],
      },
    ],
  },
  {
    heading: "Customer systems and service",
    services: [
      {
        title: "Customer-system setup and management",
        audience:
          "Growing businesses that need to organise their customer data and automate their sales processes.",
        icon: "systems",
        description:
          "Set up and maintain customer systems so contact details, conversations and follow-up information stay organised.",
        details: [
          "System selection and setup",
          "Data migration and integration",
          "Team training and process development",
          "Ongoing optimisation and support",
        ],
      },
      {
        title: "Customer service through calls, text and email",
        audience:
          "Companies that need to provide excellent customer service but want to reduce operational costs.",
        icon: "support",
        description:
          "Handle customer enquiries through calls, text and email with clear, professional communication.",
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
    heading: "Future direction",
    services: [
      {
        title: "AI and automation solutions",
        audience:
          "Forward-thinking businesses looking to leverage AI for competitive advantage.",
        icon: "automation",
        description:
          "A future service direction focused on practical AI and automation for suitable business tasks.",
      },
    ],
  },
];
