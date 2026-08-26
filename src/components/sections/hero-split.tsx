import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroItem, HeroSequence } from "@/components/ui/hero-motion";
import { Section } from "@/components/ui/section";
import { ServiceIcon } from "@/components/ui/service-icon";
import { ctas } from "@/data/navigation";
import { homepage } from "@/data/homepage";
import { pillars } from "@/data/pillars";

// Full-bleed fold. The supplied brand artwork spans the whole section rather
// than sitting in a panel: boxed, its own near-white background showed as a
// pasted-in rectangle against the page.
//
// The headline stays real text. The source banner had it baked into the image,
// which no crawler or screen reader can read and which softens on a phone.
export function HeroSplit() {
  const { hero } = homepage;

  return (
    <HeroSequence>
      <Section
        tone="surface"
        aria-labelledby="home-hero-title"
        className="relative overflow-hidden"
        containerClassName="grid items-center gap-x-block gap-y-10 lg:min-h-[34rem] lg:grid-cols-12"
      >
        {/*
          Container sets no positioning, so `inset-0` resolves against the
          section and the artwork covers the full bleed, gutters included.
        */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {/*
            The artwork is portrait and the fold is landscape. Filling the width
            would crop away the arrow and the icon circles, so it is anchored to
            the right at its own proportions and allowed to run full height.
          */}
          <Image
            src="/images/brand/hero-illustration.webp"
            alt=""
            width={728}
            height={880}
            priority
            className="absolute inset-y-0 right-0 h-full w-auto max-w-none object-contain object-right opacity-60 [mask-image:linear-gradient(to_right,transparent_0%,#000_22%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_22%)] sm:opacity-70 lg:opacity-100"
          />
          {/*
            Copy sits on the left, so the ground is held opaque there and
            released across the middle. Without this the headline would land on
            the busiest part of the artwork at some widths.
          */}
          <div className="absolute inset-0 bg-gradient-to-r from-surface from-25% via-surface/75 via-55% to-transparent" />
        </div>

        <div className="relative z-10 lg:col-span-7 lg:col-start-1">
          <HeroItem>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </HeroItem>

          {/* ch, not px: text-h1 is a clamp, so a fixed width regains lines as
              it scales. 18ch holds three lines at the sizes that matter. */}
          <HeroItem>
            <h1 id="home-hero-title" className="mt-5 max-w-[18ch] text-h1">
              {hero.title}
            </h1>
          </HeroItem>

          <HeroItem>
            <p className="mt-6 max-w-lead text-lead text-[color:var(--tone-muted)]">
              {hero.lead}
            </p>
          </HeroItem>

          <HeroItem className="mt-block flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href={ctas.heroPrimary.href} className="w-full sm:w-auto">
              {ctas.heroPrimary.label}
            </Button>
            <Button
              href={ctas.heroSecondary.href}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {ctas.heroSecondary.label}
            </Button>
          </HeroItem>

          {/* The three capability areas, as the supplied banner shows them.
              Titles come from data/pillars.ts — nothing new is asserted. */}
          <HeroItem>
            <ul className="mt-block flex flex-wrap gap-x-5 gap-y-3 border-t border-line pt-6">
              {pillars.map((pillar) => (
                <li
                  key={pillar.group}
                  className="flex items-center gap-2.5 text-sm text-[color:var(--tone-muted)]"
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-canvas text-brand">
                    <ServiceIcon name={pillar.icon} className="size-4" />
                  </span>
                  {pillar.title}
                </li>
              ))}
            </ul>
          </HeroItem>
        </div>
      </Section>
    </HeroSequence>
  );
}
