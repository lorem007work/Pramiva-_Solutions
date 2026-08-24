import { Section } from "@/components/ui/section";
import { homepage } from "@/data/homepage";

/** Homepage editorial statement. Content stays server-rendered and data-led. */
export function PositioningStatement() {
  const { positioning } = homepage;

  return (
    <Section
      /*
        Ink, not brand. The hero now owns the deep teal - it is the logo
        colour and the fold is where it belongs - so leaving this band teal
        too put two large identical grounds on one page. The teal artwork
        still shows through, tinted dark by the ink scrim, which keeps the
        band related to the hero without repeating it.
      */
      tone="ink"
      backgroundImage="/images/brand/vision-bg.webp"
      /* This frame carries its arcs on the left. */
      backgroundPosition="left center"
      reveal
      aria-labelledby="home-positioning-title"
      className="overflow-hidden"
      containerClassName="relative grid gap-block md:grid-cols-12"
    >
      <div className="flex items-start justify-between gap-6 border-t border-slate pt-5 md:col-span-3 md:flex-col">
        <p className="text-eyebrow uppercase text-line-strong">
          {positioning.eyebrow}
        </p>
        <p aria-hidden="true" className="text-h2 text-accent">
          02
        </p>
      </div>

      <h2
        id="home-positioning-title"
        className="max-w-4xl text-h1 md:col-span-8 md:col-start-5"
      >
        {positioning.statement}
      </h2>
    </Section>
  );
}
