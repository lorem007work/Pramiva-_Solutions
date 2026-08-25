"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { InputField, SelectField, TextareaField } from "@/components/ui/field";
import type { contact } from "@/data/contact";
import {
  contactInterests,
  readContactFields,
  validateContactFields,
} from "@/lib/validation";
import type {
  ContactErrors,
  ContactFieldName,
} from "@/lib/validation";

type ContactFormProps = {
  copy: typeof contact.form;
  fallbackEmail?: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

type ServerResponse = {
  ok?: boolean;
  message?: string;
  errors?: ContactErrors;
};

export function ContactForm({ copy, fallbackEmail }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const loadedAtRef = useRef(0);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    loadedAtRef.current = Date.now();
  }, []);

  function focusFirstError(nextErrors: ContactErrors) {
    const firstField = Object.keys(nextErrors)[0] as
      | ContactFieldName
      | undefined;
    const control = firstField
      ? formRef.current?.elements.namedItem(firstField)
      : null;

    if (control instanceof HTMLElement) control.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "submitting") return;

    const form = event.currentTarget;
    const values = readContactFields(new FormData(form));
    const nextErrors = validateContactFields(values);

    setErrors(nextErrors);
    setStatusMessage("");

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("error");
      setStatusMessage(copy.validationMessage);
      focusFirstError(nextErrors);
      return;
    }

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, loadedAt: loadedAtRef.current }),
      });
      const result = (await response.json()) as ServerResponse;

      if (!response.ok || !result.ok) {
        const serverErrors = result.errors ?? {};
        setErrors(serverErrors);
        setSubmitState("error");
        setStatusMessage(result.message || copy.errorMessage);
        focusFirstError(serverErrors);
        return;
      }

      form.reset();
      setErrors({});
      setSubmitState("success");
      setStatusMessage(result.message || copy.successMessage);
    } catch {
      setSubmitState("error");
      setStatusMessage(copy.errorMessage);
    }
  }

  if (submitState === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-xl bg-surface p-6">
        <h3 className="text-h3 text-success">{copy.successTitle}</h3>
        <p className="mt-3 text-ink-muted">{statusMessage}</p>
        <Button
          type="button"
          variant="secondary"
          className="mt-6"
          onClick={() => {
            loadedAtRef.current = Date.now();
            setSubmitState("idle");
            setStatusMessage("");
          }}
        >
          {copy.sendAnotherLabel}
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action="/api/contact.php"
      method="post"
      noValidate
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField
          id="contact-name"
          name="name"
          label={copy.fields.name}
          autoComplete="name"
          required
          maxLength={100}
          error={errors.name}
        />
        <InputField
          id="contact-email"
          name="email"
          type="email"
          label={copy.fields.email}
          autoComplete="email"
          required
          maxLength={200}
          error={errors.email}
        />
        {/*
          Optional as of the redesign. It was required, which forced an
          individual, a job applicant or a sole trader to invent an answer to
          get past it. A required field a legitimate visitor cannot answer
          truthfully collects abandonment, not data.
        */}
        <InputField
          id="contact-company"
          name="company"
          label={copy.fields.company}
          autoComplete="organization"
          optional
          maxLength={150}
          error={errors.company}
        />
        <InputField
          id="contact-phone"
          name="phone"
          type="tel"
          label={copy.fields.phone}
          autoComplete="tel"
          optional
          maxLength={30}
          error={errors.phone}
        />
      </div>

      {/*
        Optional, and offered rather than demanded — it routes the enquiry to
        the right person without adding a step the visitor must clear. The
        options are a fixed whitelist; the server re-checks against its own
        copy and does not trust this one.
      */}
      <SelectField
        id="contact-interest"
        name="interest"
        label={copy.fields.interest}
        placeholder={copy.interestPlaceholder}
        options={contactInterests}
        optional
        error={errors.interest}
      />

      <TextareaField
        id="contact-message"
        name="message"
        label={copy.fields.message}
        required
        minLength={10}
        maxLength={3000}
        error={errors.message}
      />

      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {statusMessage ? (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-error/25 bg-error/5 p-4 text-sm text-error"
        >
          <p>{statusMessage}</p>
          {fallbackEmail ? (
            <p className="mt-2">
              {copy.fallbackPrefix}{" "}
              <a className="font-medium underline" href={`mailto:${fallbackEmail}`}>
                {fallbackEmail}
              </a>
            </p>
          ) : null}
        </div>
      ) : null}

      <Button type="submit" disabled={submitState === "submitting"}>
        {submitState === "submitting"
          ? copy.submittingLabel
          : copy.submitLabel}
      </Button>
    </form>
  );
}
