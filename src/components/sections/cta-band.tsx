import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { primaryCta } from "@/data/navigation";

type CtaBandProps = {
  /** Unique per page — the band is the labelled region of its own section. */
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

/**
 * Closing conversion prompt, repeated on every route.
 *
 * Copy arrives as props rather than being read from one page's data file, so
 * the same band serves home, about, services and contact without a variant.
 * Final wording remains pending Q4.
 */
export function CtaBand({ id, eyebrow, title, description }: CtaBandProps) {
  return (
    <Section
      tone="ink"
      backgroundImage="/images/brand/cta-bg.webp"
      spacing="compact"
      reveal
      aria-labelledby={id}
      containerClassName="grid gap-block md:grid-cols-12 md:items-end"
    >
      <p className="text-eyebrow uppercase text-line-strong md:col-span-3 md:self-start">
        {eyebrow}
      </p>

      <div className="md:col-span-8 md:col-start-5">
        <h2 id={id} className="max-w-4xl text-h1">
          {title}
        </h2>

        <div className="mt-block flex flex-col gap-block sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[55ch] text-lead text-canvas/70">{description}</p>

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
