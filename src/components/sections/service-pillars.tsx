import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/ui/service-icon";
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
 * AI and Automation is not sold today. The "Next Direction" badge carries that
 * status; the card otherwise matches its siblings — the team chose visual
 * parity (2026-08-31) over the earlier muted treatment.
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

      <ul className="mt-section-sm grid gap-x-8 gap-y-12 md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto] md:gap-y-0">
        {pillars.map((pillar, index) => {
          const items = pillarServices(pillar);
          const href = servicePagePaths[pillar.group] ?? "/services";

          return (
            <li
              key={pillar.group}
              data-stagger
              style={{ "--stagger-index": index + 2 } as React.CSSProperties}
              className="group relative border-t border-ink pt-6 transition-colors duration-300 hover:border-brand focus-within:border-brand md:row-span-4 md:grid md:grid-rows-subgrid"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-accent-text transition-colors duration-200 group-hover:bg-brand/15"
                >
                  <ServiceIcon name={pillar.icon} className="h-6 w-6" />
                </span>

                <div className="flex flex-col items-end gap-2">
                  <span aria-hidden="true" className="text-sm font-semibold text-brand">
                    0{index + 1}
                  </span>

                  {pillar.future ? (
                    <Eyebrow as="span" className="text-right">
                      {services.futureLabel}
                    </Eyebrow>
                  ) : null}
                </div>
              </div>

              <h3 className="mt-5 text-h3">
                <Link
                  href={href}
                  className="transition-colors duration-200 after:absolute after:inset-0 hover:text-brand"
                >
                  {pillar.title}
                </Link>
              </h3>

              <ul className="mt-6 space-y-3 text-sm text-[color:var(--tone-muted)]">
                {items.map(({ title, icon }) => (
                  <li key={title} className="flex items-center gap-3">
                    <ServiceIcon
                      name={icon}
                      className="h-5 w-5 shrink-0 text-accent-text"
                    />
                    <span>{title}</span>
                  </li>
                ))}
              </ul>

              <p
                aria-hidden="true"
                className="mt-6 self-start text-sm font-medium text-brand"
              >
                Learn more{" "}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
