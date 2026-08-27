/** Team disciplines — CONFIRMED 2026-08-26. Roles only; headcounts stay unpublished. */

export type Discipline = {
  title: string;
  description: string;
};

export const disciplines: Discipline[] = [
  {
    title: "Search and website",
    description:
      "Search and content specialists who keep client websites findable and readable.",
  },
  {
    title: "Digital marketing",
    description:
      "Marketing specialists running content, social and paid campaigns across Google and Facebook.",
  },
  {
    title: "Social media",
    description:
      "Content creators and community managers who keep client accounts active and answered.",
  },
  {
    title: "Customer service",
    description:
      "Customer service officers handling enquiries through calls, text and email.",
  },
  {
    title: "Call executives",
    description:
      "Voice specialists handling inbound and outbound calls on behalf of clients.",
  },
  {
    title: "Software development",
    description:
      "Developers building and integrating the systems that support client operations.",
  },
  {
    title: "Graphic design",
    description:
      "Designers producing brand and marketing material, and keeping it visually consistent.",
  },
  {
    title: "Operations and management",
    description:
      "Country and business management coordinating delivery and client relationships.",
  },
];
