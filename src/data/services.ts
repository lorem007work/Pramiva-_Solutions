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
        description:
          "Create useful, search-friendly content that helps people discover and understand a business online.",
      },
      {
        title: "Social media management",
        description:
          "Plan, publish and manage social content that keeps a business active and connected with its audience.",
      },
      {
        title: "Google and Facebook paid advertising",
        description:
          "Set up and manage targeted advertising campaigns across Google and Facebook to reach relevant audiences.",
      },
    ],
  },
  {
    heading: "Customer systems and service",
    services: [
      {
        title: "Customer-system setup and management",
        description:
          "Set up and maintain customer systems so contact details, conversations and follow-up information stay organised.",
      },
      {
        title: "Customer service through calls, text and email",
        description:
          "Handle customer enquiries through calls, text and email with clear, professional communication.",
      },
    ],
  },
  {
    heading: "Future direction",
    services: [
      {
        title: "AI and automation solutions",
        description:
          "A future service direction focused on practical AI and automation for suitable business tasks.",
      },
    ],
  },
];
