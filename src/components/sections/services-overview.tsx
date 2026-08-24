import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { homepage } from "@/data/homepage";
import { serviceGroups } from "@/data/services";

/**
 * Service catalogue preview. Titles and concise descriptions are approved.
 *
 * Layout note. This previously put each group heading in a 3-of-12 column with
 * its cards in the remaining 9, split three ways — so every card was about a
 * quarter of the container and the copy inside was cramped. Worse, the groups
 * hold 3, 2 and 1 services, so in a three-column grid the last row left a
 * single card stranded beside two empty cells.
 *
 * The six services are now one flat grid. Six items fill exactly two rows of
 * three with nothing ragged, and each card gets a full third of the container
 * instead of a quarter of three quarters. The grouping is not lost — it moves
 * onto the card as a label, which keeps the information while letting the grid
 * stay even.
 */
export function ServicesOverview() {
  const { services } = homepage;

  // Flatten once, carrying the group name onto each service.
  const allServices = serviceGroups.flatMap((group) =>
    group.services.map((service) => ({ ...service, group: group.heading })),
  );

  return (
    <Section tone="surface" reveal aria-labelledby="home-services-title">
      <div className="grid items-end gap-block lg:grid-cols-12">
        <SectionHeading
          id="home-services-title"
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
          className="lg:col-span-8"
        />

        <div className="lg:col-span-4 lg:justify-self-end">
          <Button href="/services" variant="secondary">
            {services.ctaLabel}
          </Button>
        </div>
      </div>

      <ul className="mt-section-sm grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allServices.map((service, index) => {
          const number = String(index + 1).padStart(2, "0");

          return (
            <li
              key={service.title}
              data-stagger
              style={{ "--stagger-index": index } as React.CSSProperties}
            >
              <Link
                href="/services"
                className="group flex h-full flex-col rounded-2xl border border-line bg-canvas p-8 transition-[border-color,transform] duration-300 hover:border-ink-subtle motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.99]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span aria-hidden="true" className="text-eyebrow text-accent-text">
                    {number}
                  </span>
                  {/* The group name, kept as quiet metadata so the service
                      title stays the loudest thing in the card. */}
                  <span className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
                    {service.group}
                  </span>
                </div>

                <h3 className="mt-8 text-h3 transition-colors duration-150 group-hover:text-brand">
                  {service.title}
                </h3>

                <p className="mt-4 text-[color:var(--tone-muted)]">{service.description}</p>

                {/* Pushes the rule to the card floor so every card ends on the
                    same line regardless of description length. */}
                <span
                  aria-hidden="true"
                  className="mt-auto block h-px w-full bg-line transition-colors duration-300 group-hover:bg-accent"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
