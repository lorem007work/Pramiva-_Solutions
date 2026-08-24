import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { about } from "@/data/about";
import { primaryCta } from "@/data/navigation";
import { site } from "@/data/site";

/**
 * Homepage LCP section. Stays a Server Component — the headline is plain HTML
 * and `next/image` renders server-side.
 *
 * The right column was an abstract circle-and-numeral composition. Decorative
 * geometry filling empty space is the strongest "generated template" signal on
 * a page, and the brief rules that look out.
 *
 * It is replaced by the real team photograph, which also does the page's
 * hardest sales work: the company delivers operations from another country, so
 * a prospective client's first unspoken question is whether a team they will
 * never meet can be relied on. A photograph of that team answers it.
 *
 * The wide table frame is used rather than the rooftop one. The rooftop shot
 * reads as a social outing — posing, plates, glasses — while this one shows
 * the team working. At 1600x767 it also runs as a full-width band rather than
 * being cropped into a narrow column, which is what its proportions want.
 *
 * `priority` is correct: this is above the fold and is the LCP element. Static
 * export means no runtime optimisation, so the file was compressed before
 * committing and carries explicit width/height to prevent layout shift.
 */
export function Hero() {
  const photo = about.people.photos.main;

  // The motto is three separate statements. Left to reflow, it breaks mid-claim
  // ("Think Bold. Build / Smart. Scale Fast."), which reads as an accident.
  // Splitting on the sentence boundary keeps one statement per line at every
  // width. Derived from the data, so the wording is never restated here.
  const mottoLines = site.tagline.match(/[^.]+\./g) ?? [site.tagline];

  return (
    <Section
      tone="ink"
      backgroundImage="/images/brand/hero-bg.webp"
      aria-labelledby="home-hero-title"
      className="relative overflow-hidden"
      containerClassName="relative"
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-9">
          <p className="text-eyebrow uppercase text-line-strong">
            {site.descriptor}
          </p>

          {/*
            The motto carries the headline. It is on the logo, so it is already
            public and needs no approval, and no other confirmed sentence is
            short enough to set at display size. The line underneath says what
            the company actually does.
          */}
          <h1 id="home-hero-title" className="mt-block text-display">
            {mottoLines.map((line) => (
              <span key={line} className="block">
                {line.trim()}
              </span>
            ))}
          </h1>
        </div>

        <div className="lg:col-span-8">
          <p className="max-w-[60ch] text-lead text-canvas/70">
            {site.summary}
          </p>

          <div className="mt-block">
            <Button href={primaryCta.href} variant="inverse">
              {primaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      <figure className="mt-section-sm">
        <div className="overflow-hidden rounded-2xl border border-canvas/15">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1280px) 1280px, 100vw"
            priority
            className="w-full object-cover"
          />
        </div>
        <figcaption className="mt-4 text-sm text-canvas/60">
          {photo.caption}
        </figcaption>
      </figure>
    </Section>
  );
}
