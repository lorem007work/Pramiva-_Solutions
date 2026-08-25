import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroItem, HeroSequence } from "@/components/ui/hero-motion";
import { Section } from "@/components/ui/section";
import { ctas } from "@/data/navigation";
import { homepage } from "@/data/homepage";

// Dark fold. Copy sits left where the artwork is near-black; the mark sits
// right where its arcs are already lit. No photography on this page.
export function HeroSplit() {
  const { hero } = homepage;

  return (
    <HeroSequence>
      <Section
        tone="ink"
        backgroundImage="/images/brand/hero-bg.webp"
        backgroundPosition="center right"
        aria-labelledby="home-hero-title"
        className="relative overflow-hidden"
        containerClassName="grid items-center gap-x-block gap-y-10 lg:grid-cols-12 lg:gap-y-6"
      >
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:self-end">
          <HeroItem>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </HeroItem>
          {/* 20ch, not px: text-h1 is a clamp, so a fixed width regains lines as it scales */}
          <HeroItem>
            <h1 id="home-hero-title" className="mt-5 max-w-[20ch] text-h1">
              {hero.title}
            </h1>
          </HeroItem>
        </div>

        {/* Phone order: eyebrow -> h1 -> mark -> lead -> CTAs */}
        <div className="relative lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
          <HeroItem variant="mark" className="flex justify-center lg:justify-end">
            <Image
              src="/images/brand/mark-3d.webp"
              alt=""
              aria-hidden="true"
              width={640}
              height={669}
              priority
              className="h-auto w-[68vw] max-w-[300px] object-contain sm:max-w-[360px] lg:w-full lg:max-w-[440px] xl:max-w-[560px] xl:-mr-8"
            />
          </HeroItem>
        </div>

        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start">
          <HeroItem>
            <p className="max-w-lead text-lead text-[color:var(--tone-muted)]">
              {hero.lead}
            </p>
          </HeroItem>

          <HeroItem className="mt-block flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              href={ctas.heroPrimary.href}
              variant="inverse"
              className="w-full sm:w-auto"
            >
              {ctas.heroPrimary.label}
            </Button>
            <Button
              href={ctas.heroSecondary.href}
              variant="outline-inverse"
              className="w-full sm:w-auto"
            >
              {ctas.heroSecondary.label}
            </Button>
          </HeroItem>
        </div>
      </Section>
    </HeroSequence>
  );
}
