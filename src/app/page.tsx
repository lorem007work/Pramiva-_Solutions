import { createPageMetadata } from "@/lib/metadata";
import { AtAGlance } from "@/components/sections/at-a-glance";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroSplit } from "@/components/sections/hero-split";
import { Partnership } from "@/components/sections/partnership";
import { PositioningStatement } from "@/components/sections/positioning-statement";
import { ServicePillars } from "@/components/sections/service-pillars";
import { TeamPreview } from "@/components/sections/team-preview";
import { homepage } from "@/data/homepage";
import { seo } from "@/data/seo";
import { buildHomeJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata(seo.home);

/*
  Organization + WebSite markup, homepage only.

  Emitting it on every route would repeat the same Organization five times and
  invite a crawler to treat them as five entities. Google's own guidance is to
  describe the organisation once, on the page that represents the site.

  Every value comes from site.ts and unanswered fields are filtered out — see
  lib/structured-data.ts. Nothing here can publish a placeholder.
*/
const jsonLd = buildHomeJsonLd();

/**
 * Homepage.
 *
 * The "Why Pramiva" and "How we work" sections were removed on 2026-08-24:
 * one was benefit claims we cannot make, the other was induction-derived
 * process content that is barred from public pages. See data/homepage.ts.
 *
 * Restructured 2026-08-25. Section order now follows the redesign:
 *
 *   white   HeroSplit             proposition + the actual team
 *   soft    AtAGlance             four verifiable facts
 *   white   ServicePillars        three groups, not six cards
 *   teal    PositioningStatement  the vision, at scale
 *   white   Partnership           logo rail (contents frozen — see the file)
 *   white   TeamPreview           people, mirrored against the hero
 *   ink     CtaBand               one action
 *
 * SURFACE RHYTHM is the reason the order looks like that. The page previously
 * alternated white and dark only, so every light section was the same light
 * and the sequence read as on/off. The soft teal band is a third temperature,
 * placed early where it separates two white sections that would otherwise run
 * together. Partnership and TeamPreview are both white on purpose — they are
 * one continuous "who we are" passage, and a ground change between them would
 * imply a topic change that is not there.
 *
 * Only ONE full-bleed dark section remains besides the closing band, down from
 * three. Dark grounds stop being emphatic when everything is one.
 *
 * A case study and a testimonial belong between Partnership and TeamPreview.
 * Neither is mounted: no verified case study and no attributable testimonial
 * exists, and the brief is explicit that a placeholder is worse than a gap.
 */
export default function Home() {
  return (
    <main id="main">
      {/* Server-rendered into the static HTML, so crawlers that do not execute
          JavaScript still see it. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSplit />
      <AtAGlance />
      <ServicePillars />
      <PositioningStatement />
      <Partnership />
      <TeamPreview />
      <CtaBand id="home-cta-title" {...homepage.cta} />
    </main>
  );
}
