import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { homepage } from "@/data/homepage";

/** Approved company rationale arranged as four editorial differentiators. */
export function WhyPramiva() {
  const { why } = homepage;

  return (
    <Section
      aria-labelledby="home-why-title"
      containerClassName="grid gap-section-sm lg:grid-cols-12"
    >
      <SectionHeading
        id="home-why-title"
        eyebrow={why.eyebrow}
        title={why.title}
        description={why.description}
        className="lg:col-span-5"
      />

      <ol className="border-t border-line lg:col-span-7">
        {why.items.map((item, index) => (
          <li
            key={item.title}
            className="grid gap-5 border-b border-line py-block sm:grid-cols-12"
          >
            <span
              aria-hidden="true"
              className="text-h3 text-accent-text sm:col-span-2"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="sm:col-span-10">
              <h3 className="text-h2">{item.title}</h3>
              <p className="mt-4 max-w-[55ch] text-ink-muted">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
