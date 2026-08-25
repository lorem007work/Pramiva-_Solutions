import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { brands } from "@/data/brands";
import { partnership } from "@/data/partnership";

/**
 * Client logo rail.
 *
 * 🔴 CONTENTS FROZEN. See data/partnership.ts and data/brands.ts. Whether
 * these brands may be named at all is unresolved — the repo and
 * docs/CONTENT-INVENTORY.md §6 currently contradict each other on whether the
 * client consented. This redesign changes how the section LOOKS and removes a
 * barred sentence from its copy. It does not add a brand, a name, a sector, a
 * logo, or any statement about the work performed.
 *
 * WHY IT MOVED OFF THE DARK GROUND
 *
 * It was a full-bleed ink section, which made a passing trust signal one of
 * the loudest things on the page. It is now a light band: the logos should
 * register as "these are real businesses" and let the eye move on.
 *
 * The white tiles are gone with it. They existed because the supplied marks
 * sit on mixed backgrounds and compositing them onto ink drew a visible box
 * around each one. On a light ground that problem disappears, so the marks sit
 * directly on the surface — which is what makes a logo rail read as a rail
 * rather than as a row of cards.
 *
 * MARKS ARE SHOWN AS SUPPLIED, IN COLOUR.
 *
 * A greyscale rail was tried first — it is the usual way to stop five brand
 * palettes fighting each other. It failed on these particular assets. Three of
 * the five are dark marks on white with no alpha channel, and desaturating
 * them then dropping the opacity left them barely visible against a light
 * ground: the treatment that normally unifies a rail was erasing most of it.
 *
 * Full colour at a consistent height is the honest presentation, and with the
 * marks kept small it stays a passing signal rather than a feature.
 */
export function Partnership() {
  return (
    <Section tone="canvas" spacing="compact" reveal aria-labelledby="partnership-title">
      <SectionHeading
        id="partnership-title"
        eyebrow={partnership.eyebrow}
        title={partnership.title}
        /* h3 sizing on an h2 element: this is a supporting trust signal, and at
           h2 scale it competed with the actual section headings around it. */
        size="h3"
        align="center"
      />

      <ul className="mt-block flex flex-wrap items-center justify-center gap-x-6 gap-y-6 sm:mt-section-sm sm:gap-x-12 lg:gap-x-16">
        {brands.map((brand, index) => (
          <li
            key={brand.name}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="flex items-center justify-center"
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
              className="h-10 w-auto max-w-[7.5rem] object-contain sm:max-w-[8rem]"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
