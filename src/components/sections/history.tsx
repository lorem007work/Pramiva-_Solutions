import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { about } from "@/data/about";

export function History() {
  const { history } = about;

  return (
    <Section
      tone="soft"
      reveal
      aria-labelledby="about-history-title"
      containerClassName="grid gap-section-sm lg:grid-cols-12"
    >
      <div
        data-stagger
        style={{ "--stagger-index": 0 } as React.CSSProperties}
        className="lg:col-span-5"
      >
        <Eyebrow>{history.eyebrow}</Eyebrow>
        <h2 id="about-history-title" className="mt-4 max-w-2xl text-h1">
          {history.title}
        </h2>
      </div>

      <div className="space-y-6 border-t border-[color:var(--tone-border)] pt-block lg:col-span-6 lg:col-start-7">
        {history.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            data-stagger
            style={{ "--stagger-index": index + 1 } as React.CSSProperties}
            className={
              index === 0
                ? "max-w-lead text-lead"
                : "max-w-copy text-[color:var(--tone-muted)]"
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
