import { Hero } from "@/components/sections/hero";
import { PositioningStatement } from "@/components/sections/positioning-statement";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyPramiva } from "@/components/sections/why-pramiva";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <PositioningStatement />
      <ServicesOverview />
      <WhyPramiva />
    </main>
  );
}
