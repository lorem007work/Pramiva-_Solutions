import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { pendingSteps } from "@/data/pending";

/**
 * Working process — SCAFFOLD. Needs separately approved wording.
 *
 * The induction material does describe how work runs, but that content is
 * barred from public pages, and parts of it describe how work is divided with
 * a client, which is confidential.
 *
 * Laid out as a connected row rather than a vertical timeline: four short
 * steps in a column leaves most of the section empty, which is the problem
 * this redesign exists to fix.
 */
export function Process({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Section reveal aria-labelledby="process-title">
      <SectionHeading id="process-title" eyebrow={eyebrow} title={title} />

      <ol className="mt-section-sm grid gap-block sm:grid-cols-2 lg:grid-cols-4">
        {pendingSteps.map((item, index) => (
          <li
            key={item.title}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="relative"
          >
            {/* The connector stops before the last item so the row reads as a
                sequence with an end, not one that trails off. */}
            {index < pendingSteps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-5 left-12 hidden h-px w-full bg-line lg:block"
              />
            ) : null}

            <span className="relative inline-flex size-10 items-center justify-center rounded-full border border-line bg-canvas text-sm font-medium">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-5 text-h3">{item.title}</h3>
            <p className="mt-3 max-w-[40ch] text-[color:var(--tone-muted)]">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
