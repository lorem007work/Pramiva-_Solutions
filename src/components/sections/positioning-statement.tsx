import { Section } from "@/components/ui/section";
import { homepage } from "@/data/homepage";

/** Homepage editorial statement. Content stays server-rendered and data-led. */
export function PositioningStatement() {
  const { positioning } = homepage;

  return (
    <Section
      tone="brand"
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
