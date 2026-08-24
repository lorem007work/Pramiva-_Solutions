import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { pendingQuotes } from "@/data/pending";

/**
 * Testimonials — SCAFFOLD. Blocked on Q19.
 *
 * Deliberately a static pair, not a slider. A carousel hides most of its
 * content behind an interaction, needs JavaScript this site does not otherwise
 * ship, and is poor for both screen readers and search engines. Two quotes
 * side by side say the same thing and are always visible.
 *
 * A testimonial must come from a real, named person who has agreed to appear.
 * An invented quote attributed to a plausible-sounding job title is the single
 * most common fabricated element on corporate sites.
 */
export function Testimonials({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Section tone="surface" reveal aria-labelledby="quotes-title">
      <SectionHeading id="quotes-title" eyebrow={eyebrow} title={title} />

      <ul className="mt-section-sm grid gap-6 md:grid-cols-2">
        {pendingQuotes.map((item, index) => (
          <li
            key={item.id}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="flex flex-col rounded-2xl border border-line bg-canvas p-8"
          >
            <blockquote className="flex-1 text-lead">
              <p>{item.quote}</p>
            </blockquote>
            <footer className="mt-6 border-t border-line pt-6">
              <p className="font-medium">{item.attribution}</p>
              <p className="mt-1 text-sm text-[color:var(--tone-muted)]">
                {item.role}
              </p>
            </footer>
          </li>
        ))}
      </ul>
    </Section>
  );
}
