import type { NavLink } from "@/data/navigation";
import { site } from "@/data/site";

/** OWNER-APPROVED 2026-08-30. Framing copy only; the catalogue stays in services.ts. */

export type ServicePageFaqItem = { question: string; answer: string };

export type ServicePageStep = { label: string; body: string };

export type ServicePageContent = {
  group: string;
  path: `/${string}`;
  hero: {
    title: string;
    lead: string;
    primaryCta: NavLink;
  };
  overview: { eyebrow: string; title: string; paragraphs: readonly string[] };
  included: { eyebrow: string; title: string };
  how?: { eyebrow: string; title: string; steps: readonly ServicePageStep[] };
  why: { eyebrow: string; title: string };
  faq: { eyebrow: string; title: string; items: readonly ServicePageFaqItem[] };
  cta: { eyebrow: string; title: string; description: string };
};

export const servicePagePaths: Record<string, `/${string}`> = {
  "Digital Marketing": "/services/digital-marketing",
  "Customer Service and Systems": "/services/customer-service-systems",
  "Next Direction": "/services/ai-and-automation",
};

export function serviceAnchor(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const whyPramivaReasons = [
  {
    title: "Connected business services.",
    body: "Digital marketing, CRM setup and customer service are available through one company, giving clients one place for several related business needs.",
  },
  {
    title: "Based in Lalitpur, Nepal.",
    body: `${site.name} is based in Lalitpur and provides services to businesses in Nepal as well as clients operating internationally.`,
  },
  {
    title: "Clearly defined services.",
    body: "Each service has a stated scope, from search and social media work to CRM setup and customer enquiry handling.",
  },
] as const;

const sharedFaq = {
  results: {
    question: "How long does it take to see results?",
    answer:
      "There is no fixed timeframe. Results depend on the service, your starting position, competition, budget and other factors. We can explain what to expect after reviewing your current situation.",
  },
  international: {
    question: "Do you work with businesses outside Nepal?",
    answer: "Yes. We work with businesses in Nepal and internationally.",
  },
} as const;

export const digitalMarketingPage: ServicePageContent = {
  group: "Digital Marketing",
  path: servicePagePaths["Digital Marketing"],

  hero: {
    title: "Getting your business found online.",
    lead: "We handle SEO and content, social media and paid advertising on Google and Facebook, for businesses in Nepal and abroad.",
    primaryCta: { label: "Discuss your marketing", href: "/contact" },
  },

  overview: {
    eyebrow: "01 — Why it matters",
    title: "Most people look you up before they call.",
    paragraphs: [
      "Search, social media and ads are where that happens. If your business is hard to find there, or looks inactive when someone checks, the enquiry goes somewhere else.",
      "We handle the three parts of that: being findable in search, staying active on social media, and running paid campaigns when you want reach faster than search alone will give you.",
    ],
  },

  included: { eyebrow: "02 — What's included", title: "Three services, one team." },

  why: { eyebrow: "06 — Why Pramiva", title: "Why work with us." },

  faq: {
    eyebrow: "07 — Questions",
    title: "Common questions.",
    items: [
      {
        question: "What does your digital marketing service include?",
        answer:
          "Three services: SEO and content marketing, social media management, and paid advertising on Google and Facebook. Each is described in detail on this page.",
      },
      {
        question: "Do you manage social media accounts?",
        answer:
          "Yes. We plan and publish social content, respond to comments and messages, and keep your accounts active and organised.",
      },
      {
        question: "Do you run Google and Facebook ads?",
        answer:
          "Yes. We set up and manage campaigns on Google and Facebook, from audience targeting and ad creative to budget tracking and reporting.",
      },
      sharedFaq.results,
      sharedFaq.international,
      {
        question: "How much does digital marketing cost?",
        answer:
          "The cost depends on the services you need, the amount of work involved and the advertising platforms included. We can review your requirements and provide a quote based on the agreed scope.",
      },
    ],
  },

  cta: {
    eyebrow: "08 — Start a conversation",
    title: "Ready to grow your business?",
    description:
      "Let's build a digital marketing strategy around what your business actually needs.",
  },
};

export const customerServicePage: ServicePageContent = {
  group: "Customer Service and Systems",
  path: servicePagePaths["Customer Service and Systems"],

  hero: {
    /** Wording specified in the task brief, 2026-08-31. */
    title: "Create a more organised customer experience.",
    lead: "We set up the systems that hold your customer information, and we handle the enquiries that come in by phone, text and email.",
    primaryCta: { label: "Discuss your requirements", href: "/contact" },
  },

  overview: {
    eyebrow: "01 — Why it matters",
    title: "Enquiries do not wait.",
    paragraphs: [
      "A missed call at 4pm is a customer who rings someone else at 4:05. And when the answer does come, it helps only if the last conversation was written down somewhere the next person can find it.",
      "Those are two different problems: one is people, one is systems. We do both.",
    ],
  },

  included: { eyebrow: "02 — What's included", title: "Two services, one record." },

  /** Steps verbatim from the task brief, 2026-08-31. Client-facing only. */
  how: {
    eyebrow: "05 — How we work",
    title: "How we work.",
    steps: [
      {
        label: "Discover.",
        body: "Understand the business, existing systems, customer journey and operational requirements.",
      },
      {
        label: "Plan.",
        body: "Identify the right systems, workflows and customer service processes around the business needs.",
      },
      {
        label: "Set up and execute.",
        body: "Configure systems, organise customer information, implement processes and begin customer service operations where required.",
      },
      {
        label: "Measure and improve.",
        body: "Review processes, identify gaps and continuously improve the system and customer experience.",
      },
    ],
  },

  why: { eyebrow: "06 — Why Pramiva", title: "Why work with us." },

  faq: {
    eyebrow: "07 — Questions",
    title: "Common questions.",
    items: [
      {
        question: "What does this service cover?",
        answer:
          "Two services: CRM setup and integration, and customer service by phone, text and email. Each is described in detail on this page.",
      },
      {
        question: "Can you help us set up a CRM from scratch?",
        answer:
          "Yes. System selection and setup is part of the service, so we can help you choose a system that fits and set it up from the beginning.",
      },
      {
        question: "Do you handle our existing customer data?",
        answer:
          "Yes. CRM setup and integration includes data migration, so existing customer information is brought into the system as part of the work.",
      },
      {
        question: "Do you provide CRM training for our team?",
        answer:
          "Yes. Team training and process development is included, so your team learns the system and the processes that go with it.",
      },
      {
        question: "Can you provide ongoing support?",
        answer:
          "Yes. Ongoing optimisation and support is part of the CRM service, and customer enquiry handling is an ongoing service by nature.",
      },
      sharedFaq.international,
      {
        question: "How long does CRM setup take?",
        answer:
          "It depends on the system, the state of your existing customer information and how much needs migrating. We can give you a timeframe after seeing what is involved.",
      },
      {
        question: "How quickly can you start?",
        answer:
          "The start date depends on the service required, the information available and the current scope of work. We can confirm a suitable start date after discussing your requirements.",
      },
      {
        question: "How much does customer service support cost?",
        answer:
          "Pricing depends on the type of enquiries, the level of support required and the amount of customer contact involved. Contact us with your requirements and we can prepare a quote.",
      },
    ],
  },

  cta: {
    eyebrow: "08 — Start a conversation",
    title: "Need a better way to manage your customers?",
    description:
      "Let's build a customer service and systems setup that works around how your business actually operates.",
  },
};
