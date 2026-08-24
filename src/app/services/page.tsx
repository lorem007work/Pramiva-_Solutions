import { CtaBand } from "@/components/sections/cta-band";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { seo } from "@/data/seo";
import { serviceGroups } from "@/data/services";
import { servicesPage } from "@/data/services-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(seo.services);

/**
 * Services page.
 *
 * Every service title and concise description was approved under Q5 on
 * 2026-08-24. Keep the wording data-led and do not expand it into claims.
 *
 * PRD §5.3 also lists "benefits" and a process block for this page. Benefits
 * are omitted — every benefit line would be an unapproved performance claim.
 * The working model is presented once, on the homepage, rather than repeated.
 */
export default function ServicesPage() {
  const { header, catalogue, cta } = servicesPage;

  return (
    <main id="main">
      <Section
        tone="ink"
        backgroundImage="/images/brand/services-bg.webp"
        aria-labelledby="services-title"
      >
        <SectionHeading
          id="services-title"
          level="h1"
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
        />
      </Section>

      <Section
        tone="surface"
        reveal
        aria-labelledby="services-catalogue-title"
      >
        <SectionHeading
          id="services-catalogue-title"
          eyebrow={catalogue.eyebrow}
          title={catalogue.title}
          description={catalogue.description}
        />

        <div className="mt-section-sm space-y-section-sm">
          {serviceGroups.map((group, groupIndex) => {
            const groupId = `service-group-${groupIndex + 1}`;

            return (
              <section
                key={group.heading}
                aria-labelledby={groupId}
                className="grid gap-block border-t border-line pt-block md:grid-cols-12"
              >
                <div className="md:col-span-4 lg:col-span-3">
                  <span aria-hidden="true" className="text-h3 text-accent-text">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 id={groupId} className="mt-4 text-h2">
                    {group.heading}
                  </h3>
                </div>

                {/*
                  Editorial rows, not a card grid.

                  The groups hold 3, 2 and 1 services. In the previous
                  two-column card grid that left the third card of group 01
                  alone on its own row and "Future direction" sitting beside a
                  large void, so the page read as though a card were missing.

                  Full-width rows cannot go ragged at any group size, and they
                  use the container width the cards were wasting: each
                  description now runs on one or two lines instead of four.
                */}
                <ul className="md:col-span-8 lg:col-span-9">
                  {group.services.map((service) => (
                    <li
                      key={service.title}
                      className="group border-b border-line py-block first:pt-0 last:border-b-0 last:pb-0"
                    >
                      <div className="grid gap-4 md:grid-cols-12">
                        <h4 className="text-h3 transition-colors duration-150 group-hover:text-brand md:col-span-5">
                          {service.title}
                        </h4>
                        <p className="max-w-[65ch] text-[color:var(--tone-muted)] md:col-span-7">
                          {service.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Section>

      <CtaBand id="services-cta-title" {...cta} />
    </main>
  );
}
