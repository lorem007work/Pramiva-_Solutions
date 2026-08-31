import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { footerNav, legalNav } from "@/data/navigation";
import { site } from "@/data/site";
import { isPlaceholder } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="ground ground-ink text-canvas">
      <Container className="py-section-sm">
        <div className="grid gap-12 border-b border-[color:var(--tone-border)] pb-section-sm md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="/"
              aria-label={`${site.name} home`}
              className="inline-flex transition-opacity duration-150 hover:opacity-80"
            >
              <BrandLogo inverted className="h-auto w-44 sm:w-52" />
            </Link>
            <p className="mt-4 max-w-sm text-canvas/70">{site.tagline}</p>
          </div>

          {/* Company, Services, Contact — a fourth group wraps the row. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:col-span-8">
            {footerNav
              .filter((group) => group.links.length > 0)
              .map((group) => (
                <nav key={group.heading} aria-label={`${group.heading} footer`}>
                  <Eyebrow>{group.heading}</Eyebrow>
                  {/* min-h-11 keeps every link a 44px touch target on a phone
                      without changing how the list reads on desktop. */}
                  <ul className="mt-3 space-y-1">
                    {group.links.map((link) => (
                      <li key={`${group.heading}-${link.label}`}>
                        <Link
                          href={link.href}
                          className="inline-flex min-h-11 items-center text-canvas/80 transition-colors duration-150 hover:text-canvas md:min-h-0 md:py-1"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

            <div className="col-span-2 sm:col-span-1">
              <Eyebrow>Contact</Eyebrow>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-[color:var(--tone-muted)]">Email</dt>
                  <dd className="mt-1 break-words text-canvas/80">
                    {isPlaceholder(site.email) ? (
                      site.email
                    ) : (
                      <a
                        href={`mailto:${site.email}`}
                        className="inline-flex min-h-11 max-w-full items-center transition-colors duration-150 hover:text-canvas md:min-h-0"
                      >
                        <span className="break-words">
                          {site.email.split("@")[0]}@<wbr />
                          {site.email.split("@")[1]}
                        </span>
                      </a>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-[color:var(--tone-muted)]">Phone</dt>
                  <dd className="mt-1 text-canvas/80">
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="inline-flex min-h-11 items-center transition-colors duration-150 hover:text-canvas md:min-h-0"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[color:var(--tone-muted)]">Address</dt>
                  <dd className="mt-1 break-words text-canvas/80">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-150 hover:text-canvas"
                    >
                      {site.address}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 pt-6 text-center text-sm text-[color:var(--tone-muted)]">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          {legalNav.map((link) => (
            <span key={link.href} className="flex items-center gap-3">
              <span aria-hidden="true">&middot;</span>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center transition-colors duration-150 hover:text-canvas md:min-h-0"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </Container>
    </footer>
  );
}
