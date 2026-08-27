import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { homepage } from "@/data/homepage";
import { withNonBreakingHyphens } from "@/lib/utils";

/**
 * The vision statement.
 *
 * The sentence is CONFIRMED and appears verbatim (site.vision). The only
 * transformation is withNonBreakingHyphens, which stops "real-world" being
 * split across two lines by its own hyphen — see lib/utils.ts. It changes no
 * word, no punctuation and no character the reader can see, and the approved
 * string in src/data keeps its ordinary hyphen.
 *
 * The same sentence, and the same treatment, also appear on /about.
 */
export function PositioningStatement() {
  const { positioning } = homepage;

  return (
    <Section
      /*
        Deep brand teal. The hero is white, which frees this band to carry the
        brand colour at full bleed — it is the logo's own teal and the page
        needs one place where that reads at scale.
      */
      tone="brand"
      backgroundImage="/images/brand/vision-bg.webp"
      backgroundPosition="left center"
      reveal
      aria-labelledby="home-positioning-title"
      className="overflow-hidden"
      containerClassName="grid md:grid-cols-12"
    >
      {/*
        Eyebrow and statement are ONE block now.

        They were previously separate grid children — the label pinned to
        column 1 and the statement starting at column 4 — which left the
        eyebrow floating roughly 300px from the text it labels, marooned in the
        middle of the background artwork. A label that far from its subject
        stops reading as a label.

        The block starts at column 5 so the arcs in the artwork keep the left
        third of the band to themselves, uninterrupted. That is the composition
        the background was drawn for: artwork one side, type the other.
      */}
      <div
        data-stagger
        style={{ "--stagger-index": 0 } as React.CSSProperties}
        className="md:col-span-9 md:col-start-4"
      >
        <Eyebrow>{positioning.eyebrow}</Eyebrow>

        <h2
          id="home-positioning-title"
          className="mt-6 text-statement text-balance"
        >
          {withNonBreakingHyphens(positioning.statement)}
        </h2>
      </div>
    </Section>
  );
}
