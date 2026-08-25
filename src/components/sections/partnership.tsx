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

      {/*
        Deliberately understated. This is a trust signal, not a feature
        section — the logos should register as "these are real brands" in
        passing, then let the eye move on. Oversized tiles competed with the
        heading above them for attention they do not need.

        The name and sector labels are gone with them. Each mark already
        carries its own name in the artwork, so repeating it underneath was
        duplication, and the sector line was detail nobody reads on a logo
        wall. The heading says what the section means.
      */}
      <ul className="mt-section-sm flex flex-wrap items-center gap-3 sm:gap-4">
        {brands.map((brand, index) => (
          // h-20, not h-18: Tailwind's spacing scale jumps 16 → 20, so h-18
          // generates no rule at all and the tile silently kept its base
          // height at every breakpoint. Verified against the compiled CSS.
          <li
            key={brand.name}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="flex h-16 w-32 items-center justify-center rounded-xl bg-canvas px-4 sm:h-20 sm:w-36"
          >
            {/*
              These marks range from 0.90 to 3.45 in aspect ratio — one is
              near-square, another a long wordmark. Constraining both axes with
              object-contain lets each fill whichever dimension binds first,
              which is what makes a mixed set read as evenly weighted rather
              than one mark looking half the size of the others.
            */}
            <Image
              src={brand.logo.src}
              alt={`${brand.name} logo`}
              width={brand.logo.width}
              height={brand.logo.height}
              className="max-h-10 max-w-full object-contain sm:max-h-11"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
