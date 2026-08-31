import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { homepage } from "@/data/homepage";
import { ctas } from "@/data/navigation";
import { pillars, pillarServices } from "@/data/pillars";
import { servicePagePaths } from "@/data/service-pages";

/**
 * Three capability pillars, replacing six equal service cards.
 *
 * WHY
 *
 * Six cards was the right amount of information in the wrong place. On a phone
 * they ran to roughly a third of the total page height, and a visitor deciding
 * whether this company is relevant to them had to read six descriptions to
 * find out. Three groups answer that in one screen. The six full descriptions
 * still exist, on /services, where someone who has already decided the company
 * is relevant goes to compare them.
 *
 * WHAT EACH CARD SAYS
 *
 * Category, then the names of the services inside it. No summarising blurb —
 * see data/pillars.ts. Writing "marketing that drives growth" here would be
 * inventing a claim, and listing the actual service names is both safer and
 * more useful: a visitor looking for paid advertising can see the words "paid
 * advertising" rather than a sentence about outcomes.
 *
 * THE THIRD CARD
 *
 * AI and Automation is not sold today. It carries a visible "Next Direction"
 * badge and a quieter icon treatment so the layout says so as clearly as the
 * words do. Presenting it as an equal third of the offer would generate
 * enquiries the company cannot fulfil, which is a worse outcome than the card
 * looking less impressive.
 */
export function ServicePillars() {
  const { services } = homepage;

  return (
    <Section tone="soft" reveal aria-labelledby="home-services-title">
      <div className="grid items-end gap-block lg:grid-cols-12">
        <SectionHeading
          id="home-services-title"
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
          className="lg:col-span-8"
          stagger={0}
        />
        <div
          data-stagger
          style={{ "--stagger-index": 1 } as React.CSSProperties}
          className="lg:col-span-4 lg:justify-self-end"
        >
          <Button href={ctas.services.href} variant="secondary">
            {ctas.services.label}
          </Button>
        </div>
      </div>

      <ul className="mt-section-sm grid gap-x-8 gap-y-12 md:grid-cols-3 md:grid-rows-[auto_auto_auto] md:gap-y-0">
        {pillars.map((pillar, index) => {
          const items = pillarServices(pillar);
          const href = servicePagePaths[pillar.group] ?? "/services";

          return (
            <li
              key={pillar.group}
              data-stagger
              style={{ "--stagger-index": index + 2 } as React.CSSProperties}
              className={`relative border-t-2 pt-6 transition-colors duration-300 md:row-span-3 md:grid md:grid-rows-subgrid ${
                pillar.future
                  ? "border-line-strong"
                  : "border-ink hover:border-brand focus-within:border-brand"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span
                  aria-hidden="true"
                  className={`text-sm font-semibold ${
                    pillar.future
                      ? "text-[color:var(--tone-eyebrow)]"
                      : "text-brand"
                  }`}
                >
                  0{index + 1}
                </span>

                {pillar.future ? (
                  <Eyebrow as="span" className="text-right">
                    {services.futureLabel}
                  </Eyebrow>
                ) : null}
              </div>

              <h3 className="mt-5 text-h3">
                <Link
                  href={href}
                  className="transition-colors duration-200 after:absolute after:inset-0 hover:text-brand"
                >
                  {pillar.title}
                </Link>
              </h3>

              {/* Approved service titles and descriptions, verbatim from services.ts. */}
              <ul className="mt-6 divide-y divide-[color:var(--tone-border)] border-t border-[color:var(--tone-border)] text-sm text-[color:var(--tone-muted)]">
                {items.map(({ title, description }) => (
                  <li key={title} className="py-3">
                    <span className="block font-medium text-ink">{title}</span>
                    <span className="mt-1 block">{description}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
