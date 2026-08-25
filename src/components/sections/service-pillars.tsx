import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/ui/service-icon";
import { homepage } from "@/data/homepage";
import { ctas } from "@/data/navigation";
import { pillars, pillarServices } from "@/data/pillars";
import { serviceGroups } from "@/data/services";

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
 * AI and automation is not sold today. It carries a visible "Future direction"
 * badge and a quieter icon treatment so the layout says so as clearly as the
 * words do. Presenting it as an equal third of the offer would generate
 * enquiries the company cannot fulfil, which is a worse outcome than the card
 * looking less impressive.
 */
export function ServicePillars() {
  const { services } = homepage;

  return (
    <Section tone="canvas" reveal aria-labelledby="home-services-title">
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

      <ul className="mt-section-sm grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {pillars.map((pillar, index) => {
          const items = pillarServices(pillar);
          // Anchor index is derived, not hardcoded: /services builds its group
          // ids from the same array, so reordering there cannot break these.
          const groupIndex = serviceGroups.findIndex(
            (group) => group.heading === pillar.group,
          );
          const href = `/services/#service-group-${groupIndex + 1}`;

          return (
            <li
              key={pillar.group}
              data-stagger
              style={{ "--stagger-index": index + 2 } as React.CSSProperties}
              /* flex + h-full so all three cards end level regardless of how
                 many services each one lists. */
              /*
                Transform and border-colour only. Animating box-shadow on hover
                is the usual way this is done and it repaints the card on every
                frame; a 2px lift is compositor-only and reads the same.
                `motion-safe:` so a reduced-motion visitor gets the colour
                change without the movement.
              */
              className={`relative flex h-full flex-col rounded-2xl border p-7 transition-[border-color,transform] duration-300 focus-within:border-brand/40 motion-safe:hover:-translate-y-1 sm:p-8 ${
                pillar.future
                  ? "border-dashed border-line-strong bg-surface"
                  : "border-line bg-canvas hover:border-brand/40"
              }`}
            >
              <span
                className={`inline-flex size-14 items-center justify-center rounded-full ${
                  pillar.future
                    ? "bg-canvas text-ink-muted"
                    : "bg-brand/8 text-brand"
                }`}
              >
                <ServiceIcon name={pillar.icon} className="size-6" />
              </span>

              {/* The badge sits ABOVE the title, so the status is read before
                  the capability rather than discovered after it. */}
              {pillar.future ? (
                <Eyebrow as="span" className="mt-7 block">
                  {services.futureLabel}
                </Eyebrow>
              ) : null}

              <h3 className={`text-h3 ${pillar.future ? "mt-2" : "mt-7"}`}>
                <Link
                  href={href}
                  className="transition-colors duration-200 after:absolute after:inset-0 after:rounded-2xl hover:text-brand"
                >
                  {pillar.title}
                </Link>
              </h3>

              {/* The approved service titles, verbatim from services.ts. */}
              <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[color:var(--tone-muted)]">
                {items.map((title) => (
                  <li key={title} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-2.5 size-1.5 shrink-0 rounded-full ${
                        pillar.future ? "bg-line-strong" : "bg-accent"
                      }`}
                    />
                    <span>{title}</span>
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
