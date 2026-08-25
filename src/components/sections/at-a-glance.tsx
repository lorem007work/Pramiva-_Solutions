import { Section } from "@/components/ui/section";
import { ServiceIcon } from "@/components/ui/service-icon";
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
    { icon: "calendar", value: String(site.founded), label: "Founded" },
    { icon: "pin", value: site.location, label: "Based in" },
    { icon: "globe", value: "Nepal & international", label: "Markets" },
    { icon: "capability", value: String(capabilityCount), label: "Capabilities" },
  ];

  return (
    <Section
      tone="soft"
      spacing="compact"
      reveal
      aria-label="Company at a glance"
    >
      {/*
        Dividers switch axis with the layout, the same way the old hero strip
        did. Stacked below sm they must be horizontal rules between rows; from
        sm they sit side by side and become vertical. Getting this wrong is how
        four facts turn into one undifferentiated block on a phone.

        `divide-*` is not used because it cannot change axis at a breakpoint.
      */}
      <dl className="grid gap-y-6 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4 lg:gap-y-0">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="flex items-center gap-4 border-t border-[color:var(--tone-border)] pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-canvas text-brand"
            >
              <ServiceIcon name={fact.icon} className="size-5" />
            </span>

            <div className="min-w-0">
              {/*
                Order is reversed against the DOM: <dt> is the label and must
                come first for the definition list to be valid, but visually the
                value leads. `flex-col-reverse` keeps both true at once instead
                of choosing between semantics and design.
              */}
              <div className="flex flex-col-reverse">
                <dt className="text-sm text-[color:var(--tone-eyebrow)]">
                  {fact.label}
                </dt>
                {/* text-h3, not h2: these are short values in narrow columns,
                    and at h2 the longest one collided with its neighbour. */}
                <dd className="text-h3 text-balance">{fact.value}</dd>
              </div>
            </div>
          </div>
        ))}
      </dl>
    </Section>
  );
}
