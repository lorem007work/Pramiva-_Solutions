import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroItem, HeroSequence } from "@/components/ui/hero-motion";
import { Section } from "@/components/ui/section";
import { ServiceIcon } from "@/components/ui/service-icon";
import { ctas } from "@/data/navigation";
import { homepage } from "@/data/homepage";
import { pillars } from "@/data/pillars";

// Dark premium fold: ink ground with the brand arcs artwork, display tagline,
// circular mark as the focal graphic. Headline stays real text.
export function HeroSplit() {
  const { hero } = homepage;

  return (
    <HeroSequence>
      <Section
        tone="ink"
        backgroundImage="/images/brand/hero-bg.webp"
        backgroundPosition="right center"
        aria-labelledby="home-hero-title"
        className="relative overflow-hidden"
      >
        <div className="relative">
          <HeroItem>
            <Eyebrow className="text-accent">{hero.eyebrow}</Eyebrow>
          </HeroItem>

          <HeroItem>
            <h1
              id="home-hero-title"
              className="mt-6 max-w-[16ch] text-display font-semibold"
            >
              {hero.title}
            </h1>
          </HeroItem>

          <div className="mt-section-sm grid gap-x-block gap-y-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <HeroItem>
                <span
                  aria-hidden="true"
                  className="mb-7 block h-0.5 w-16 bg-accent"
                />
                <p className="max-w-lead text-lead text-[color:var(--tone-muted)]">
                  {hero.lead}
                </p>
              </HeroItem>

              <HeroItem className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button
                  href={ctas.heroPrimary.href}
                  className="w-full sm:w-auto"
                >
                  {ctas.heroPrimary.label}
                  <span aria-hidden="true">→</span>
                </Button>
                <Button
                  href={ctas.heroSecondary.href}
                  variant="outline-inverse"
                  className="w-full sm:w-auto"
                >
                  {ctas.heroSecondary.label}
                  <span aria-hidden="true">→</span>
                </Button>
              </HeroItem>

              <HeroItem>
                {/* Titles come from data/pillars.ts — nothing new asserted. */}
                <ul className="mt-block flex flex-wrap gap-x-5 gap-y-6 border-t border-[color:var(--tone-border)] pt-8">
                  {pillars.map((pillar, index) => (
                    <li
                      key={pillar.group}
                      className="flex items-center gap-3 border-[color:var(--tone-border)] pr-5 not-last:border-r"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-[color:var(--tone-border)] text-accent"
                      >
                        <ServiceIcon name={pillar.icon} className="size-5" />
                      </span>
                      <span className="flex flex-col">
                        <span
                          aria-hidden="true"
                          className="text-xs font-semibold text-accent"
                        >
                          0{index + 1}
                        </span>
                        <span className="text-sm font-medium">
                          {pillar.title}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </HeroItem>
            </div>

            <HeroItem
              variant="mark"
              className="hidden lg:block lg:col-span-5 lg:col-start-8"
            >
              {/* The circular brand mark, full colour, on a soft glow. */}
              <div
                aria-hidden="true"
                className="relative flex items-center justify-center"
              >
                <div className="absolute inset-[-25%] rounded-full [background:radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent)_38%,transparent),transparent_70%)]" />
                <div className="absolute inset-[-8%] rounded-full [background:radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand)_30%,transparent),transparent_65%)]" />
                <Image
                  src="/images/brand/mark-circle.png"
                  alt=""
                  width={512}
                  height={512}
                  // No `priority`: it preloads with no media attr, so phones
                  // downloaded this 16 KB decoration behind `hidden lg:block`.
                  className="relative h-auto w-[21rem]"
                />
              </div>
            </HeroItem>
          </div>
        </div>
      </Section>
    </HeroSequence>
  );
}
