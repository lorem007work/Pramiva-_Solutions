import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { homepage } from "@/data/homepage";
import { primaryCta } from "@/data/navigation";

/** Working homepage conversion prompt; final wording remains pending Q4. */
export function CtaBand() {
  const { cta } = homepage;

  return (
    <Section
      tone="ink"
      spacing="compact"
      aria-labelledby="home-cta-title"
      containerClassName="grid gap-block md:grid-cols-12 md:items-end"
    >
      <p className="text-eyebrow uppercase text-line-strong md:col-span-3 md:self-start">
        {cta.eyebrow}
      </p>

      <div className="md:col-span-8 md:col-start-5">
        <h2 id="home-cta-title" className="max-w-4xl text-h1">
          {cta.title}
        </h2>

        <div className="mt-block flex flex-col gap-block sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[55ch] text-lead text-canvas/70">
            {cta.description}
          </p>

          <Button
            href={primaryCta.href}
            variant="inverse"
            className="shrink-0 self-start sm:self-auto"
          >
            {primaryCta.label}
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </Section>
  );
}
