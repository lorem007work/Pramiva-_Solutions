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
      "We look for people who communicate clearly, learn from feedback and take responsibility for their work. Experience matters, but it is not the only thing we consider.",
    ],
    qualitiesLabel: "Essential qualities",
    qualities: [
      {
        name: "Customer-first mindset",
        description: "A genuine commitment to helping customers and clients.",
      },
      {
        name: "Data-driven approach",
        description: "Comfort with using information to make sound decisions.",
      },
      {
        name: "Learning agility",
        description: "A willingness to learn new skills and adapt to change.",
      },
      {
        name: "Collaborative spirit",
        description: "Clear communication and a willingness to work with others.",
      },
      {
        name: "Bold and agile thinking",
        description: "Confidence to try new approaches and adapt when needed.",
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
    photoSrc: "/images/office/office-room-1.webp",
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
    photoSrc: "/images/office/office-active-blurred.webp",
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
          "Tool, account and workspace setup",
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
          "Additional training needs identified and career development planned",
        ],
      },
    ],
  },

  openings: {
    eyebrow: "04 — Opportunities",
    title: "Where you can contribute.",
    description:
      "We currently welcome applications in Sales, Marketing and Graphic Design, as well as general applications from people who want to contribute.",
  },

  cta: {
    eyebrow: "05 — Apply",
    title: "Tell us about yourself.",
    description:
      "Submit your application and CV. Suitable applicants will receive access to the mandatory Pramiva Academy assessment.",
    action: { label: "Apply now", href: "/careers/apply" },
  },
} as const;
