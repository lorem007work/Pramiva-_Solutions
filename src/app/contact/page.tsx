import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/data/about";
import { contact } from "@/data/contact";
import { serviceGroups } from "@/data/services";
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
  const { header, form, details, enquiry } = contact;
  const photo = about.workspace.photos.find((p) => p.src === enquiry.photoSrc);
  if (!photo) throw new Error(`ContactPage: no photo matches ${enquiry.photoSrc}`);

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
          data-stagger
          style={{ "--stagger-index": 0 } as React.CSSProperties}
          className="rounded-2xl border border-line bg-canvas p-block lg:col-span-7"
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
          data-stagger
          style={{ "--stagger-index": 1 } as React.CSSProperties}
          className="lg:col-span-4 lg:col-start-9"
        >
          <h2 id="contact-details-title" className="text-h3">
            {details.heading}
          </h2>

          <dl className="mt-block grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="border-t border-line-strong pt-5">
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

            <div className="border-t border-line-strong pt-5">
              <dt className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
                {details.labels.address}
              </dt>
              <dd className="mt-2 text-[color:var(--tone-muted)]">
                <span className="block break-words">{site.address}</span>
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
                  className="mt-1 inline-flex min-h-11 items-center text-brand-deep underline-offset-4 hover:underline"
                >
                  {details.mapLabel}
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </Section>

      <Section
        tone="soft"
        reveal
        aria-labelledby="contact-enquiry-title"
        containerClassName="grid gap-section-sm lg:grid-cols-12"
      >
        <div
          data-stagger
          style={{ "--stagger-index": 0 } as React.CSSProperties}
          className="lg:col-span-5"
        >
          <Eyebrow>{enquiry.eyebrow}</Eyebrow>
          <h2 id="contact-enquiry-title" className="mt-4 max-w-2xl text-h1">
            {enquiry.title}
          </h2>
          <p className="mt-section-sm max-w-copy text-lead text-[color:var(--tone-muted)]">
            {enquiry.description}
          </p>

          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="mt-section-sm w-full rounded-2xl border border-[color:var(--tone-border)]"
          />
        </div>

        <div className="border-t border-[color:var(--tone-border)] pt-block lg:col-span-6 lg:col-start-7">
          <dl className="space-y-6">
            {enquiry.points.map((point, index) => (
              <div
                key={point.title}
                data-stagger
                style={{ "--stagger-index": index + 1 } as React.CSSProperties}
              >
                <dt className="text-h3">{point.title}</dt>
                <dd className="mt-2 max-w-copy text-[color:var(--tone-muted)]">
                  {point.description}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-section-sm border-t border-[color:var(--tone-border)] pt-block text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
            {enquiry.areasLabel}
          </h3>
          <ul className="mt-5 grid gap-x-block gap-y-2.5 text-[color:var(--tone-muted)] sm:grid-cols-2">
            {serviceGroups.flatMap((group) => group.services).map((service, index) => (
              <li
                key={service.title}
                data-stagger
                style={{ "--stagger-index": index + 4 } as React.CSSProperties}
                className="flex gap-2.5"
              >
                <span aria-hidden="true" className="text-accent-text">
                  —
                </span>
                <span className="max-w-copy">{service.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}
