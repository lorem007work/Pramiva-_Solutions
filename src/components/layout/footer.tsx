import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Container } from "@/components/ui/container";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";
import { isPlaceholder } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-ink text-canvas">
      <Container className="py-section-sm">
        <div className="grid gap-12 border-b border-canvas/15 pb-section-sm md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label={`${site.name} home`}
              className="inline-flex transition-opacity duration-150 hover:opacity-80"
            >
              <BrandLogo inverted className="h-auto w-44 sm:w-52" />
            </Link>
            <p className="mt-4 max-w-sm text-canvas/70">{site.tagline}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-7">
            {footerNav
              .filter((group) => group.links.length > 0)
              .map((group) => (
                <nav key={group.heading} aria-label={`${group.heading} footer`}>
                  <p className="text-eyebrow uppercase text-canvas/60">
                    {group.heading}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-canvas/80 transition-colors duration-150 hover:text-canvas"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

            <div>
              <p className="text-eyebrow uppercase text-canvas/60">Contact</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-canvas/50">Email</dt>
                  <dd className="mt-1 break-words text-canvas/80">
                    {isPlaceholder(site.email) ? (
                      site.email
                    ) : (
                      <a href={`mailto:${site.email}`} className="hover:text-canvas">
                        {site.email}
                      </a>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-canvas/50">Phone</dt>
                  <dd className="mt-1 break-words text-canvas/80">
                    {isPlaceholder(site.phone) ? (
                      site.phone
                    ) : (
                      <a href={`tel:${site.phone}`} className="hover:text-canvas">
                        {site.phone}
                      </a>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-canvas/50">Address</dt>
                  <dd className="mt-1 break-words text-canvas/80">
                    {site.address}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-sm text-canvas/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <p>{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
