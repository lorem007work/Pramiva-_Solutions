import { createPageMetadata } from "@/lib/metadata";
import { AtAGlance } from "@/components/sections/at-a-glance";
import { CompanyIntro } from "@/components/sections/company-intro";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { PositioningStatement } from "@/components/sections/positioning-statement";
import { ServicesOverview } from "@/components/sections/services-overview";
import { homepage } from "@/data/homepage";
import { seo } from "@/data/seo";

export const metadata = createPageMetadata(seo.home);

/**
 * Homepage.
 *
 * The "Why Pramiva" and "How we work" sections were removed on 2026-08-24:
 * one was benefit claims we cannot make, the other was induction-derived
 * process content that is barred from public pages. See data/homepage.ts.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <AtAGlance />
      <PositioningStatement />
      <ServicesOverview />
      <CompanyIntro />
      <CtaBand id="home-cta-title" {...homepage.cta} />
    </main>
  );
}
