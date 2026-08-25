import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { partnership } from "@/data/partnership";

/**
 * Anonymised partnership section — Q24 Option A.
 *
 * Sectors and scale only, no client or brand names, no logos. See
 * data/partnership.ts and docs/CONTENT-INVENTORY.md §6 for the full reasoning
 * — the short version is that naming the brands publicly identifies clients
 * who trade as local Perth businesses, which is not this company's disclosure
 * to make without the client's own written consent.
 *
 * Tone is ink rather than surface/canvas: the sections either side (services,
 * company-intro) are both light, and a dark band here breaks that run while
 * giving the section the same visual weight as the facts row and the vision
 * statement — this is proof-of-scale content, so it should not read as an
 * afterthought tucked between two lighter sections.
 */
export function Partnership() {
  return (
    <Section tone="ink" reveal aria-labelledby="partnership-title">
      <div className="grid gap-block lg:grid-cols-12">
        <SectionHeading
          id="partnership-title"
          eyebrow={partnership.eyebrow}
          title={partnership.title}
          description={partnership.description}
          className="lg:col-span-7"
        />

        <ul className="flex flex-wrap content-start gap-3 lg:col-span-5 lg:justify-end">
          {partnership.sectors.map((sector, index) => (
            <li
              key={sector}
              data-stagger
              style={{ "--stagger-index": index } as React.CSSProperties}
              className="rounded-full border border-[color:var(--tone-border)] px-4 py-2 text-sm"
            >
              {sector}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-block text-sm text-[color:var(--tone-muted)]">
        {partnership.note}
      </p>
    </Section>
  );
}
