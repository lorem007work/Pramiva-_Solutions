import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroItem, HeroSequence } from "@/components/ui/hero-motion";
import { HeroServiceRotator } from "@/components/ui/hero-service-rotator";
import { HeroBackgroundMotion } from "@/components/ui/hero-background-motion";
import { Section } from "@/components/ui/section";
import { ctas } from "@/data/navigation";
import { homepage } from "@/data/homepage";

// Dark premium fold: ink ground with the brand arcs artwork and clear offer.
export function HeroSplit() {
  const { hero } = homepage;

  return (
    <HeroSequence>
      <Section
        tone="ink"
        spacing="compact"
        backgroundImage="/images/brand/hero-bg.webp"
        backgroundPosition="right center"
        aria-labelledby="home-hero-title"
        className="relative overflow-hidden"
      >
        <HeroBackgroundMotion />
        <div className="relative z-10">
          <HeroItem>
            <Eyebrow className="text-accent">{hero.eyebrow}</Eyebrow>
          </HeroItem>

          <HeroItem>
            <h1
              id="home-hero-title"
              className="mt-5 font-semibold sm:mt-6"
            >
              <span className="sr-only">{hero.accessibleTitle}</span>
              <span aria-hidden="true" className="block">
                <span className="block max-w-[24ch] font-bold tracking-tight text-h1">
                  {hero.title}
                </span>
                <span className="mt-2 block">
                  <HeroServiceRotator services={hero.rotatingServices} />
                </span>
              </span>
            </h1>
          </HeroItem>

          <div className="mt-section-sm">
            <div className="max-w-3xl">
              <HeroItem>
                <span
                  aria-hidden="true"
                  className="mb-7 block h-0.5 w-16 bg-accent"
                />
                <p className="max-w-lead text-base text-[color:var(--tone-muted)] sm:text-lead">
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

            </div>

          </div>
        </div>
      </Section>
    </HeroSequence>
  );
}
