import { ContactForm } from "@/components/forms/contact-form";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { contact } from "@/data/contact";
import { seo } from "@/data/seo";
import { site } from "@/data/site";
import { isPlaceholder } from "@/lib/utils";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(seo.contact);

/**
 * Contact page. The form posts to the cPanel PHP handler because this project
 * exports static HTML and has no Next.js server in production.
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
        reveal
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <section
          aria-labelledby="contact-form-title"
          className="rounded-2xl border border-line bg-canvas p-8 lg:col-span-7"
        >
          <h2 id="contact-form-title" className="text-h2">
            {form.heading}
          </h2>
          <p className="mt-4 max-w-copy text-[color:var(--tone-muted)]">
            {form.introduction}
          </p>

          <div className="mt-block">
            <ContactForm
              copy={form}
              fallbackEmail={
                isPlaceholder(site.email) ? undefined : site.email
              }
            />
          </div>
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
              <dt className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
                {details.labels.email}
              </dt>
              <dd className="mt-2 break-words">
                {isPlaceholder(site.email) ? (
                  <span className="text-[color:var(--tone-muted)]">{site.email}</span>
                ) : (
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-11 items-center text-ink transition-colors duration-150 hover:text-brand"
                  >
                    {site.email}
                  </a>
                )}
              </dd>
            </div>

            {/* Omitted while unanswered — see the note in layout/footer.tsx. */}
            {!isPlaceholder(site.phone) && (
              <div className="border-t border-line pt-4">
                <dt className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
                  {details.labels.phone}
                </dt>
                <dd className="mt-2 break-words">
                  <a
                    href={`tel:${site.phone}`}
                    className="inline-flex min-h-11 items-center text-ink transition-colors duration-150 hover:text-brand"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
            )}

            <div className="border-t border-line pt-4">
              <dt className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
                {details.labels.address}
              </dt>
              <dd className="mt-2 break-words text-[color:var(--tone-muted)]">
                {site.address}
                {/*
                  A link, deliberately not an embedded map. An iframe would pull
                  third-party Google cookies into the page, which creates a
                  consent obligation for any EU visitor and costs a request the
                  static export cannot optimise away. The link gives a visitor
                  the same directions with none of that.
                */}
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-11 items-center text-brand underline-offset-4 hover:underline"
                >
                  View on map
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </Section>
    </main>
  );
}
