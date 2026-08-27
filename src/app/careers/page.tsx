import { CtaBand } from "@/components/sections/cta-band";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { careers } from "@/data/careers";
import { seo } from "@/data/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(seo.careers);

/**
 * Careers page. Server-rendered throughout, composing the shared primitives
 * rather than introducing one-off components — the Phase 5 rule.
 *
 * No vacancies, internal training steps or assessment rules are invented or
 * published. The page is a general invitation only.
 */
export default function CareersPage() {
  const { header, approach, openings, cta } = careers;

  return (
    <main id="main">
      <Section aria-labelledby="careers-title">
        <SectionHeading
          id="careers-title"
          level="h1"
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
        />
      </Section>

      <Section
        tone="surface"
        reveal
        aria-labelledby="careers-approach-title"
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <div className="lg:col-span-5">
          <Eyebrow>{approach.eyebrow}</Eyebrow>
          <h2 id="careers-approach-title" className="mt-4 max-w-2xl text-h1">
            {approach.title}
          </h2>
        </div>

        <div className="border-t border-line-strong pt-block lg:col-span-6 lg:col-start-7">
          <div className="space-y-6">
            {approach.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "max-w-lead text-lead"
                    : "max-w-copy text-[color:var(--tone-muted)]"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section
        tone="canvas"
        spacing="compact"
        reveal
        aria-labelledby="careers-openings-title"
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <div className="lg:col-span-5">
          <Eyebrow>{openings.eyebrow}</Eyebrow>
          <h2 id="careers-openings-title" className="mt-4 max-w-2xl text-h2">
            {openings.title}
          </h2>
        </div>

        <div className="border-t border-line-strong pt-block lg:col-span-6 lg:col-start-7">
          <p className="max-w-lead text-lead">{openings.description}</p>
        </div>
      </Section>

      <CtaBand id="careers-cta-title" {...cta} />
    </main>
  );
}
