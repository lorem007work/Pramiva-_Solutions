import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { primaryCta } from "@/data/navigation";
import { serviceGroups } from "@/data/services";
import { site } from "@/data/site";

/**
 * Homepage LCP section. Stays a Server Component — plain HTML over a CSS
 * background, so nothing here ships JavaScript.
 *
 * The team photograph was removed from the hero. The artwork behind the type
 * reads as premium; a restaurant table photo directly beneath it pulled that
 * back down, and it was competing with the headline for the fold rather than
 * supporting it. The photograph still appears further down the page, where it
 * is context rather than the first impression.
 *
 * A capability strip replaces it. It costs no new copy — the three lines are
 * the approved service group headings from data/services.ts — but it answers
 * the question the motto alone leaves open. "Think Bold. Build Smart. Scale
 * Fast." is a slogan; a visitor still needs to know what is actually sold, and
 * the fold is where they look for it.
 */
export function Hero() {
  // The motto is three separate statements. Left to reflow it breaks mid-claim
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
    >
      <div className="grid gap-block lg:grid-cols-12">
        <div className="lg:col-span-9">
          <p className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
            {site.descriptor}
          </p>

          {/*
            The motto carries the headline. It is on the logo, so it is already
            public and needs no approval, and no other confirmed sentence is
            short enough to set at display size.
          */}
          <h1 id="home-hero-title" className="mt-block text-display">
            {mottoLines.map((line) => (
              <span key={line} className="block">
                {line.trim()}
              </span>
            ))}
          </h1>
        </div>

        <div className="lg:col-span-7">
          <p className="max-w-[58ch] text-lead text-[color:var(--tone-muted)]">
            {site.summary}
          </p>

          <div className="mt-block flex flex-wrap items-center gap-4">
            <Button href={primaryCta.href} variant="inverse">
              {primaryCta.label}
            </Button>
            {/*
              A second, quieter action. Not everyone arriving is ready to make
              contact; without this the only way forward from the fold is the
              nav, and a visitor who is still deciding simply leaves.
            */}
            <Button href="/services" variant="ghost">
              Explore services
              <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Capability strip — approved group headings, no new copy. */}
      <ul className="mt-section-sm grid gap-px overflow-hidden border-t border-[color:var(--tone-border)] pt-block sm:grid-cols-3">
        {serviceGroups.map((group, index) => (
          <li
            key={group.heading}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
          >
            <span
              aria-hidden="true"
              className="text-eyebrow text-accent"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-h3">{group.heading}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
