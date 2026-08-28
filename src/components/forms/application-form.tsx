"use client";

import { useEffect, useRef, useState } from "react";
import type { FocusEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { InputField, SelectField, TextareaField } from "@/components/ui/field";
import type { application } from "@/data/application";
import {
  applicationLimits,
  applicationRoles,
  applicationUpload,
  readApplicationCv,
  readApplicationFields,
  validateApplication,
} from "@/lib/application-validation";
import type {
  ApplicationErrors,
  ApplicationFieldName,
} from "@/lib/application-validation";

type ApplicationFormProps = {
  copy: typeof application.form;
  fallbackEmail?: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

type ServerResponse = {
  ok?: boolean;
  message?: string;
  reference?: string;
  errors?: ApplicationErrors;
};

export function ApplicationForm({ copy, fallbackEmail }: ApplicationFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [applicationReference, setApplicationReference] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [failedToSend, setFailedToSend] = useState(false);

  useEffect(() => {
    if (submitState === "success") successRef.current?.focus();
  }, [submitState]);

  useEffect(() => {
    if (submitState === "error" && Object.keys(errors).length > 0) {
      summaryRef.current?.focus();
    }
  }, [submitState, errors]);

  function validateForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    return validateApplication(
      readApplicationFields(formData),
      readApplicationCv(formData),
    );
  }

  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    if (!attempted || !formRef.current) return;

    const control = event.target as HTMLElement & { name?: string };
    const name = control.name as ApplicationFieldName | undefined;
    if (!name) return;

    const all = validateForm(formRef.current);
    setErrors((previous) => {
      const next = { ...previous };
      if (all[name]) next[name] = all[name];
      else delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "submitting") return;

    const form = event.currentTarget;
    const nextErrors = validateForm(form);

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
      const response = await fetch("/api/apply.php", {
        method: "POST",
        body: new FormData(form),
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
      setApplicationReference(result.reference ?? "");
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
      {submitState === "success" ? `${copy.successTitle} ${statusMessage}` : ""}
    </p>
  );

  if (submitState === "success") {
    return (
      <>
        {liveRegion}
        <div className="rounded-xl border border-success/30 bg-success/5 p-6">
          <h2
            ref={successRef}
            tabIndex={-1}
            className="text-h3 text-success focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-focus)]"
          >
            {copy.successTitle}
          </h2>
          <p className="mt-3 text-[color:var(--tone-muted)]">{statusMessage}</p>
          {applicationReference ? (
            <p className="mt-4 font-medium">
              Application reference: {applicationReference}
            </p>
          ) : null}
          <Button
            type="button"
            variant="secondary"
            className="mt-6"
            onClick={() => {
              setSubmitState("idle");
              setStatusMessage("");
              setApplicationReference("");
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
        action="/api/apply.php"
        method="post"
        encType="multipart/form-data"
        noValidate
        onSubmit={handleSubmit}
        onBlur={handleBlur}
        className="space-y-6"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <InputField
            id="application-name"
            name="name"
            label={copy.fields.name}
            autoComplete="name"
            required
            maxLength={applicationLimits.name.max}
            error={errors.name}
          />
          <InputField
            id="application-email"
            name="email"
            type="email"
            label={copy.fields.email}
            autoComplete="email"
            required
            maxLength={applicationLimits.email.max}
            error={errors.email}
          />
          <InputField
            id="application-phone"
            name="phone"
            type="tel"
            label={copy.fields.phone}
            autoComplete="tel"
            required
            minLength={applicationLimits.phone.min}
            maxLength={applicationLimits.phone.max}
            error={errors.phone}
          />
          <InputField
            id="application-address"
            name="address"
            label={copy.fields.address}
            autoComplete="street-address"
            required
            minLength={applicationLimits.address.min}
            maxLength={applicationLimits.address.max}
            error={errors.address}
          />
        </div>

        <SelectField
          id="application-role"
          name="role"
          label={copy.fields.role}
          placeholder={copy.rolePlaceholder}
          options={applicationRoles}
          required
          error={errors.role}
        />

        <TextareaField
          id="application-introduction"
          name="introduction"
          label={copy.fields.introduction}
          hint={copy.introductionHint}
          required
          minLength={applicationLimits.introduction.min}
          maxLength={applicationLimits.introduction.max}
          error={errors.introduction}
        />

        <InputField
          id="application-cv"
          name="cv"
          type="file"
          label={copy.fields.cv}
          hint={copy.cvHint}
          accept={`${applicationUpload.extension},${applicationUpload.accept}`}
          required
          error={errors.cv}
          className="file:mr-4 file:rounded-full file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-medium file:text-canvas"
        />

        <div>
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              id="application-academy-agreement"
              name="academyAgreement"
              type="checkbox"
              value="yes"
              required
              aria-invalid={Boolean(errors.academyAgreement)}
              aria-describedby={
                errors.academyAgreement
                  ? "application-academy-agreement-error"
                  : undefined
              }
              className="mt-1 size-5 shrink-0 accent-[color:var(--color-brand)]"
            />
            <span>{copy.agreement}</span>
          </label>
          {errors.academyAgreement ? (
            <p
              id="application-academy-agreement-error"
              className="mt-2 text-sm text-error"
            >
              {errors.academyAgreement}
            </p>
          ) : null}
        </div>

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

        <div aria-hidden="true" className="sr-only">
          <label htmlFor="application-website">Website</label>
          <input
            id="application-website"
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
