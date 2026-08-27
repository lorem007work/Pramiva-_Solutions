import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { serviceGroups } from "@/data/services";
import { site } from "@/data/site";

/**
 * The facts band — this site's version of a theme's "stat counter" row.
 *
 * Every corporate template has one, and it is normally filled with growth
 * percentages, client counts and satisfaction scores. None of those exist here
 * in verified form (Q23 is unanswered, Q19 has no testimonials), and inventing
 * them is the one thing this project cannot do.
 *
 * So the row carries facts instead of performance claims. Every value is
 * derived from data published elsewhere on the site rather than asserted fresh
 * here, so nothing in this component can drift out of step with what has been
 * approved.
 *
 * It reads as confident rather than thin because facts stated plainly do. A
 * fabricated "98% client satisfaction" would look stronger for exactly as long
 * as it took someone to ask for the evidence.
 *
 * TWO LABELS CHANGED IN THE REDESIGN
 *
 * "Clients — Nepal & international" was not a metric; it was geography filed
 * under the wrong noun, and it invited the reading "we have clients called
 * Nepal & international". It is now "Markets".
 *
 * "Services — 6" counted AI and automation, which the same page marks as a
 * future direction. Advertising six services and then labelling one of them as
 * not-yet-offered is a contradiction a visitor can spot. "Capabilities" is the
 * honest noun for a set that includes one not yet sold.
 */
export function AtAGlance() {
  const capabilityCount = serviceGroups.reduce(
    (total, group) => total + group.services.length,
    0,
  );

  const facts = [
    { value: String(site.founded), label: "Founded" },
    { value: site.location, label: "Based in" },
    { value: "Nepal & international", label: "Markets" },
    { value: String(capabilityCount), label: "Capabilities" },
  ];

  return (
    <Section
      tone="canvas"
      spacing="compact"
      reveal
      aria-label="Company at a glance"
    >
      {/* Each fact carries its own top rule, so the set reads as columns at
          every breakpoint rather than needing axis-switching dividers. */}
      <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact, index) => (
          <ScrollReveal
            key={fact.label}
            delay={index * 0.1}
            className="flex flex-col-reverse gap-1 border-t-2 border-ink pt-5"
          >
            <dt className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
              {fact.label}
            </dt>
            <dd className="text-h2 font-semibold text-balance text-brand-deep lg:text-h3">
              {fact.value}
            </dd>
          </ScrollReveal>
        ))}
      </dl>
    </Section>
  );
}
