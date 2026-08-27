import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { about } from "@/data/about";
import { disciplines } from "@/data/disciplines";

export function Disciplines() {
  return (
    <Section
      tone="soft"
      reveal
      aria-labelledby="about-disciplines-title"
      containerClassName="grid gap-section-sm lg:grid-cols-12"
    >
      <div
        data-stagger
        style={{ "--stagger-index": 0 } as React.CSSProperties}
        className="lg:col-span-5"
      >
        <Eyebrow>{about.disciplines.eyebrow}</Eyebrow>
        <h2 id="about-disciplines-title" className="mt-4 max-w-2xl text-h1">
          {about.disciplines.title}
        </h2>
        <p className="mt-section-sm max-w-copy text-lead text-[color:var(--tone-muted)]">
          {about.disciplines.description}
        </p>
      </div>

      <dl className="grid gap-x-block gap-y-block border-t border-[color:var(--tone-border)] pt-block sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
        {disciplines.map((discipline, index) => (
          <div
            key={discipline.title}
            data-stagger
            style={{ "--stagger-index": index + 1 } as React.CSSProperties}
          >
            <dt className="text-h3">{discipline.title}</dt>
            <dd className="mt-2 max-w-copy text-[color:var(--tone-muted)]">
              {discipline.description}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
