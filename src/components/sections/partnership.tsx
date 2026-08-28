import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { brands } from "@/data/brands";
import { partnership } from "@/data/partnership";

/**
 * Client logo rail — a continuously scrolling marquee.
 *
 * Naming resolved 2026-08-26: the owner re-confirmed SNS consent when the
 * contradiction was put to them. See data/brands.ts — the citation for the
 * underlying written agreement is still outstanding.
 *
 * WHY IT MOVED OFF THE DARK GROUND
 *
 * It was a full-bleed ink section, which made a passing trust signal one of
 * the loudest things on the page. It is now a light band: the logos should
 * register as "these are real businesses" and let the eye move on.
 *
 * WHY A RAIL AND NOT A GRID
 *
 * The static grid had to divide the set exactly or it left an orphan on the
 * last row, so every brand added or removed was a layout problem. A rail has
 * no rows to balance: the ninth logo costs one more tile and nothing else.
 *
 * MARKS ARE SHOWN AS SUPPLIED, IN COLOUR.
 *
 * A greyscale rail was tried first — it is the usual way to stop several brand
 * palettes fighting each other. It failed on these particular assets. Several
 * are dark marks on white with no alpha channel, and desaturating them then
 * dropping the opacity left them barely visible against a light ground: the
 * treatment that normally unifies a rail was erasing most of it.
 *
 * MOTION
 *
 * CSS only — no library, no scroll listener, nothing added to the JS bundle.
 * globals.css owns the loop maths; see the `.brand-rail` block there.
 *
 * The rail pauses on hover and on keyboard focus, and `prefers-reduced-motion`
 * replaces it with the wrapped static rows this section used before. Note that
 * a touch user has no way to stop it — if strict WCAG 2.2.2 compliance is
 * required, this needs a visible pause control as well.
 */
export function Partnership() {
  return (
    <Section
      tone="canvas"
      spacing="compact"
      reveal
      aria-labelledby="partnership-title"
    >
      <SectionHeading
        id="partnership-title"
        eyebrow={partnership.eyebrow}
        title={partnership.title}
        /* h3 sizing on an h2 element: this is a supporting trust signal, and at
           h2 scale it competed with the actual section headings around it. */
        size="h3"
        align="center"
        stagger={0}
      />

      {/*
        The negative margins cancel the Container gutters so the rail runs to
        the page edge and the mask has room to fade against. It stops at the
        1280px page width rather than the viewport, which keeps it aligned with
        every other section and avoids the `w-screen` breakout trick that
        causes horizontal overflow once a scrollbar is present.
      */}
      <div
        data-stagger
        style={
          {
            "--stagger-index": 1,
            "--rail-count": brands.length,
          } as React.CSSProperties
        }
        className="brand-rail mt-block -mx-5 sm:mt-section-sm md:-mx-8 lg:-mx-16"
      >
        <div className="brand-rail-track">
          <BrandSet />
          {/* The loop needs the set twice; a screen reader needs it once. */}
          <BrandSet duplicate />
        </div>
      </div>
    </Section>
  );
}

/** One pass of the logo set. `duplicate` renders the copy that makes the loop. */
function BrandSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="brand-rail-set" aria-hidden={duplicate || undefined}>
      {brands.map((brand) => (
        <li
          key={brand.name}
          /* bg-canvas, not bg-surface: several marks were supplied with an
             opaque white background baked in, which showed as a lighter box
             inside a #fafafa tile. Matching the tile to that white makes the
             artifact invisible and leaves the border to define the chip. */
          className="flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border border-line bg-canvas p-4 transition-colors duration-300 hover:border-brand/40 sm:h-28 sm:w-48 sm:p-5 lg:h-32 lg:w-56 lg:p-6"
        >
          <Image
            src={brand.logo.src}
            alt={duplicate ? "" : `${brand.name} logo`}
            width={brand.logo.width}
            height={brand.logo.height}
            className="h-full w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
