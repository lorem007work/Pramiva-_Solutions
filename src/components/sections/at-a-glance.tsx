import { Section } from "@/components/ui/section";
import { serviceGroups } from "@/data/services";
import { site } from "@/data/site";

/**
 * The facts band — this site's version of a theme's "stat counter" row.
 *
 * Every corporate template has one, and it is normally filled with growth
 * percentages, client counts and satisfaction scores. None of those exist here
 * in verified form (Q23 is unanswered, Q19 has no testimonials, and the client
 * brands are embargoed under Q24), and inventing them is the one thing this
 * project cannot do.
 *
 * So the row carries facts instead of performance claims: founding year,
 * location, markets served and the size of the service catalogue. Every value
 * is derived from data already published elsewhere on the site rather than
 * asserted fresh here — nothing in this component can drift out of step with
 * what has been approved, and nothing needs re-approving when it changes.
 *
 * It reads as confident rather than thin because facts stated plainly do. A
 * fabricated "98% client satisfaction" would look stronger for exactly as long
 * as it took someone to ask for the evidence.
 */
export function AtAGlance() {
  const serviceCount = serviceGroups.reduce(
    (total, group) => total + group.services.length,
    0,
  );

  const facts = [
    { value: site.founded, label: "Founded" },
    { value: site.location, label: "Based in" },
    { value: "Nepal & international", label: "Clients" },
    { value: String(serviceCount), label: "Services" },
  ];

  return (
    <Section spacing="compact" reveal aria-label="Company at a glance">
      {/*
        A real gap, not gap-px. At one pixel the columns had no separation at
        all, and "Lalitpur, Nepal" set at h2 simply ran into the column beside
        it — the values collided rather than sat side by side.
      */}
      <dl className="grid gap-block sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="border-t border-line pt-6"
          >
            <dt className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
              {fact.label}
            </dt>
            {/*
              text-h3, not h2. These are four short facts in narrow columns, and
              at h2 the longest value overflowed into its neighbour. At display
              size they would also shout louder than the page's real headline.
              text-balance stops two-word values breaking awkwardly.
            */}
            <dd className="mt-3 text-h3 text-balance">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
