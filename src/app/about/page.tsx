import { CtaBand } from "@/components/sections/cta-band";
import { Team } from "@/components/sections/team";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/data/about";
import { seo } from "@/data/seo";
import { site } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(seo.about);

/**
 * About page. Content stays server-rendered; Section adds a narrow Reveal
 * boundary around selected below-the-fold content.
 *
 * Team photographs are included for local review. Client names, internal
 * process copy and induction-derived values remain outside the public page.
 */
export default function AboutPage() {
  const { header, story, vision, cta } = about;

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
        reveal
        aria-labelledby="about-story-title"
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <div className="lg:col-span-5">
          <p className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
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
                    : "max-w-[65ch] text-[color:var(--tone-muted)]"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Team />

      <Section
        tone="ink"
        reveal
        aria-labelledby="about-vision-title"
        containerClassName="grid gap-block md:grid-cols-12"
      >
        <div className="flex items-start justify-between gap-6 border-t border-slate pt-5 md:col-span-3 md:flex-col">
          <p className="text-eyebrow uppercase text-line-strong">
            {vision.eyebrow}
          </p>
          <p aria-hidden="true" className="text-h2 text-accent">
            03
          </p>
        </div>

        <h2
          id="about-vision-title"
          className="max-w-4xl text-h1 md:col-span-8 md:col-start-5"
        >
          {vision.statement}
        </h2>
      </Section>

      <CtaBand id="about-cta-title" {...cta} />
    </main>
  );
}
