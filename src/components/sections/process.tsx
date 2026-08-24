import { Section } from "@/components/ui/section";
import { homepage } from "@/data/homepage";

/** Assumed four-step working model, pending management review. */
export function Process() {
  const { process } = homepage;

  return (
    <Section tone="ink" aria-labelledby="home-process-title">
      <div className="grid gap-block lg:grid-cols-12">
        <p className="text-eyebrow uppercase text-line-strong lg:col-span-3">
          {process.eyebrow}
        </p>

        <div className="lg:col-span-8 lg:col-start-5">
          <h2 id="home-process-title" className="max-w-4xl text-h1">
            {process.title}
          </h2>
          <p className="mt-block max-w-[65ch] text-lead text-canvas/70">
            {process.description}
          </p>
        </div>
      </div>

      <ol className="mt-section-sm grid gap-block md:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((step, index) => (
          <li key={step.title} className="border-t border-slate pt-block">
            <span aria-hidden="true" className="text-h1 text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-block text-h3">{step.title}</h3>
            <p className="mt-4 text-canvas/70">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
