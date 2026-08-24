export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  company: { min: 1, max: 150 },
  phone: { max: 30 },
  message: { min: 10, max: 3000 },
} as const;

export type ContactFields = {
  name: string;
  email: string;
  company: string;
  phone: string;
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

  if (
    values.company.length < contactLimits.company.min ||
    values.company.length > contactLimits.company.max
  ) {
    errors.company = "Enter a company name using up to 150 characters.";
  }

  if (values.phone.length > contactLimits.phone.max) {
    errors.phone = "Enter a phone number using up to 30 characters.";
  }

  if (
    values.message.length < contactLimits.message.min ||
    values.message.length > contactLimits.message.max
  ) {
    errors.message = "Enter a message using 10 to 3,000 characters.";
  }

  return errors;
}
