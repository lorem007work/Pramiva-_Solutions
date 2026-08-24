import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { primaryCta } from "@/data/navigation";
import { serviceGroups } from "@/data/services";
import { site } from "@/data/site";

/**
 * Homepage LCP section. Server Component — plain HTML over a CSS background,
 * so the fold ships no JavaScript, animation included.
 *
 * Composition. Earlier versions were a block of text floating in the left half
 * of a dark rectangle, with dead space through the middle and the capability
 * strip sliced in half by the fold. Colour alone did not fix that; the section
 * had no structure. It now fills the viewport below the navbar and distributes
 * content between top and bottom, with the strip pinned to the floor as a
 * full-width rule — closing the composition and showing the page continues.
 *
 * Motion. The hero is above the fold, so it cannot use the scroll reveal;
 * there is no scroll to wait for. Each element carries a --hero-step index and
 * animates on load, so the section assembles instead of appearing at once. The
 * whole sequence lands inside a second: a hero a visitor waits through is
 * worse than one that simply appears.
 */
export function Hero() {
  // The motto is three separate statements. Left to reflow it breaks mid-claim
  // ("Think Bold. Build / Smart. Scale Fast."), which reads as an accident.
  const mottoLines = site.tagline.match(/[^.]+\./g) ?? [site.tagline];

  const step = (index: number) =>
    ({ "--hero-step": index }) as React.CSSProperties;

  return (
    <Section
      tone="ink"
      backgroundImage="/images/brand/hero-bg.webp"
      aria-labelledby="home-hero-title"
      className="hero-ground relative flex min-h-[calc(100svh-5rem)] overflow-hidden"
      containerClassName="flex w-full flex-col justify-between gap-section-sm"
    >
      <div>
        <p
          data-hero-step
          style={step(0)}
          className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]"
        >
          {site.descriptor}
        </p>

        {/*
          The motto carries the headline. It is on the logo, so it is already
          public and needs no approval, and no other confirmed sentence is
          short enough to set at display size. Each line animates separately —
          the three statements arriving in sequence is the point of the motto.
        */}
        <h1 id="home-hero-title" className="mt-6 text-display">
          {mottoLines.map((line, index) => (
            <span
              key={line}
              data-hero-step
              style={step(index + 1)}
              className="block"
            >
              {line.trim()}
            </span>
          ))}
        </h1>

        <div
          data-hero-step
          style={step(4)}
          className="mt-block grid gap-block lg:grid-cols-12"
        >
          <p className="max-w-[52ch] text-lead text-[color:var(--tone-muted)] lg:col-span-6">
            {site.summary}
          </p>

          {/*
            Actions sit beside the supporting line rather than under it. Stacked,
            they pushed the capability strip off the fold; alongside, they close
            the horizontal gap that made the middle of the section read as empty.
          */}
          <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <Button href={primaryCta.href} variant="inverse">
              {primaryCta.label}
            </Button>
            <Button href="/services" variant="ghost">
              Explore services
              <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Capability strip — approved group headings, no new copy. */}
      <ul
        data-hero-step
        style={step(5)}
        className="grid border-t border-[color:var(--tone-border)] sm:grid-cols-3"
      >
        {serviceGroups.map((group, index) => (
          <li
            key={group.heading}
            className="border-[color:var(--tone-border)] py-6 sm:border-l sm:first:border-l-0 sm:px-6 sm:first:pl-0"
          >
            <span aria-hidden="true" className="text-eyebrow text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-h3">{group.heading}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
