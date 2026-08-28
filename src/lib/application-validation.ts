export const applicationRoles = [
  "Sales",
  "Marketing",
  "Graphic Design",
  "General Application",
] as const;

export const applicationLimits = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  phone: { min: 7, max: 30 },
  address: { min: 3, max: 300 },
  introduction: { min: 20, max: 2000 },
} as const;

export const applicationUpload = {
  maxBytes: 5 * 1024 * 1024,
  accept: "application/pdf",
  extension: ".pdf",
} as const;

export type ApplicationRole = (typeof applicationRoles)[number];

export type ApplicationFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  introduction: string;
  academyAgreement: boolean;
  website: string;
};

export type ApplicationFile = {
  name: string;
  type: string;
  size: number;
};

export type ApplicationFieldName =
  | Exclude<keyof ApplicationFields, "website">
  | "cv";

export type ApplicationErrors = Partial<
  Record<ApplicationFieldName, string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateApplication(
  values: ApplicationFields,
  cv: ApplicationFile | null,
): ApplicationErrors {
  const errors: ApplicationErrors = {};

  if (
    values.name.length < applicationLimits.name.min ||
    values.name.length > applicationLimits.name.max
  ) {
    errors.name = "Enter your full name using 2 to 100 characters.";
  }

  if (
    !emailPattern.test(values.email) ||
    values.email.length > applicationLimits.email.max
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (
    values.phone.length < applicationLimits.phone.min ||
    values.phone.length > applicationLimits.phone.max
  ) {
    errors.phone = "Enter a phone number using 7 to 30 characters.";
  }

  if (
    values.address.length < applicationLimits.address.min ||
    values.address.length > applicationLimits.address.max
  ) {
    errors.address = "Enter your current address using 3 to 300 characters.";
  }

  if (!applicationRoles.includes(values.role as ApplicationRole)) {
    errors.role = "Choose one of the listed positions.";
  }

  if (
    values.introduction.length < applicationLimits.introduction.min ||
    values.introduction.length > applicationLimits.introduction.max
  ) {
    errors.introduction =
      "Introduce yourself using 20 to 2,000 characters.";
  }

  if (!values.academyAgreement) {
    errors.academyAgreement =
      "Confirm that you agree to complete the mandatory Academy assessment.";
  }

  if (!cv || cv.size <= 0) {
    errors.cv = "Upload your CV as a PDF file.";
  } else if (
    !cv.name.toLowerCase().endsWith(applicationUpload.extension) ||
    cv.type.toLowerCase() !== applicationUpload.accept
  ) {
    errors.cv = "Upload your CV as a PDF file.";
  } else if (cv.size > applicationUpload.maxBytes) {
    errors.cv = "Upload a PDF no larger than 5 MB.";
  }

  return errors;
}

function readText(formData: FormData, name: keyof ApplicationFields) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function readApplicationFields(formData: FormData): ApplicationFields {
  return {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    phone: readText(formData, "phone"),
    address: readText(formData, "address"),
    role: readText(formData, "role"),
    introduction: readText(formData, "introduction"),
    academyAgreement: formData.get("academyAgreement") === "yes",
    website: readText(formData, "website"),
  };
}

export function readApplicationCv(formData: FormData): File | null {
  const value = formData.get("cv");
  return value instanceof File && value.size > 0 ? value : null;
}
