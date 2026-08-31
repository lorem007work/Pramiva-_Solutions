import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ServicePageFaqItem } from "@/data/service-pages";

type FaqProps = {
  id: string;
  eyebrow: string;
  title: string;
  items: readonly ServicePageFaqItem[];
  tone?: "canvas" | "soft";
};

export function Faq({ id, eyebrow, title, items, tone = "soft" }: FaqProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section tone={tone} reveal aria-labelledby={id}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-block md:grid-cols-12">
        <SectionHeading
          id={id}
          eyebrow={eyebrow}
          title={title}
          className="md:col-span-4"
        />

        <div className="border-t border-[color:var(--tone-border)] md:col-span-8">
          {items.map((item) => (
            <details
              key={item.question}
              className="group border-b border-[color:var(--tone-border)]"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-lg text-accent-text transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="max-w-copy pb-5 text-[color:var(--tone-muted)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
