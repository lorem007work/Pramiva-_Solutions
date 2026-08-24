import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { homepage } from "@/data/homepage";
import { primaryCta } from "@/data/navigation";
import { serviceGroups } from "@/data/services";
import { site } from "@/data/site";

/**
 * Homepage LCP section. Server Component — plain HTML over a CSS background,
 * so the fold ships no JavaScript, animation included.
 *
 * Ground. Deep brand teal, taken from the logo wordmark, rather than black or
 * white. It is the colour the company already owns, so the fold reads as this
 * brand rather than as a generic dark hero.
 *
 * Headline. The motto used to be the H1. It is memorable, but it is a slogan —
 * a visitor reading "Think Bold. Build Smart. Scale Fast." still does not know
 * what is sold, and Google indexes that as the page's main claim. The H1 now
 * states the offer, using wording already approved and already carried on the
 * About page. The motto stays, demoted to a brand line beneath it, which is
 * where a tagline usually belongs.
 *
 * The supporting paragraph was removed rather than repeated: site.summary
 * opens with almost exactly the same clause as the new H1, so keeping both put
 * the same sentence on screen twice. The capability strip carries the detail
 * it was providing.
 *
 * Motion. The hero is above the fold and cannot use the scroll reveal — there
 * is no scroll to wait for. Elements carry a --hero-step index and animate on
 * load so the section assembles. The sequence lands inside a second.
 */
export function Hero() {
  const step = (index: number) =>
    ({ "--hero-step": index }) as React.CSSProperties;

  return (
    <Section
      tone="brand"
      backgroundImage="/images/brand/hero-bg.webp"
      backgroundPosition="right center"
      aria-labelledby="home-hero-title"
      /*
        No forced viewport height. Pinning the section to 100svh and using
        justify-between pushed the capability strip to the floor, and with copy
        this short that opened a void through the middle - the same emptiness
        the whole redesign is trying to remove. The section now sizes to its
        content, so the spacing is the rhythm token rather than whatever the
        viewport happens to be.
      */
      className="hero-ground relative overflow-hidden"
      containerClassName="flex w-full flex-col gap-section-sm"
    >
      <div>
        <p
          data-hero-step
          style={step(0)}
          className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]"
        >
          {site.descriptor}
        </p>

        <h1
          data-hero-step
          style={step(1)}
          className="mt-6 max-w-[18ch] text-h1"
        >
          {homepage.company.title}
        </h1>

        {/* The motto, kept but demoted — it is a tagline, not a proposition. */}
        <p
          data-hero-step
          style={step(2)}
          className="mt-block text-lead text-[color:var(--tone-muted)]"
        >
          {site.tagline}
        </p>

        <div
          data-hero-step
          style={step(3)}
          className="mt-block flex flex-wrap items-center gap-4"
        >
          <Button href={primaryCta.href} variant="inverse">
            {primaryCta.label}
          </Button>
          {/*
            A second, quieter action. Someone not yet ready to make contact
            otherwise has nowhere to go from the fold but the navigation.
          */}
          <Button href="/services" variant="ghost">
            Explore services
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>

      {/* Capability strip — approved group headings, no new copy. */}
      <ul
        data-hero-step
        style={step(4)}
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
