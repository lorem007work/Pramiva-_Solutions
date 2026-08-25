export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  company: { max: 150 },
  phone: { max: 30 },
  message: { min: 10, max: 3000 },
} as const;

/**
 * Allowed values for the optional "Area of interest" select.
 *
 * A whitelist, not free text. The value is emailed to staff, and anything that
 * reaches an inbox from a public form is attacker-controlled until proven
 * otherwise. Constraining it to a known set means the field cannot be used to
 * inject content into the message body.
 *
 * These are the three approved Q5 capability groupings plus two routes that
 * are not services. Adding one here means adding it to contact.php too — the
 * server does not trust this file, it re-checks against its own copy.
 */
export const contactInterests = [
  "Digital marketing",
  "Customer systems and service",
  "AI and automation",
  "Careers",
  "Something else",
] as const;

export type ContactInterest = (typeof contactInterests)[number];

export type ContactFields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
  message: string;
  website: string;
};

export type ContactFieldName = keyof Omit<ContactFields, "website">;
export type ContactErrors = Partial<Record<ContactFieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(formData: FormData, name: keyof ContactFields) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function readContactFields(formData: FormData): ContactFields {
  return {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    company: readText(formData, "company"),
    phone: readText(formData, "phone"),
    interest: readText(formData, "interest"),
    message: readText(formData, "message"),
    website: readText(formData, "website"),
  };
}

export function validateContactFields(values: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (
    values.name.length < contactLimits.name.min ||
    values.name.length > contactLimits.name.max
  ) {
    errors.name = "Enter your name using 2 to 100 characters.";
  }

  if (
    !emailPattern.test(values.email) ||
    values.email.length > contactLimits.email.max
  ) {
    errors.email = "Enter a valid email address.";
  }

  /*
    Company is OPTIONAL as of the redesign.

    It was required, which meant an individual, a job applicant or a sole
    trader had to invent something to get past it. A required field that a
    legitimate visitor cannot answer truthfully does not collect data — it
    collects abandonment, or it collects "n/a". Only the length ceiling
    survives, and only when something was actually typed.
  */
  if (values.company.length > contactLimits.company.max) {
    errors.company = "Enter a company name using up to 150 characters.";
  }

  if (values.phone.length > contactLimits.phone.max) {
    errors.phone = "Enter a phone number using up to 30 characters.";
  }

  // Optional, but if present it must be one we offered.
  if (
    values.interest !== "" &&
    !contactInterests.includes(values.interest as ContactInterest)
  ) {
    errors.interest = "Choose one of the listed options.";
  }

  if (
    values.message.length < contactLimits.message.min ||
    values.message.length > contactLimits.message.max
  ) {
    errors.message = "Enter a message using 10 to 3,000 characters.";
  }

  return errors;
}
