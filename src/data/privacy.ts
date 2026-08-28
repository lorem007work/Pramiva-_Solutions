import { site } from "@/data/site";

/**
 * Privacy page copy — answers Q21 for this route only.
 *
 * Every factual claim here is checked against the code that actually runs:
 * the field lists match `contact-form.tsx` and `application-validation.ts`,
 * "never stored on the website" matches `apply.php`, which attaches the upload
 * straight from PHP's temp file and never writes it anywhere, and the cookie
 * statement matches a site that loads no analytics and embeds no third-party
 * frames (see the comment on the map link in `app/contact/page.tsx`).
 *
 * [CONFIRMED 2026-08-28] Six-month applicant retention.
 * [PROPOSED] Everything else below is a policy statement, not a verified fact.
 * It needs one read-through from management before this page is deployed.
 */

export const privacy = {
  header: {
    eyebrow: "Privacy",
    title: "What we collect, and what we do with it.",
    description:
      "This site has no analytics, no tracking pixels and no advertising cookies. The only information we hold is what you type into a form and send to us.",
  },

  updated: "Last updated 28 August 2026",

  sections: [
    {
      heading: "Information you send us",
      paragraphs: [
        "There are two forms on this website, and neither collects anything you do not type in yourself.",
      ],
      groups: [
        {
          title: "The enquiry form",
          items: [
            "Your name and email address",
            "Your company and phone number",
            "What you are interested in, and your message",
          ],
        },
        {
          title: "The job application form",
          items: [
            "Your full name, email address and phone number",
            "Your current address",
            "The position you are applying for, and a short introduction",
            "Your CV, as a PDF",
          ],
        },
      ],
    },

    {
      heading: "Where it goes",
      paragraphs: [
        "Both forms send an email. That is the whole mechanism — this website has no database, no user accounts and no stored records.",
        "Your CV is attached to that email and is never written to the website's server or placed in any folder that could be reached from the internet. It exists in our email inbox and nowhere else.",
      ],
    },

    {
      heading: "Who reads it",
      paragraphs: [
        "Enquiries are read by the team who can answer them. Job applications are read by the person responsible for recruitment.",
        "If your application is successful, we create an account for you on Pramiva Academy, our training platform, so you can take the assessment. Only your name and email address are used for that — your CV is not passed on.",
        "Pramiva Academy runs at academy.hardtrex.com, on infrastructure shared with an associated business. Your Academy login email will arrive from that address, and it is genuine.",
      ],
    },

    {
      heading: "How long we keep it",
      paragraphs: [
        "If you apply for a role and we do not hire you, we delete your application and your CV six months after the decision.",
        "Enquiry messages are kept while we are dealing with your enquiry and are deleted once it is closed.",
        "You do not have to wait for either. Ask us to delete your information at any time and we will.",
      ],
    },

    {
      heading: "Cookies and tracking",
      paragraphs: [
        "This site sets no cookies of its own and loads no analytics, advertising or social media trackers.",
        "Our address links out to Google Maps rather than embedding a map, specifically so that visiting this site does not hand your visit to a third party.",
      ],
    },

    {
      heading: "Asking us to delete your information",
      paragraphs: [
        `Email ${site.email} and tell us what you would like removed. If you are a job applicant, include your application reference — it begins with PR- and is on the receipt we sent you — so we can find the right record.`,
        "We will confirm once it is done.",
      ],
    },
  ],
} as const;
