import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { privacy } from "@/data/privacy";
import { seo } from "@/data/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(seo.privacy);

export default function PrivacyPage() {
  const { header, updated, sections } = privacy;

  return (
    <main id="main">
      <Section aria-labelledby="privacy-title">
        <SectionHeading
          id="privacy-title"
          level="h1"
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
        />
        <p className="mt-block text-sm text-[color:var(--tone-muted)]">
          {updated}
        </p>
      </Section>

      <Section tone="surface" spacing="compact">
        <div className="max-w-copy space-y-section-sm">
          {sections.map((section) => (
            <section key={section.heading} aria-labelledby={slug(section.heading)}>
              <h2 id={slug(section.heading)} className="text-h3">
                {section.heading}
              </h2>

              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-[color:var(--tone-muted)]"
                >
                  {paragraph}
                </p>
              ))}

              {"groups" in section ? (
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {section.groups.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
                        {group.title}
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="border-t border-[color:var(--tone-border)] pt-3 text-sm text-[color:var(--tone-muted)]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </Section>
    </main>
  );
}

function slug(heading: string) {
  return `privacy-${heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
