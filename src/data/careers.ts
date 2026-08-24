import { site } from "@/data/site";

/**
 * Careers page copy.
 *
 * Intentionally limited to a general invitation. Internal training,
 * assessment rules and unconfirmed vacancies are not public content.
 */

export const careers = {
  header: {
    eyebrow: "Careers",
    title: "Join us.",
    description: `Interested in building your career with a business and operations company in ${site.location}? We welcome introductions from people who want to learn and contribute.`,
  },

  approach: {
    eyebrow: "01 — What we value",
    title: "Honesty, clarity and a willingness to learn.",
    paragraphs: [
      "We value people who take pride in their work, communicate clearly and are honest about what they know and what they still need to learn.",
      "If that sounds like you, send a short introduction and tell us what kind of work interests you.",
    ],
  },
  openings: {
    eyebrow: "02 — Open enquiries",
    title: "Introduce yourself.",
    description:
      "There is no published vacancy list at the moment, but you can send us a message telling us about yourself and what you would like to work on.",
  },

  cta: {
    eyebrow: "03 — Apply",
    title: "Tell us about yourself.",
    description:
      "Send an enquiry with a short introduction and we will come back to you.",
  },
} as const;
