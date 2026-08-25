import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { brands } from "@/data/brands";
import { partnership } from "@/data/partnership";

/**
 * Named partner brands — Q24 Option B, confirmed 2026-08-25.
 *
 * Previously shipped as anonymous sector pills; upgraded once management
 * confirmed SNS itself had agreed in writing to being named, not just an
 * internal instruction. See data/brands.ts for the fuller record and the
 * still-open request for a written citation.
 *
 * Logos sit in plain white tiles rather than on the section's dark ground.
 * Most were supplied on white or near-white backgrounds; compositing them
 * directly onto ink would show a visible box around every mark except the two
 * with real transparency. A consistent white card is the same treatment every
 * "as seen in" / client-logo pattern uses for exactly this reason, and it
 * reads as intentional rather than as a background mismatch.
 *
 * Five tiles, not six: no logo exists yet for the sixth brand mentioned in the
 * source material. Nothing fills the gap — the wall shows what was supplied.
 */
export function Partnership() {
  return (
    <Section tone="ink" reveal aria-labelledby="partnership-title">
      <SectionHeading
        id="partnership-title"
        eyebrow={partnership.eyebrow}
        title={partnership.title}
        description={partnership.description}
        className="max-w-3xl"
      />

      <ul className="mt-section-sm grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {brands.map((brand, index) => (
          <li
            key={brand.name}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="flex flex-col items-center gap-4 rounded-2xl bg-canvas p-6"
          >
            {/*
              These marks range from 0.90 to 3.45 in aspect ratio — one is
              nearly square, another is a long wordmark. Capping height alone
              left the tall one looking half the size of the wide ones, so the
              box constrains both axes and object-contain lets each mark fill
              whichever dimension binds first. That is what makes a mixed set
              of logos read as evenly weighted.
            */}
            <div className="flex h-20 w-full items-center justify-center">
              <Image
                src={brand.logo.src}
                alt={`${brand.name} logo`}
                width={brand.logo.width}
                height={brand.logo.height}
                className="max-h-20 max-w-full object-contain"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-ink">{brand.name}</p>
              <p className="mt-0.5 text-xs text-ink-subtle">{brand.sector}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
