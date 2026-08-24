import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/data/site";

/**
 * PHASE 3 PLACEHOLDER — global component verification only.
 *
 * Phase 4 replaces this with the approved homepage. Until then it gives the
 * layout primitives, buttons, navigation, footer, tokens and placeholders a
 * real page on which to be reviewed at every breakpoint.
 */
export default function Home() {
  return (
    <main id="main">
      <Section>
        <p className="text-eyebrow uppercase text-ink-subtle">
          Phase 3 — global components
        </p>

        <h1 className="mt-block text-display">
          Layout system
          <br />
          <span className="text-brand">verification</span>
        </h1>

        <p className="mt-block max-w-[65ch] text-lead text-ink-muted">
          Placeholder page. Confirms the reusable layout, navigation, footer and
          interface primitives before the real homepage is built.
        </p>
        <div className="mt-block flex flex-wrap gap-3">
          <Button href="/contact">Primary action</Button>
          <Button href="/about" variant="secondary">
            Secondary action
          </Button>
          <Button href="/services" variant="ghost">
            Ghost action
          </Button>
        </div>
      </Section>

      <Section tone="surface" spacing="compact" aria-labelledby="type-scale">
        <SectionHeading
          id="type-scale"
          eyebrow="01 — Foundation"
          title="Type scale"
        />
        <div className="mt-block space-y-4 border-t border-line pt-block">
          <p className="text-h1">Heading one</p>
          <p className="text-h2">Heading two</p>
          <p className="text-h3">Heading three</p>
          <p className="text-lead">Lead paragraph</p>
          <p>Body copy at the base size, set at a 1.6 line height.</p>
        </div>
      </Section>

      <Section spacing="compact" aria-labelledby="colour-system">
        <SectionHeading
          id="colour-system"
          eyebrow="02 — Tokens"
          title="Colour system"
        />
        <div className="mt-block grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            { name: "brand", cls: "bg-brand", note: "4.95:1 — AA" },
            {
              name: "brand-deep",
              cls: "bg-brand-deep",
              note: "7.43:1 — AAA",
            },
            {
              name: "accent",
              cls: "bg-accent",
              note: "3.52:1 — decorative only",
            },
            {
              name: "accent-text",
              cls: "bg-accent-text",
              note: "5.70:1 — AA",
            },
            { name: "slate", cls: "bg-slate", note: "10.77:1" },
            { name: "ink", cls: "bg-ink", note: "19.8:1" },
          ].map((swatch) => (
            <div key={swatch.name}>
              <div className={`h-20 rounded-2xl ${swatch.cls}`} />
              <p className="mt-2 text-sm font-medium">{swatch.name}</p>
              <p className="text-sm text-ink-subtle">{swatch.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-block max-w-[65ch] text-sm text-ink-muted">
          <strong className="text-ink">accent</strong> is decorative only. Use{" "}
          <strong className="text-ink">accent-text</strong> when green must carry
          text.
        </p>
      </Section>

      <Section tone="surface" spacing="compact" aria-labelledby="data-layer">
        <SectionHeading
          id="data-layer"
          eyebrow="03 — Content"
          title="Data layer"
        />
        <p className="mt-block max-w-[65ch] text-ink-muted">
          Values below come from <code>src/data/site.ts</code>. Every visible
          placeholder is a question still open with management — that is the
          intended state, not a bug.
        </p>
        <dl className="mt-block space-y-2 text-sm">
          {[
            ["Name", site.name],
            ["Tagline", site.tagline],
            ["Description", site.description],
            ["Email", site.email],
            ["Phone", site.phone],
            ["Address", site.address],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <dt className="w-32 shrink-0 font-medium">{label}</dt>
              <dd className="break-words text-ink-muted">{value}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </main>
  );
}
