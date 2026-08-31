import type { ServicePageFaqItem } from "@/data/service-pages";

/** OWNER-SUPPLIED 2026-08-30, verbatim. Not a sold service — keep it that way. */
export const nextDirectionPage = {
  path: "/services/ai-and-automation" as const,

  hero: {
    eyebrow: "Next Direction",
    title: "AI and Automation.",
    lead: "The next service direction, focused on practical AI and Automation for suitable business tasks. This is not a service Pramiva Solutions currently offers, but an area we are carefully exploring for the future.",
  },

  sections: [
    {
      eyebrow: "01 — What we mean",
      title: "What we mean by practical AI.",
      paragraphs: [
        "Practical AI means using available technology for a clear business purpose. It should help with a real task, not add another layer of complexity. We are interested in simple uses that support clearer information, consistent communication and sensible decisions, where the technology fits the work and its limits are understood.",
      ],
    },
    {
      eyebrow: "02 — Suitable tasks",
      title: "Tasks that may suit automation.",
      paragraphs: [
        "Suitable tasks are usually repetitive, rules-based and supported by reliable information. Examples may include sorting enquiries, drafting routine responses, moving information between systems, reminders, reporting and basic data checks. Some tasks still need human judgement, especially when information is sensitive, incomplete or likely to affect a customer.",
      ],
    },
    {
      eyebrow: "03 — The starting point",
      title: "How this connects to our current work.",
      paragraphs: [
        "This direction grows from the operations work Pramiva Solutions already provides. Our current services include digital marketing, CRM setup and customer service across phone, text and email. Working closely with these day-to-day activities helps us identify unnecessary manual work and consider where future automation may be useful.",
      ],
    },
  ],

  faq: {
    eyebrow: "04 — Questions",
    title: "Common questions.",
    items: [
      {
        question: "Is this available now?",
        answer:
          "No. AI and Automation Solutions is not currently offered as a Pramiva Solutions service. It is our next service direction. We are exploring where it may provide practical value before presenting it as an available service.",
      },
      {
        question: "What kinds of tasks are you considering?",
        answer:
          "We are interested in routine tasks involving communication, information handling, reporting and connected business systems. Not every task should be automated. Suitability depends on the information involved, the decisions required and the consequences if something goes wrong.",
      },
      {
        question: "Will AI replace human involvement?",
        answer:
          "That is not the purpose of this direction. AI may assist with suitable routine work, but people remain important where judgement, responsibility, context or personal communication is required.",
      },
      {
        question: "Can I discuss a possible use with Pramiva?",
        answer:
          "Yes. We welcome conversations about repetitive work or operational problems that businesses want to address. These discussions help us understand genuine needs, but they do not mean the service is currently available or that Pramiva can accept the work.",
      },
    ] satisfies readonly ServicePageFaqItem[],
  },

  cta: {
    eyebrow: "05 — Start a conversation",
    title: "Tell us about the task.",
    description:
      "If your business has a repetitive task or operational problem that may suit AI or automation, you are welcome to tell us about it. This is a conversation about what may be possible, not an offer of a current service.",
  },
} as const;
