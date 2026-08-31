"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Chevron } from "@/components/ui/chevron";
import { Container } from "@/components/ui/container";
import type { NavLink } from "@/data/navigation";
import { isCurrentPath, isCurrentSection } from "@/lib/utils";

type NavbarProps = {
  siteName: string;
  links: ReadonlyArray<NavLink>;
  primaryCta: NavLink;
};

const linkClasses =
  "relative inline-flex min-h-11 items-center text-sm transition-colors duration-150 after:absolute after:right-0 after:bottom-2 after:left-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[var(--ease-out-expo)] hover:text-brand hover:after:origin-left hover:after:scale-x-100";

export function Navbar({ siteName, links, primaryCta }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState<{ href: string; pathname: string } | null>(null);
  const openSubmenu = submenu?.pathname === pathname ? submenu.href : null;
  const navRef = useRef<HTMLElement>(null);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    if (!openSubmenu) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSubmenu(null);
    }

    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setSubmenu(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [openSubmenu]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-sm">
        <Container className="flex h-18 items-center justify-between gap-8 sm:h-22">
          <Link
            href="/"
            aria-label={`${siteName} home`}
            className="inline-flex shrink-0 transition-opacity duration-150 hover:opacity-80"
          >
            <BrandLogo priority className="h-auto w-44 sm:w-52" />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <nav ref={navRef} aria-label="Primary">
              <ul className="flex items-center gap-7">
                {links.map((link) => {
                  const children = link.children ?? [];
                  const isCurrent = children.length
                    ? isCurrentSection(pathname, link.href)
                    : isCurrentPath(pathname, link.href);
                  const stateClasses = isCurrent
                    ? "font-medium text-brand after:scale-x-100"
                    : "text-ink-muted";

                  if (!children.length) {
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`${linkClasses} ${stateClasses}`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  }

                  const isOpen = openSubmenu === link.href;
                  const submenuId = `submenu-${link.label.toLowerCase()}`;

                  return (
                    <li key={link.href} className="group relative">
                      <div className="flex items-center">
                        <Link
                          href={link.href}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`${linkClasses} ${stateClasses}`}
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={submenuId}
                          aria-label={`${link.label} pages`}
                          onClick={() =>
                            setSubmenu(isOpen ? null : { href: link.href, pathname })
                          }
                          className={`ml-1 inline-flex h-11 w-6 items-center justify-center transition-colors duration-150 hover:text-brand ${isCurrent ? "text-brand" : "text-ink-muted"}`}
                        >
                          <Chevron open={isOpen} />
                        </button>
                      </div>

                      <div
                        className={`absolute top-full left-0 pt-2 ${isOpen ? "block" : "hidden group-hover:block"}`}
                      >
                        <ul
                          id={submenuId}
                          className="w-72 border border-line bg-canvas p-2 shadow-lg shadow-ink/5"
                        >
                          {children.map((child) => {
                            const isChildCurrent = isCurrentPath(pathname, child.href);
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  aria-current={isChildCurrent ? "page" : undefined}
                                  className={`flex min-h-11 items-center px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-surface hover:text-brand ${isChildCurrent ? "font-medium text-brand" : "text-ink"}`}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <Link
              href={primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-canvas transition-colors duration-150 hover:bg-brand-deep"
            >
              {primaryCta.label}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-line-strong text-ink transition-[background-color,border-color,color,transform] duration-200 hover:border-ink hover:bg-ink hover:text-canvas motion-safe:active:scale-95 lg:hidden"
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
