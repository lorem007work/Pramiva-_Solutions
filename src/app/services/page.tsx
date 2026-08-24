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
      <Section aria-labelledby="services-title">
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

                <ul className="grid gap-block sm:grid-cols-2 md:col-span-8 lg:col-span-9">
                  {group.services.map((service) => (
                    <li
                      key={service.title}
                      className="rounded-2xl border border-line bg-canvas p-8"
                    >
                      <h4 className="text-h3">{service.title}</h4>
                      <p className="mt-4 max-w-[65ch] text-ink-muted">
                        {service.description}
                      </p>
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
