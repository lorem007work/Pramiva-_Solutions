import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { pendingLogos } from "@/data/pending";

/**
 * Client logo wall — SCAFFOLD. Blocked on Q24.
 *
 * Tiles are deliberately empty. Publishing the real marks needs written
 * consent from both management and the client, and several of those brands
 * trade as local Australian businesses — naming them here states publicly that
 * their operations run from Nepal.
 *
 * The tiles also carry no <img>: dropping in a real logo later should be a
 * data change, and an empty <img> with a broken src is worse than a box.
 */
export function LogoWall({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Section tone="surface" reveal aria-labelledby="logos-title">
      <SectionHeading id="logos-title" eyebrow={eyebrow} title={title} />

      <ul className="mt-section-sm grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {pendingLogos.map((logo, index) => (
          <li
            key={logo.id}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="flex aspect-[3/2] items-center justify-center rounded-xl border border-dashed border-line-strong bg-canvas p-4 text-center"
          >
            <span className="text-xs text-[color:var(--tone-eyebrow)]">
              {logo.label}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
