import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/data/about";
import { seo } from "@/data/seo";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: seo.about.title,
  description: seo.about.description,
};

/**
 * About page. Server-rendered throughout — nothing here needs client state,
 * and motion arrives in Phase 6 by wrapping children in <Reveal>.
 *
 * All copy is [DRAFT] and read from `data/about.ts`; see that file for what
 * each block is waiting on.
 */
export default function AboutPage() {
  const { header, story, values, capability, cta } = about;

  return (
    <main id="main">
      <Section aria-labelledby="about-title">
        <SectionHeading
          id="about-title"
          level="h1"
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
        />
      </Section>

      <Section
        tone="surface"
        aria-labelledby="about-story-title"
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <div className="lg:col-span-5">
          <p className="text-eyebrow uppercase text-ink-subtle">
            {story.eyebrow}
          </p>
          <h2 id="about-story-title" className="mt-4 max-w-2xl text-h1">
            {story.title}
          </h2>

          <p className="mt-section-sm border-l-2 border-accent pl-block text-h3 text-accent-text">
            {site.tagline}
          </p>
        </div>

        <div className="border-t border-line-strong pt-block lg:col-span-6 lg:col-start-7">
          <div className="space-y-6">
            {story.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "max-w-[65ch] text-lead"
                    : "max-w-[65ch] text-ink-muted"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="about-values-title">
        <SectionHeading
          id="about-values-title"
          eyebrow={values.eyebrow}
          title={values.title}
          description={values.description}
        />

        {/* Static cards — no hover lift, because nothing here is clickable. */}
        <ul className="mt-section-sm grid gap-block md:grid-cols-3">
          {values.items.map((item, index) => (
            <li
              key={item.title}
              className="rounded-2xl border border-line p-8"
            >
              <span aria-hidden="true" className="text-eyebrow text-accent-text">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-h3">{item.title}</h3>
              <p className="mt-4 text-ink-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        tone="ink"
        aria-labelledby="about-capability-title"
        containerClassName="grid gap-block md:grid-cols-12"
      >
        <div className="border-t border-slate pt-5 md:col-span-3">
          <p className="text-eyebrow uppercase text-line-strong">
            {capability.eyebrow}
          </p>
        </div>

        <div className="md:col-span-8 md:col-start-5">
          <h2 id="about-capability-title" className="max-w-4xl text-h1">
            {capability.title}
          </h2>
          <p className="mt-block max-w-[55ch] text-lead text-canvas/70">
            {capability.description}
          </p>
          <p className="mt-block max-w-[55ch] text-sm text-canvas/60">
            {capability.note}
          </p>
        </div>
      </Section>

      <CtaBand id="about-cta-title" {...cta} />
    </main>
  );
}
