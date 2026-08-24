import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { contact } from "@/data/contact";
import { seo } from "@/data/seo";
import { site } from "@/data/site";
import { isPlaceholder } from "@/lib/utils";

export const metadata: Metadata = {
  title: seo.contact.title,
  description: seo.contact.description,
};

/**
 * Contact page — layout and copy structure only.
 *
 * The enquiry form is Phase 7: it needs `public/api/contact.php`, shared
 * validation and a confirmed destination inbox (Q10). Its space is reserved
 * with a visible placeholder rather than inert inputs, because a form that
 * accepts a submission and drops it is worse than a form that is absent.
 *
 * No closing CTA band here: the site's single primary action points at this
 * page, and a button linking to the page you are already on is noise.
 */
export default function ContactPage() {
  const { header, form, details } = contact;

  return (
    <main id="main">
      <Section aria-labelledby="contact-title">
        <SectionHeading
          id="contact-title"
          level="h1"
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
        />
      </Section>

      <Section
        tone="surface"
        spacing="compact"
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <section
          aria-labelledby="contact-form-title"
          className="rounded-2xl border border-line bg-canvas p-8 lg:col-span-7"
        >
          <h2 id="contact-form-title" className="text-h2">
            {form.heading}
          </h2>
          <p className="mt-block max-w-[65ch] text-ink-muted">
            {form.placeholder}
          </p>
        </section>

        <section
          aria-labelledby="contact-details-title"
          className="lg:col-span-4 lg:col-start-9"
        >
          <h2 id="contact-details-title" className="text-h3">
            {details.heading}
          </h2>

          <dl className="mt-block space-y-6">
            <div className="border-t border-line pt-4">
              <dt className="text-eyebrow uppercase text-ink-subtle">
                {details.labels.email}
              </dt>
              <dd className="mt-2 break-words">
                {isPlaceholder(site.email) ? (
                  <span className="text-ink-muted">{site.email}</span>
                ) : (
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink transition-colors duration-150 hover:text-brand"
                  >
                    {site.email}
                  </a>
                )}
              </dd>
            </div>

            <div className="border-t border-line pt-4">
              <dt className="text-eyebrow uppercase text-ink-subtle">
                {details.labels.phone}
              </dt>
              <dd className="mt-2 break-words">
                {isPlaceholder(site.phone) ? (
                  <span className="text-ink-muted">{site.phone}</span>
                ) : (
                  <a
                    href={`tel:${site.phone}`}
                    className="text-ink transition-colors duration-150 hover:text-brand"
                  >
                    {site.phone}
                  </a>
                )}
              </dd>
            </div>

            <div className="border-t border-line pt-4">
              <dt className="text-eyebrow uppercase text-ink-subtle">
                {details.labels.address}
              </dt>
              <dd className="mt-2 break-words text-ink-muted">
                {site.address}
              </dd>
            </div>
          </dl>
        </section>
      </Section>
    </main>
  );
}
