/**
 * Contact page copy.
 *
 * The contact DETAILS are not here — email, phone and address live in
 * `site.ts` as placeholders (Q7, Q8, Q27) and are read straight from there, so
 * one answer from management updates the footer and this page together.
 *
 * The enquiry form is implemented in Phase 7. Delivery remains fail-safe until
 * the private cPanel mail configuration and destination inbox (Q10) exist.
 */

export const contact = {
  header: {
    eyebrow: "Contact",
    title: "Start a conversation.",
    /** [DRAFT] Q4/Q6 — working wording, awaiting approval. */
    description:
      "Tell us which part of your operation needs support and we will come back with a practical next step.",
  },

  form: {
    heading: "Send an enquiry",
    introduction:
      "Share a few details and we will respond using the contact information you provide.",
    fields: {
      name: "Name",
      email: "Email",
      company: "Company",
      phone: "Phone",
      interest: "Area of interest",
      message: "How can we help?",
    },
    /** Empty first option. The field is optional, so it must be selectable. */
    interestPlaceholder: "Select an area",
    privacyNotice: {
      before: "Your enquiry is emailed to us and is not stored on this website. See our",
      linkLabel: "privacy notice",
      href: "/privacy/",
      after: "for the full detail.",
    },
    submitLabel: "Send enquiry",
    submittingLabel: "Sending…",
    validationMessage: "Check the highlighted fields and try again.",
    successTitle: "Your enquiry has been sent.",
    successMessage: "Thank you. We will respond as soon as we can.",
    sendAnotherLabel: "Send another enquiry",
    errorMessage:
      "We could not send your enquiry. Please try again in a moment.",
    fallbackPrefix: "You can also email",
  },

  enquiry: {
    eyebrow: "Before you write",
    title: "What to include.",
    description:
      "A few lines on each of these makes the first reply a useful one rather than a request for more detail.",
    points: [
      {
        title: "The work",
        description:
          "Which part of your operation needs support, and what is being handled today.",
      },
      {
        title: "The scale",
        description:
          "Roughly how much is involved. An approximate figure is enough to work from.",
      },
      {
        title: "The timing",
        description:
          "When you would like to start, and anything fixed you are working around.",
      },
    ],
    areasLabel: "Areas we support",
    photoSrc: "/images/office/office-sign.webp",
  },

  details: {
    heading: "Contact details",
    mapLabel: "View on map",
    /** Labels only; every value comes from `site.ts`. */
    labels: {
      email: "Email",
      address: "Address",
    },
  },
} as const;
