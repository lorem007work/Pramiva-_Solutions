"use client";

import { useEffect, useRef, useState } from "react";
import type { FocusEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { InputField, SelectField, TextareaField } from "@/components/ui/field";
import type { contact } from "@/data/contact";
import {
  contactInterests,
  contactLimits,
  readContactFields,
  validateContactFields,
} from "@/lib/validation";
import type { ContactErrors, ContactFieldName } from "@/lib/validation";

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
  const successRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const loadedAtRef = useRef(0);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [failedToSend, setFailedToSend] = useState(false);

  useEffect(() => {
    loadedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (submitState === "success") successRef.current?.focus();
  }, [submitState]);

  useEffect(() => {
    if (submitState === "error" && Object.keys(errors).length > 0) {
      summaryRef.current?.focus();
    }
  }, [submitState, errors]);

  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    if (!attempted || !formRef.current) return;

    const control = event.target as HTMLElement & { name?: string };
    const name = control.name as ContactFieldName | undefined;
    if (!name) return;

    const all = validateContactFields(
      readContactFields(new FormData(formRef.current)),
    );

    setErrors((prev) => {
      const next = { ...prev };
      if (all[name]) next[name] = all[name];
      else delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "submitting") return;

    const form = event.currentTarget;
    const values = readContactFields(new FormData(form));
    const nextErrors = validateContactFields(values);

    setAttempted(true);
    setErrors(nextErrors);
    setStatusMessage("");

    if (Object.keys(nextErrors).length > 0) {
      setFailedToSend(false);
      setSubmitState("error");
      setStatusMessage(copy.validationMessage);
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
        setErrors(result.errors ?? {});
        setFailedToSend(true);
        setSubmitState("error");
        setStatusMessage(result.message || copy.errorMessage);
        return;
      }

      form.reset();
      setErrors({});
      setAttempted(false);
      setFailedToSend(false);
      setSubmitState("success");
      setStatusMessage(result.message || copy.successMessage);
    } catch {
      setErrors({});
      setFailedToSend(true);
      setSubmitState("error");
      setStatusMessage(copy.errorMessage);
    }
  }

  const liveRegion = (
    <p aria-live="polite" className="sr-only">
      {submitState === "submitting" ? copy.submittingLabel : ""}
      {submitState === "success" ? `${copy.successTitle}. ${statusMessage}` : ""}
    </p>
  );

  if (submitState === "success") {
    return (
      <>
        {liveRegion}
        <div className="rounded-xl border border-success/30 bg-success/5 p-6">
          <h3
            ref={successRef}
            tabIndex={-1}
            className="text-h3 text-success focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-focus)]"
          >
            {copy.successTitle}
          </h3>
          <p className="mt-3 text-[color:var(--tone-muted)]">{statusMessage}</p>
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
      </>
    );
  }

  return (
    <>
      {liveRegion}
      <form
        ref={formRef}
      action="/api/contact.php"
      method="post"
      noValidate
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField
          id="contact-name"
          name="name"
          label={copy.fields.name}
          autoComplete="name"
          required
          maxLength={contactLimits.name.max}
          error={errors.name}
        />
        <InputField
          id="contact-email"
          name="email"
          type="email"
          label={copy.fields.email}
          autoComplete="email"
          required
          maxLength={contactLimits.email.max}
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
          maxLength={contactLimits.company.max}
          error={errors.company}
        />
        <InputField
          id="contact-phone"
          name="phone"
          type="tel"
          label={copy.fields.phone}
          autoComplete="tel"
          optional
          maxLength={contactLimits.phone.max}
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
        minLength={contactLimits.message.min}
        maxLength={contactLimits.message.max}
        error={errors.message}
      />

      <p className="text-sm text-[color:var(--tone-muted)]">
        {copy.privacyNotice.before}{" "}
        <a
          className="font-medium underline underline-offset-2"
          href={copy.privacyNotice.href}
        >
          {copy.privacyNotice.linkLabel}
        </a>{" "}
        {copy.privacyNotice.after}
      </p>

      <div
        hidden
        aria-hidden="true"
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
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-error/25 bg-error/5 p-4 text-sm text-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
        >
          <p className="font-medium">{statusMessage}</p>

          {failedToSend && fallbackEmail ? (
            <p className="mt-2 break-words">
              {copy.fallbackPrefix}{" "}
              <a
                className="font-medium underline underline-offset-2"
                href={`mailto:${fallbackEmail}`}
              >
                {fallbackEmail}
              </a>
            </p>
          ) : null}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={submitState === "submitting"}
        aria-busy={submitState === "submitting"}
      >
        {submitState === "submitting" ? copy.submittingLabel : copy.submitLabel}
      </Button>
    </form>
    </>
  );
}
