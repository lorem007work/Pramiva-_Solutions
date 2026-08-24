import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { homepage } from "@/data/homepage";
import { site } from "@/data/site";

/** High-level company introduction. Confirmed facts only — see data/homepage.ts. */
export function CompanyIntro() {
  const { company } = homepage;

  return (
    <Section
      tone="surface"
      aria-labelledby="home-company-title"
      containerClassName="grid gap-section-sm lg:grid-cols-12"
    >
      <div className="lg:col-span-5">
        <p className="text-eyebrow uppercase text-ink-subtle">
          {company.eyebrow}
        </p>
        <h2 id="home-company-title" className="mt-4 max-w-2xl text-h1">
          {company.title}
        </h2>

        <p className="mt-section-sm border-l-2 border-accent pl-block text-h3 text-accent-text">
          {site.tagline}
        </p>
      </div>

      <div className="border-t border-line-strong pt-block lg:col-span-6 lg:col-start-7">
        <div className="space-y-6">
          {company.description.map((paragraph, index) => (
            <p
              key={paragraph}
              className={index === 0 ? "text-lead" : "text-ink-muted"}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <Button href="/about" variant="secondary" className="mt-block">
          {company.ctaLabel}
          <span aria-hidden="true">↗</span>
        </Button>
      </div>
    </Section>
  );
}
