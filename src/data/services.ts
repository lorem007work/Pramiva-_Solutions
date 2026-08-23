/**
 * Service catalogue.
 *
 * ⚠ ALL [DRAFT] — pending Q5.
 *
 * The group and service TITLES come from the company's own induction material
 * (docs/CONTENT-INVENTORY.md §5) and are recorded here so the layout can be
 * built. They are NOT cleared for publication.
 *
 * DESCRIPTIONS are deliberately left as placeholders: Q5 asks management for
 * "the exact wording you approve", so writing our own would pre-empt the very
 * thing being asked. Never paraphrase a service description — it is the
 * company's public commercial offer.
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
        title: "Search & content marketing",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
      {
        title: "Social media management",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
      {
        title: "Paid advertising",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
    ],
  },
  {
    heading: "Operations & customer support",
    services: [
      {
        title: "Customer system setup & management",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
      {
        title: "Multi-channel customer service",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
      {
        title: "Back-office administration",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
    ],
  },
  {
    heading: "In development",
    services: [
      {
        title: "AI & automation solutions",
        description: "PLACEHOLDER: approved service description (Q5)",
      },
    ],
  },
];
