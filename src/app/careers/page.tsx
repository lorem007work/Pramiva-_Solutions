import { CtaBand } from "@/components/sections/cta-band";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import Image from "next/image";
import { about } from "@/data/about";
import { careers } from "@/data/careers";
import { seo } from "@/data/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(seo.careers);

export default function CareersPage() {
  const { header, philosophy, process, onboarding, openings, cta } = careers;
  const photoFor = (src: string) => {
    const found = about.workspace.photos.find((p) => p.src === src);
    if (!found) throw new Error(`CareersPage: no photo matches ${src}`);
    return found;
  };
  const processPhoto = photoFor(process.photoSrc);
  const onboardingPhoto = photoFor(onboarding.photoSrc);

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
        aria-labelledby="careers-philosophy-title"
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <div
          data-stagger
          style={{ "--stagger-index": 0 } as React.CSSProperties}
          className="lg:col-span-5"
        >
          <Eyebrow>{philosophy.eyebrow}</Eyebrow>
          <h2 id="careers-philosophy-title" className="mt-4 max-w-2xl text-h1">
            {philosophy.title}
          </h2>
          <div className="mt-section-sm space-y-6">
            {philosophy.paragraphs.map((paragraph, index) => (
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

        <div className="border-t border-[color:var(--tone-border)] pt-block lg:col-span-6 lg:col-start-7">
          <h3 className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
            {philosophy.qualitiesLabel}
          </h3>
          <dl className="mt-6 space-y-5">
            {philosophy.qualities.map((quality, index) => (
              <div
                key={quality.name}
                data-stagger
                style={{ "--stagger-index": index + 1 } as React.CSSProperties}
              >
                <dt className="text-h3">{quality.name}</dt>
                <dd className="mt-1 max-w-copy text-[color:var(--tone-muted)]">
                  {quality.description}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-section-sm border-t border-[color:var(--tone-border)] pt-block text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
            {philosophy.competenciesLabel}
          </h3>
          <ul className="mt-5 space-y-2.5 text-[color:var(--tone-muted)]">
            {philosophy.competencies.map((item, index) => (
              <li
                key={item}
                data-stagger
                style={{ "--stagger-index": index + 6 } as React.CSSProperties}
                className="flex gap-2.5"
              >
                <span aria-hidden="true" className="text-accent-text">
                  —
                </span>
                <span className="max-w-copy">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        reveal
        aria-labelledby="careers-process-title"
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <div
          data-stagger
          style={{ "--stagger-index": 0 } as React.CSSProperties}
          className="lg:col-span-5"
        >
          <Eyebrow>{process.eyebrow}</Eyebrow>
          <h2 id="careers-process-title" className="mt-4 max-w-2xl text-h1">
            {process.title}
          </h2>
          <p className="mt-section-sm max-w-copy text-lead text-[color:var(--tone-muted)]">
            {process.description}
          </p>

          <Image
            src={processPhoto.src}
            alt={processPhoto.alt}
            width={processPhoto.width}
            height={processPhoto.height}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="mt-section-sm w-full rounded-2xl border border-[color:var(--tone-border)]"
          />
        </div>

        <ol className="border-t border-[color:var(--tone-border)] pt-block lg:col-span-6 lg:col-start-7">
          {process.stages.map((stage, index) => (
            <li
              key={stage.name}
              data-stagger
              style={{ "--stagger-index": index + 1 } as React.CSSProperties}
              className="grid gap-2 border-b border-[color:var(--tone-border)] py-block first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-12"
            >
              <p
                aria-hidden="true"
                className="text-eyebrow text-accent-text sm:col-span-2"
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="sm:col-span-10">
                <h3 className="text-h3">{stage.name}</h3>
                <ul className="mt-2 space-y-1.5 text-[color:var(--tone-muted)]">
                  {stage.points.map((point) => (
                    <li key={point} className="max-w-copy">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        tone="soft"
        reveal
        aria-labelledby="careers-onboarding-title"
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <div
          data-stagger
          style={{ "--stagger-index": 0 } as React.CSSProperties}
          className="lg:col-span-5"
        >
          <Eyebrow>{onboarding.eyebrow}</Eyebrow>
          <h2 id="careers-onboarding-title" className="mt-4 max-w-2xl text-h1">
            {onboarding.title}
          </h2>
          <p className="mt-section-sm max-w-copy text-lead text-[color:var(--tone-muted)]">
            {onboarding.description}
          </p>

          <Image
            src={onboardingPhoto.src}
            alt={onboardingPhoto.alt}
            width={onboardingPhoto.width}
            height={onboardingPhoto.height}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="mt-section-sm w-full rounded-2xl border border-[color:var(--tone-border)]"
          />
        </div>

        <div className="grid gap-x-block gap-y-block border-t border-[color:var(--tone-border)] pt-block sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {onboarding.phases.map((phase, index) => (
            <div
              key={phase.name}
              data-stagger
              style={{ "--stagger-index": index + 1 } as React.CSSProperties}
            >
              <p className="text-eyebrow uppercase text-accent-text">
                {phase.name}
              </p>
              <h3 className="mt-2 text-h3">{phase.summary}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-[color:var(--tone-muted)]">
                {phase.points.map((point) => (
                  <li key={point} className="max-w-copy">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="surface"
        spacing="compact"
        reveal
        aria-labelledby="careers-openings-title"
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <div
          data-stagger
          style={{ "--stagger-index": 0 } as React.CSSProperties}
          className="lg:col-span-5"
        >
          <Eyebrow>{openings.eyebrow}</Eyebrow>
          <h2 id="careers-openings-title" className="mt-4 max-w-2xl text-h2">
            {openings.title}
          </h2>
        </div>

        <div
          data-stagger
          style={{ "--stagger-index": 1 } as React.CSSProperties}
          className="border-t border-[color:var(--tone-border)] pt-block lg:col-span-6 lg:col-start-7"
        >
          <p className="max-w-lead text-lead">{openings.description}</p>
        </div>
      </Section>

      <CtaBand id="careers-cta-title" {...cta} />
    </main>
  );
}
