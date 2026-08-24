import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { brands, principalClient } from "@/data/clients";

type ClientsProps = {
  /** Unique per page — this is the labelled region of its own section. */
  id: string;
  eyebrow: string;
  title: string;
  /** `compact` names the brands only; `full` describes each one. */
  variant?: "full" | "compact";
  /** Set by the caller so adjacent sections never share a background. */
  tone?: "canvas" | "surface";
};

/**
 * Principal client and the brands behind it.
 *
 * This component remains gated and is not rendered while the client data array
 * is empty. Written consent is required before names or descriptions return.
 */
export function Clients({
  id,
  eyebrow,
  title,
  variant = "full",
  tone = "canvas",
}: ClientsProps) {
  const isFull = variant === "full";

  return (
    <Section tone={tone} reveal aria-labelledby={id}>
      <SectionHeading
        id={id}
        eyebrow={eyebrow}
        title={title}
        description={principalClient.relationship}
      />

      {isFull ? (
        <p className="mt-block max-w-[65ch] text-[color:var(--tone-muted)]">
          {principalClient.summary}
        </p>
      ) : null}

      <div className="mt-section-sm border-t border-line pt-block">
        <h3 className="text-h3">{principalClient.name}</h3>

        {isFull ? (
          <ul className="mt-block grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand, index) => (
              /* Static cards — no hover lift, because nothing here is clickable. */
              <li
                key={brand.name}
                className="rounded-2xl border border-line p-6"
              >
                <span aria-hidden="true" className="text-eyebrow text-accent-text">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-5 text-h3">{brand.name}</h4>
                <p className="mt-4 text-sm text-[color:var(--tone-muted)]">
                  {brand.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[color:var(--tone-muted)]">
              {brands.map((brand) => (
                <li key={brand.name} className="text-lead">
                  {brand.name}
                </li>
              ))}
            </ul>

            <div className="mt-block">
              <Button href="/about" variant="secondary">
                More about the company
              </Button>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
