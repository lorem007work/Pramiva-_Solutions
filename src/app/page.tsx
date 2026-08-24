import { Hero } from "@/components/sections/hero";
import { PositioningStatement } from "@/components/sections/positioning-statement";
import { ServicesOverview } from "@/components/sections/services-overview";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <PositioningStatement />
      <ServicesOverview />
    </main>
  );
}
