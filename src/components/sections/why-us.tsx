import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/ui/service-icon";
import { pendingBenefits } from "@/data/pending";

/**
 * Differentiators — SCAFFOLD. Needs approved wording.
 *
 * Every line in a section like this asserts that the company does something
 * better, faster or more reliably than an alternative. Those are claims about
 * the business, and they are management's to make, not a developer's to draft.
 *
 * The icons are reused from the service set rather than new ones: until the
 * copy exists there is nothing to draw a shape for, and inventing icons around
 * imagined benefits would bake in assumptions about what the copy will say.
 */
export function WhyUs({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Section reveal aria-labelledby="why-title">
      <SectionHeading id="why-title" eyebrow={eyebrow} title={title} />

      <ul className="mt-section-sm grid gap-6 md:grid-cols-3">
        {pendingBenefits.map((item, index) => (
          <li
            key={item.title}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="rounded-2xl border border-line p-8"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand/8 text-brand">
              <ServiceIcon name={item.icon} className="size-6" />
            </span>
            <h3 className="mt-6 text-h3">{item.title}</h3>
            <p className="mt-3 text-[color:var(--tone-muted)]">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
