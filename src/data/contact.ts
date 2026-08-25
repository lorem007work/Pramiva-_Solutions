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

  details: {
    heading: "Contact details",
    /** Labels only; every value comes from `site.ts`. */
    labels: {
      email: "Email",
      phone: "Phone",
      address: "Address",
    },
  },
} as const;
