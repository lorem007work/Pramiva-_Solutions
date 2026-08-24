import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { pendingCases } from "@/data/pending";

/**
 * Case study grid — SCAFFOLD. Blocked on Q24.
 *
 * The image wells stay empty. A stock photograph standing in for client work
 * is a claim about work that was never done, and it tends to survive into
 * production because it looks like a finished card.
 */
export function CaseStudies({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Section reveal aria-labelledby="cases-title">
      <SectionHeading id="cases-title" eyebrow={eyebrow} title={title} />

      <ul className="mt-section-sm grid gap-6 md:grid-cols-3">
        {pendingCases.map((item, index) => (
          <li
            key={item.id}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line"
          >
            <div className="flex aspect-[4/3] items-center justify-center border-b border-dashed border-line-strong bg-surface p-6 text-center">
              <span className="text-xs text-[color:var(--tone-eyebrow)]">
                PLACEHOLDER: project image (Q24)
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
                {item.sector}
              </p>
              <h3 className="mt-3 text-h3">{item.title}</h3>
              <p className="mt-3 text-[color:var(--tone-muted)]">{item.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
