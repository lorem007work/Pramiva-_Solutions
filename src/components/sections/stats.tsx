import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { pendingStats } from "@/data/pending";

/**
 * Metrics row — SCAFFOLD. Blocked on Q23.
 *
 * Values render as em-dashes rather than sample numbers. A placeholder "500+"
 * looks finished, reads as true, and is exactly the kind of thing that reaches
 * production because nobody notices it was never verified.
 */
export function Stats({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Section tone="ink" reveal aria-labelledby="stats-title">
      <SectionHeading id="stats-title" eyebrow={eyebrow} title={title} />

      <dl className="mt-section-sm grid gap-block sm:grid-cols-2 lg:grid-cols-4">
        {pendingStats.map((stat, index) => (
          <div
            key={stat.label}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="border-t border-[color:var(--tone-border)] pt-6"
          >
            <dd className="text-display leading-none text-accent">{stat.value}</dd>
            <dt className="mt-4 text-[color:var(--tone-muted)]">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}
