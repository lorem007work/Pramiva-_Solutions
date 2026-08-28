import assert from "node:assert/strict";
import test from "node:test";
import {
  applicationRoles,
  applicationUpload,
  validateApplication,
} from "../src/lib/application-validation.ts";

const validFields = {
  name: "Asha Sharma",
  email: "asha@example.com",
  phone: "+977 9800000000",
  address: "Lalitpur, Nepal",
  role: "Marketing",
  introduction:
    "I am interested in joining Pramiva and contributing to the marketing team.",
  academyAgreement: true,
  website: "",
} as const;

const validCv = {
  name: "asha-sharma-cv.pdf",
  type: "application/pdf",
  size: 240_000,
} as const;

test("accepts a complete application for every approved role", () => {
  assert.deepEqual(applicationRoles, [
    "Sales",
    "Marketing",
    "Graphic Design",
    "General Application",
  ]);

  for (const role of applicationRoles) {
    assert.deepEqual(
      validateApplication({ ...validFields, role }, validCv),
      {},
    );
  }
});

test("rejects missing or malformed required applicant details", () => {
  const errors = validateApplication(
    {
      ...validFields,
      name: "A",
      email: "not-an-email",
      phone: "123",
      address: "",
      role: "Developer",
      introduction: "Too short",
    },
    validCv,
  );

  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.phone);
  assert.ok(errors.address);
  assert.ok(errors.role);
  assert.ok(errors.introduction);
});

test("requires agreement to the mandatory Academy assessment", () => {
  const errors = validateApplication(
    { ...validFields, academyAgreement: false },
    validCv,
  );

  assert.ok(errors.academyAgreement);
});

test("requires a non-empty PDF CV no larger than 5 MB", () => {
  assert.ok(validateApplication(validFields, null).cv);
  assert.ok(
    validateApplication(validFields, {
      ...validCv,
      name: "cv.docx",
      type: "application/pdf",
    }).cv,
  );
  assert.ok(
    validateApplication(validFields, {
      ...validCv,
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }).cv,
  );
  assert.ok(validateApplication(validFields, { ...validCv, size: 0 }).cv);
  assert.ok(
    validateApplication(validFields, {
      ...validCv,
      size: applicationUpload.maxBytes + 1,
    }).cv,
  );
  assert.equal(
    validateApplication(validFields, {
      ...validCv,
      size: applicationUpload.maxBytes,
    }).cv,
    undefined,
  );
});

test("ignores the honeypot field without exposing validation details", () => {
  assert.deepEqual(
    validateApplication({ ...validFields, website: "spam.example" }, validCv),
    {},
  );
});
