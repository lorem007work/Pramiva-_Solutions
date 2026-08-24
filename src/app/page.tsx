import { CompanyIntro } from "@/components/sections/company-intro";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { PositioningStatement } from "@/components/sections/positioning-statement";
import { Process } from "@/components/sections/process";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyPramiva } from "@/components/sections/why-pramiva";
import { homepage } from "@/data/homepage";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <PositioningStatement />
      <ServicesOverview />
      <WhyPramiva />
      <Process />
      <CompanyIntro />
      <CtaBand id="home-cta-title" {...homepage.cta} />
    </main>
  );
}
