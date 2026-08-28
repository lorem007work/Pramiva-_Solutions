import type { Metadata } from "next";
import { ApplicationForm } from "@/components/forms/application-form";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { application } from "@/data/application";
import { seo } from "@/data/seo";
import { site } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata(seo.careersApply),
  robots: { index: false, follow: true },
};

export default function CareersApplyPage() {
  const { header, process, form } = application;

  return (
    <main id="main">
      <Section aria-labelledby="application-title">
        <SectionHeading
          id="application-title"
          level="h1"
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
        />
      </Section>

      <Section
        tone="surface"
        spacing="compact"
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <section
          aria-labelledby="application-form-title"
          className="rounded-2xl border border-line bg-canvas p-block lg:col-span-7"
        >
          <h2 id="application-form-title" className="text-h2">
            {form.heading}
          </h2>
          <p className="mt-4 max-w-copy text-[color:var(--tone-muted)]">
            {form.introduction}
          </p>
          <div className="mt-block">
            <ApplicationForm copy={form} fallbackEmail={site.email} />
          </div>
        </section>

        <section
          aria-labelledby="application-process-title"
          className="lg:col-span-4 lg:col-start-9"
        >
          <h2 id="application-process-title" className="text-h3">
            {process.heading}
          </h2>
          <ol className="mt-block space-y-6">
            {process.steps.map((step, index) => (
              <li
                key={step.title}
                className="border-t border-[color:var(--tone-border)] pt-5"
              >
                <p className="text-eyebrow text-accent-text">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-h3">{step.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--tone-muted)]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </Section>
    </main>
  );
}
