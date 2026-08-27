import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { about } from "@/data/about";
import { values } from "@/data/values";

export function Values() {
  return (
    <Section
      tone="surface"
      reveal
      aria-labelledby="about-values-title"
      containerClassName="grid gap-section-sm lg:grid-cols-12"
    >
      <div
        data-stagger
        style={{ "--stagger-index": 0 } as React.CSSProperties}
        className="lg:col-span-5"
      >
        <Eyebrow>{about.values.eyebrow}</Eyebrow>
        <h2 id="about-values-title" className="mt-4 max-w-2xl text-h1">
          {about.values.title}
        </h2>
      </div>

      <ul className="grid gap-4 border-t border-[color:var(--tone-border)] pt-block sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
        {values.map((value, index) => (
          <li
            key={value.name}
            data-stagger
            style={{ "--stagger-index": index + 1 } as React.CSSProperties}
            className="rounded-2xl border border-line bg-canvas p-block"
          >
            <p aria-hidden="true" className="text-eyebrow text-accent-text">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-h3">{value.name}</h3>
            <p className="mt-2 max-w-copy text-[color:var(--tone-muted)]">
              {value.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
