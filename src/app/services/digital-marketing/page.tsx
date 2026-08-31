import { ServiceGroupPage } from "@/components/sections/service-group-page";
import { seo } from "@/data/seo";
import { digitalMarketingPage } from "@/data/service-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(seo.servicesDigitalMarketing);

export default function DigitalMarketingPage() {
  return <ServiceGroupPage content={digitalMarketingPage} />;
}
