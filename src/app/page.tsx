import { site } from "@/data/site";

/**
 * PHASE 2 PLACEHOLDER — foundation verification only.
 *
 * This is not the homepage. It exists to prove the design tokens, fluid type
 * scale, fonts and static export all work before Phase 3 builds real
 * components on top of them. Phase 4 replaces it entirely.
 */
export default function Home() {
  return (
    <main id="main" className="mx-auto w-full max-w-page px-5 py-section md:px-8 lg:px-16">
      <p className="text-eyebrow uppercase text-ink-subtle">
        Phase 2 — foundation
      </p>

      <h1 className="mt-block text-display">
        Design system
        <br />
        <span className="text-brand">verification</span>
      </h1>

      <p className="mt-block max-w-[65ch] text-lead text-ink-muted">
        Placeholder page. Confirms tokens, the fluid type scale and the static
        export are working before real components are built on top.
      </p>

      <section className="mt-section-sm">
        <h2 className="text-h2">Type scale</h2>
        <div className="mt-block space-y-4 border-t border-line pt-block">
          <p className="text-h1">Heading one</p>
          <p className="text-h2">Heading two</p>
          <p className="text-h3">Heading three</p>
          <p className="text-lead">Lead paragraph</p>
          <p>Body copy at the base size, set at a 1.6 line height.</p>
        </div>
      </section>

      <section className="mt-section-sm">
        <h2 className="text-h2">Colour</h2>
        <div className="mt-block grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            { name: "brand", cls: "bg-brand", note: "4.95:1 — AA" },
            { name: "brand-deep", cls: "bg-brand-deep", note: "7.43:1 — AAA" },
            { name: "accent", cls: "bg-accent", note: "3.52:1 — decorative only" },
            { name: "accent-text", cls: "bg-accent-text", note: "5.70:1 — AA" },
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
          <strong className="text-ink">accent</strong> is 3.52:1 on white — it
          fails WCAG AA for text, and white text on it fails too. Decorative use
          only. Use <strong className="text-ink">accent-text</strong> when green
          must carry text.
        </p>
      </section>

      <section className="mt-section-sm border-t border-line pt-block">
        <h2 className="text-h2">Data layer</h2>
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
              <dd className="text-ink-muted">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
