"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Container } from "@/components/ui/container";
import type { NavLink } from "@/data/navigation";
import { isCurrentPath } from "@/lib/utils";

type NavbarProps = {
  siteName: string;
  links: ReadonlyArray<NavLink>;
  primaryCta: NavLink;
};

export function Navbar({ siteName, links, primaryCta }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-sm">
        <Container className="flex h-20 items-center justify-between gap-8">
          <Link
            href="/"
            aria-label={`${siteName} home`}
            className="inline-flex shrink-0 transition-opacity duration-150 hover:opacity-80"
          >
            <BrandLogo className="h-auto w-36 sm:w-44" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <nav aria-label="Primary">
              <ul className="flex items-center gap-7">
                {links.map((link) => {
                  const isCurrent = isCurrentPath(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`relative inline-flex min-h-11 items-center text-sm transition-colors duration-150 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:text-brand hover:after:origin-left hover:after:scale-x-100 ${isCurrent ? "font-medium text-brand after:scale-x-100" : "text-ink-muted"}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <Link
              href={primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-colors duration-150 hover:bg-brand"
            >
              {primaryCta.label}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-line-strong text-ink transition-[background-color,border-color,color,transform] duration-200 hover:border-ink motion-safe:active:scale-95 md:hidden"
            aria-label="Open navigation"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
          </button>
        </Container>
      </header>

      <div id="mobile-navigation">
        <MobileMenu
          isOpen={isMenuOpen}
          links={links}
          primaryCta={primaryCta}
          pathname={pathname}
          onClose={closeMenu}
        />
      </div>
    </>
  );
}
