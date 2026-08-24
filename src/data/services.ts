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
 * DESCRIPTIONS remain placeholders pending Q5. A service description is the
 * company's public commercial offer and the one class of sentence this project
 * does not draft on management's behalf — Q5 asks for the exact approved
 * wording, so writing our own would pre-empt the question being asked.
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
        description: "PLACEHOLDER: approved service description (Q5)",
      },
      {
        title: "Social media management",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
      {
        title: "Google and Facebook paid advertising",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
    ],
  },
  {
    heading: "Customer systems and service",
    services: [
      {
        title: "Customer-system setup and management",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
      {
        title: "Customer service through calls, text and email",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
    ],
  },
  {
    heading: "Future direction",
    services: [
      {
        title: "AI and automation solutions",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
    ],
  },
];
