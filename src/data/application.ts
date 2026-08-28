export const application = {
  header: {
    eyebrow: "Careers — Application",
    title: "Apply to join Pramiva.",
    description:
      "Submit your details for review. Suitable applicants will receive access to the mandatory Pramiva Academy assessment.",
  },
  process: {
    heading: "What happens next",
    steps: [
      {
        title: "Application review",
        description:
          "The recruitment team reviews your application and CV.",
      },
      {
        title: "Academy assessment",
        description:
          "Suitable applicants receive Academy access. You must pass within the Academy's existing three-attempt limit to continue.",
      },
      {
        title: "Shortlist and interviews",
        description:
          "Passing makes you eligible for shortlisting. It does not guarantee employment.",
      },
    ],
  },
  form: {
    heading: "Your application",
    introduction:
      "All fields are required. Your CV is sent privately to the recruitment team and is not stored in a public website folder.",
    fields: {
      name: "Full name",
      email: "Email",
      phone: "Phone number",
      address: "Current address",
      role: "Position",
      introduction: "Short introduction",
      cv: "CV",
    },
    rolePlaceholder: "Choose a position",
    introductionHint:
      "Tell us briefly about your experience and why you want to join Pramiva.",
    cvHint: "PDF only, maximum 5 MB.",
    agreement:
      "I understand that the Pramiva Academy assessment is mandatory, allows up to three attempts, and that failing all three attempts makes me ineligible to continue.",
    // A notice, not a second consent tick. Deliberately outside the agreement
    // label: adding a required checkbox here would block submission on
    // something the applicant only needs to be told.
    privacyNotice: {
      before:
        "Your details and CV are emailed to our recruitment team and are not stored on this website. If you are unsuccessful, they are deleted after six months. See our",
      linkLabel: "privacy notice",
      href: "/privacy",
      after: "for the full detail.",
    },
    submitLabel: "Submit application",
    submittingLabel: "Submitting…",
    validationMessage: "Check the highlighted fields and try again.",
    successTitle: "Application received.",
    successMessage:
      "The recruitment team will review your application. Keep your application reference for future communication.",
    sendAnotherLabel: "Submit another application",
    errorMessage:
      "We could not submit your application. Please try again in a moment.",
    fallbackPrefix: "If the problem continues, email",
  },
} as const;
