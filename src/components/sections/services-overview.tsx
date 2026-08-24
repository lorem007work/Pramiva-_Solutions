import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { homepage } from "@/data/homepage";
import { serviceGroups } from "@/data/services";

/** Service catalogue preview. All commercial copy remains gated by Q5. */
export function ServicesOverview() {
  const { services } = homepage;

  return (
    <Section tone="surface" aria-labelledby="home-services-title">
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

      <div className="mt-section-sm space-y-section-sm">
        {serviceGroups.map((group, groupIndex) => {
          const groupId = `home-service-group-${groupIndex + 1}`;
          const serviceOffset = serviceGroups
            .slice(0, groupIndex)
            .reduce((total, current) => total + current.services.length, 0);

          return (
            <section
              key={group.heading}
              aria-labelledby={groupId}
              className="grid gap-block border-t border-line pt-block md:grid-cols-12"
            >
              <h3 id={groupId} className="text-h3 md:col-span-3">
                {group.heading}
              </h3>

              <ul className="grid gap-4 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
                {group.services.map((service, serviceIndex) => {
                  const number = String(serviceOffset + serviceIndex + 1).padStart(
                    2,
                    "0",
                  );

                  return (
                    <li key={service.title}>
                      <Link
                        href="/services"
                        className="group flex h-full flex-col rounded-2xl border border-line bg-canvas p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-ink-subtle"
                      >
                        <span
                          aria-hidden="true"
                          className="text-eyebrow text-accent-text"
                        >
                          {number}
                        </span>
                        <h4 className="mt-5 text-h3 transition-colors duration-150 group-hover:text-brand">
                          {service.title}
                        </h4>
                        <p className="mt-4 text-sm text-ink-muted">
                          {service.description}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
