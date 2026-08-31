import { Section } from "@/components/ui/section";
import { ServiceIcon } from "@/components/ui/service-icon";
import { site } from "@/data/site";

/**
 * The facts band. Facts instead of a template's fake stat counters — nothing
 * here is a performance claim, and every value reads from site.ts.
 */
export function AtAGlance() {
  const facts = [
    { icon: "calendar", label: "Founded", value: String(site.founded) },
    { icon: "pin", label: "Based in", value: site.location },
    { icon: "globe", label: "Markets", value: "Nepal & international" },
  ];

  return (
    <Section
      tone="canvas"
      spacing="compact"
      reveal
      aria-label="Company at a glance"
    >
      <dl className="grid grid-cols-3 gap-3 sm:gap-8">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-4 sm:text-left"
          >
            <span
              aria-hidden="true"
              className="ground ground-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12"
            >
              <ServiceIcon
                name={fact.icon}
                className="h-5 w-5 text-accent-text sm:h-6 sm:w-6"
              />
            </span>
            <div>
              <dt className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
                {fact.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-balance text-brand-deep sm:text-h3">
                {fact.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </Section>
  );
}
