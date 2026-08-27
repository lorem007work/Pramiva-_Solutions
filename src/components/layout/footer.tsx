import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";
import { isPlaceholder } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="ground ground-ink text-canvas">
      <Container className="py-section-sm">
        <div className="grid gap-12 border-b border-[color:var(--tone-border)] pb-section-sm md:grid-cols-12">
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

          {/* Three groups now that Services has its own column: Company,
              Services, Contact. At sm they fit three across; below that they
              stack, which keeps each link list scannable rather than squeezing
              three columns onto a 360px screen. */}
          <div className="grid gap-10 sm:grid-cols-3 md:col-span-7">
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
                          className="inline-flex min-h-11 items-center text-canvas/80 transition-colors duration-150 hover:text-canvas"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

            <div>
              <Eyebrow>Contact</Eyebrow>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-[color:var(--tone-muted)]">Email</dt>
                  <dd className="mt-1 break-words text-canvas/80">
                    {isPlaceholder(site.email) ? (
                      site.email
                    ) : (
                      <a
                        href={`mailto:${site.email}`}
                        className="inline-flex min-h-11 max-w-full items-center break-all transition-colors duration-150 hover:text-canvas"
                      >
                        {site.email}
                      </a>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-[color:var(--tone-muted)]">Address</dt>
                  <dd className="mt-1 break-words text-canvas/80">
                    {site.address}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="pt-6 text-sm text-[color:var(--tone-muted)]">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
