import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { Partnership } from "@/components/sections/partnership";
import { Button } from "@/components/ui/button";
import { HeroScroll } from "@/components/ui/hero-scroll";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/ui/service-icon";
import { ctas } from "@/data/navigation";
import { serviceAnchor, whyPramivaReasons } from "@/data/service-pages";
import type { ServicePageContent } from "@/data/service-pages";
import { serviceGroups } from "@/data/services";

export function ServiceGroupPage({ content }: { content: ServicePageContent }) {
  const group = serviceGroups.find((entry) => entry.heading === content.group);
  const services = group?.services ?? [];
  const { hero, overview, included, how, why, faq, cta } = content;

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
        aria-labelledby="service-page-title"
      >
        <HeroScroll>
          <SectionHeading
            id="service-page-title"
            level="h1"
            eyebrow={content.group}
            title={hero.title}
            description={hero.lead}
          />
          <div className="mt-block flex flex-col gap-4 sm:flex-row">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={ctas.heroSecondary.href} variant="outline-inverse">
              {ctas.heroSecondary.label}
            </Button>
          </div>
        </HeroScroll>
      </Section>

      <Section tone="canvas" reveal aria-labelledby="service-overview-title">
        <div className="grid gap-block md:grid-cols-12">
          <SectionHeading
            id="service-overview-title"
            eyebrow={overview.eyebrow}
            title={overview.title}
            className="md:col-span-5"
          />
          <div className="space-y-5 text-lead text-[color:var(--tone-muted)] md:col-span-7">
            {overview.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-copy">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="soft" reveal aria-labelledby="service-included-title">
        <SectionHeading
          id="service-included-title"
          eyebrow={included.eyebrow}
          title={included.title}
        />
        <ul
          className={`mt-section-sm grid gap-x-8 gap-y-10 ${
            services.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {services.map((service) => (
            <li
              key={service.title}
              className="relative border-t-2 border-ink pt-6 transition-colors duration-300 hover:border-brand focus-within:border-brand"
            >
              <ServiceIcon
                name={service.icon}
                className="h-8 w-8 text-accent-text"
              />
              <h3 className="mt-5 text-h3">
                <a
                  href={`#${serviceAnchor(service.title)}`}
                  className="transition-colors duration-200 after:absolute after:inset-0 hover:text-brand"
                >
                  {service.title}
                </a>
              </h3>
              <p className="mt-3 text-sm text-[color:var(--tone-muted)]">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="canvas" reveal aria-label="Service details">
        <div className="space-y-section-sm">
          {services.map((service, index) => {
            const anchor = serviceAnchor(service.title);

            return (
              <section
                key={service.title}
                id={anchor}
                aria-labelledby={`${anchor}-title`}
                className="grid scroll-mt-24 gap-block border-t border-line pt-block md:grid-cols-12"
              >
                <div className="md:col-span-4 lg:col-span-3">
                  <span aria-hidden="true" className="text-h3 text-accent-text">
                    {String(index + 3).padStart(2, "0")}
                  </span>
                  <h3 id={`${anchor}-title`} className="mt-4 text-h2">
                    {service.title}
                  </h3>
                </div>

                <div className="md:col-span-8 lg:col-span-9">
                  <p className="max-w-copy text-lead text-[color:var(--tone-muted)]">
                    {service.description}
                  </p>
                  {service.details ? (
                    <ul className="mt-6 grid gap-x-block gap-y-2 text-sm text-[color:var(--tone-muted)] sm:grid-cols-2">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex gap-2.5">
                          <span aria-hidden="true" className="text-accent-text">
                            —
                          </span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {service.audience ? (
                    <p className="mt-6 max-w-copy border-t border-line pt-4 text-sm text-[color:var(--tone-muted)]">
                      <span className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
                        Who it is for
                      </span>
                      <span className="mt-1 block">{service.audience}</span>
                    </p>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </Section>

      {how ? (
        <Section tone="soft" reveal aria-labelledby="service-how-title">
          <SectionHeading
            id="service-how-title"
            eyebrow={how.eyebrow}
            title={how.title}
          />
          <ol className="mt-section-sm grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {how.steps.map((step, index) => (
              <li
                key={step.label}
                className="border-t-2 border-ink pt-6"
              >
                <span aria-hidden="true" className="text-sm font-semibold text-brand">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-h3">{step.label}</h3>
                <p className="mt-3 text-sm text-[color:var(--tone-muted)]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      <Section tone="ink" reveal aria-labelledby="service-why-title">
        <SectionHeading
          id="service-why-title"
          eyebrow={why.eyebrow}
          title={why.title}
        />
        <ul className="mt-section-sm grid gap-x-8 gap-y-10 md:grid-cols-3">
          {whyPramivaReasons.map((reason) => (
            <li
              key={reason.title}
              className="border-t border-[color:var(--tone-border)] pt-6"
            >
              <h3 className="text-h3">{reason.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--tone-muted)]">
                {reason.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Partnership />

      <Faq
        id="service-faq-title"
        eyebrow={faq.eyebrow}
        title={faq.title}
        items={faq.items}
      />

      <CtaBand id="service-cta-title" {...cta} />
    </main>
  );
}
