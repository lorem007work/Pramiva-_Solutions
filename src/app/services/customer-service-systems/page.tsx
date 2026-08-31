import { ServiceGroupPage } from "@/components/sections/service-group-page";
import { seo } from "@/data/seo";
import { customerServicePage } from "@/data/service-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(seo.servicesCustomerService);

export default function CustomerServiceSystemsPage() {
  return <ServiceGroupPage content={customerServicePage} />;
}
