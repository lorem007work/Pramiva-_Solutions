import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { Partnership } from "@/components/sections/partnership";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { seo } from "@/data/seo";
import { servicePagePaths } from "@/data/service-pages";
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
      <link
        rel="preload"
        as="image"
        href="/images/brand/services-bg.webp"
        fetchPriority="high"
      />
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
                  {servicePagePaths[group.heading] ? (
                    <Link
                      href={servicePagePaths[group.heading]}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
                    >
                      More on this service
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                </div>

                {/*
                  Editorial rows, not a card grid.

                  The groups hold 3, 2 and 1 services. In the previous
                  two-column card grid that left the third card of group 01
                  alone on its own row and "Next Direction" sitting beside a
                  large void, so the page read as though a card were missing.

                  Full-width rows cannot go ragged at any group size, and they
                  use the container width the cards were wasting: each
                  description now runs on one or two lines instead of four.
                */}
                <ul className="md:col-span-8 lg:col-span-9">
                  {group.services.map((service) => (
                    <li
                      key={service.title}
                      className="border-b border-line py-block first:pt-0 last:border-b-0 last:pb-0"
                    >
                      <div className="grid gap-4 md:grid-cols-12">
                        <h4 className="text-h3 md:col-span-5">
                          {service.title}
                        </h4>
                        <div className="md:col-span-7">
                          <p className="max-w-copy text-[color:var(--tone-muted)]">
                            {service.description}
                          </p>
                          {service.details ? (
                            <ul className="mt-5 grid gap-x-block gap-y-2 text-sm text-[color:var(--tone-muted)] sm:grid-cols-2">
                              {service.details.map((detail) => (
                                <li key={detail} className="flex gap-2.5">
                                  <span
                                    aria-hidden="true"
                                    className="text-accent-text"
                                  >
                                    —
                                  </span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          {service.audience ? (
                            <p className="mt-5 max-w-copy border-t border-[color:var(--tone-border)] pt-4 text-sm text-[color:var(--tone-muted)]">
                              <span className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
                                {catalogue.audienceLabel}
                              </span>
                              <span className="mt-1 block">
                                {service.audience}
                              </span>
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Section>

      <Partnership />

      <CtaBand id="services-cta-title" {...cta} />
    </main>
  );
}
