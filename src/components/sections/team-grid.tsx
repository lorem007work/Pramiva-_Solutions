import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { pendingPeople } from "@/data/pending";

/**
 * Team cards — SCAFFOLD. Blocked on Q17.
 *
 * Two separate permissions are needed here, and they are easy to conflate:
 * management approving that the section exists, and each individual agreeing
 * to have their name and face on a public website. The second is theirs to
 * give, not the company's.
 *
 * Portrait wells stay empty for that reason. A stock headshot standing in for
 * a real colleague is worse than a blank tile.
 */
export function TeamGrid({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Section tone="surface" reveal aria-labelledby="team-title">
      <SectionHeading id="team-title" eyebrow={eyebrow} title={title} />

      <ul className="mt-section-sm grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pendingPeople.map((person, index) => (
          <li
            key={person.id}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
          >
            <div className="flex aspect-[4/5] items-center justify-center rounded-2xl border border-dashed border-line-strong bg-canvas p-4 text-center">
              <span className="text-xs text-[color:var(--tone-eyebrow)]">
                PLACEHOLDER: portrait, with consent (Q17)
              </span>
            </div>
            <p className="mt-4 font-medium">{person.name}</p>
            <p className="mt-1 text-sm text-[color:var(--tone-muted)]">
              {person.role}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
