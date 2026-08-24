/**
 * Contact page copy.
 *
 * The contact DETAILS are not here — email, phone and address live in
 * `site.ts` as placeholders (Q7, Q8, Q27) and are read straight from there, so
 * one answer from management updates the footer and this page together.
 *
 * The enquiry form is Phase 7 (docs/WORKFLOW.md). It needs the PHP handler,
 * shared validation and a real destination inbox (Q10), none of which exist
 * yet. Until then the page reserves the space with a visible placeholder
 * rather than rendering inert inputs that silently discard an enquiry.
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
    /** Reserved space. Phase 7 replaces this with `forms/contact-form.tsx`. */
    placeholder: "PLACEHOLDER: enquiry form — built in Phase 7",
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
