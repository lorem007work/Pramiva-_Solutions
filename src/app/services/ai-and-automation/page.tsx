import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroScroll } from "@/components/ui/hero-scroll";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { nextDirectionPage } from "@/data/next-direction";
import { seo } from "@/data/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(seo.servicesAiAutomation);

export default function AiAndAutomationPage() {
  const { hero, sections, faq, cta } = nextDirectionPage;

  return (
    <main id="main">
      <Section
        tone="ink"
        backgroundImage="/images/brand/vision-bg.webp"
        aria-labelledby="next-direction-title"
      >
        <HeroScroll>
          <SectionHeading
            id="next-direction-title"
            level="h1"
            eyebrow={hero.eyebrow}
            title={hero.title}
            description={hero.lead}
          />
        </HeroScroll>
      </Section>

      {sections.map((section, index) => {
        const headingId = `next-direction-section-${index + 1}`;

        return (
          <Section
            key={section.title}
            tone={index % 2 === 0 ? "canvas" : "soft"}
            reveal
            aria-labelledby={headingId}
          >
            <div className="grid gap-block md:grid-cols-12">
              <SectionHeading
                id={headingId}
                eyebrow={section.eyebrow}
                title={section.title}
                className="md:col-span-5"
              />
              <div className="space-y-5 text-lead text-[color:var(--tone-muted)] md:col-span-7">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Section>
        );
      })}

      <Faq
        id="next-direction-faq-title"
        eyebrow={faq.eyebrow}
        title={faq.title}
        items={faq.items}
      />

      <CtaBand id="next-direction-cta-title" {...cta} />
    </main>
  );
}
