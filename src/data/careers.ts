import { site } from "@/data/site";

/**
 * Careers page copy.
 *
 * Hiring philosophy, criteria, recruitment stages and onboarding CONFIRMED
 * 2026-08-26 by the owner. Internal document references and client-allocation
 * detail from the source material are not reproduced here.
 */

export const careers = {
  header: {
    eyebrow: "Careers",
    title: "Join us.",
    description: `Interested in building your career with a business and operations company in ${site.location}? We welcome introductions from people who want to learn and contribute.`,
  },

  philosophy: {
    eyebrow: "01 — What we look for",
    title: "Fit and curiosity, before credentials.",
    paragraphs: [
      `${site.name} looks for people who share our values and want to contribute to the work we do.`,
      "We weigh cultural fit, learning agility and a customer-first mindset above purely technical qualifications.",
    ],
    qualitiesLabel: "Essential qualities",
    qualities: [
      {
        name: "Customer-first mindset",
        description: "Genuine commitment to client success and satisfaction.",
      },
      {
        name: "Data-driven approach",
        description:
          "Comfort with analytics and evidence-based decision making.",
      },
      {
        name: "Learning agility",
        description:
          "Demonstrated ability to acquire new skills quickly and adapt to change.",
      },
      {
        name: "Collaborative spirit",
        description: "Strong teamwork and communication skills.",
      },
      {
        name: "Bold and agile thinking",
        description:
          "Willingness to take calculated risks and adapt quickly.",
      },
    ],
    competenciesLabel: "Role-specific competencies",
    competencies: [
      "Relevant experience or strong foundational knowledge in the service area",
      "Proficiency with industry-standard tools and platforms",
      "Strong problem-solving and analytical skills",
      "Excellent written and verbal communication skills",
    ],
  },

  process: {
    eyebrow: "02 — How we hire",
    title: "Four stages, and you always know where you stand.",
    description:
      "Every application moves through the same sequence, whatever the role.",
    stages: [
      {
        name: "Application review",
        points: [
          "Resume and cover letter evaluation",
          "Initial screening for qualifications and cultural fit",
        ],
      },
      {
        name: "Initial interview",
        points: [
          "A 30-minute video call about motivation and fit",
          "Assessment of communication and customer service orientation",
        ],
      },
      {
        name: "Technical assessment",
        points: [
          "Role-specific skills evaluation",
          "Problem-solving scenarios relevant to the position",
        ],
      },
      {
        name: "Final interview",
        points: [
          "A conversation with senior team members or the founder",
          "Career goals and long-term fit with the company vision",
        ],
      },
    ],
  },

  onboarding: {
    eyebrow: "03 — Your first months",
    title: "A structured start, not a desk and good luck.",
    description:
      "New joiners follow the same programme, with formal reviews at 30, 60 and 90 days.",
    phases: [
      {
        name: "Week 1",
        summary: "Orientation",
        points: [
          "Company history, mission, vision and values",
          "An overview of our services and how the company works",
          "Tools, accounts and workspace set up",
        ],
      },
      {
        name: "Week 2",
        summary: "Role training",
        points: [
          "Detailed training on responsibilities and expectations",
          "Introduction to the tools, systems and processes you will use",
          "Working alongside experienced colleagues",
        ],
      },
      {
        name: "Weeks 3–4",
        summary: "Gradual integration",
        points: [
          "Increasing responsibility and independence",
          "Regular check-ins with your supervisor",
          "Feedback sessions and goal setting for the first 90 days",
        ],
      },
      {
        name: "30 · 60 · 90",
        summary: "Formal reviews",
        points: [
          "Structured performance reviews at each milestone",
          "Progress assessed against the goals you set",
          "Additional training identified, and career development planned",
        ],
      },
    ],
  },

  openings: {
    eyebrow: "04 — Open roles",
    title: "No published vacancy list.",
    description:
      "We are not advertising specific roles at the moment. Send an introduction anyway — we keep them on file and come back to people when something opens up.",
  },

  cta: {
    eyebrow: "05 — Apply",
    title: "Tell us about yourself.",
    description:
      "Send an enquiry with a short introduction and we will come back to you.",
  },
} as const;
