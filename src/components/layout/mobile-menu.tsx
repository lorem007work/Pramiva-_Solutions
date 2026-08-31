"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Chevron } from "@/components/ui/chevron";
import type { NavLink } from "@/data/navigation";
import { site } from "@/data/site";
import { isCurrentPath, isCurrentSection } from "@/lib/utils";

type MobileMenuProps = {
  isOpen: boolean;
  links: ReadonlyArray<NavLink>;
  primaryCta: NavLink;
  pathname: string;
  onClose: () => void;
};

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const desktopViewport = "(min-width: 64rem)";

export function MobileMenu({
  isOpen,
  links,
  primaryCta,
  pathname,
  onClose,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<string | null>(
    () =>
      links.find(
        (link) => link.children?.length && isCurrentSection(pathname, link.href),
      )?.href ?? null,
  );

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function handleViewportChange(event: MediaQueryListEvent) {
      if (event.matches) onClose();
    }

    const desktop = window.matchMedia(desktopViewport);

    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleViewportChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleViewportChange);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-canvas opacity-100 transition-opacity duration-200 ease-[var(--ease-out-expo)] starting:opacity-0 lg:hidden">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="flex h-full flex-col px-5 pb-5"
      >
        <div className="flex h-18 shrink-0 items-center justify-between border-b border-line sm:h-22">
          <Link
            href="/"
            aria-label={`${site.name} home`}
            onClick={onClose}
            className="inline-flex shrink-0 transition-opacity duration-150 hover:opacity-80"
          >
            <BrandLogo className="h-auto w-44 sm:w-52" />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-line-strong text-ink transition-[background-color,border-color,color,transform] duration-200 hover:border-ink hover:bg-ink hover:text-canvas motion-safe:active:scale-95"
            aria-label="Close navigation"
          >
            <span aria-hidden="true" className="relative block h-5 w-5">
              <span className="absolute top-1/2 left-0 h-px w-5 rotate-45 bg-current" />
              <span className="absolute top-1/2 left-0 h-px w-5 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="flex min-h-0 flex-1 translate-y-0 flex-col overflow-y-auto pt-6 transition-transform duration-300 ease-[var(--ease-out-expo)] starting:translate-y-3"
        >
          <ul className="divide-y divide-line border-y border-line">
            {links.map((link, index) => {
              const children = link.children ?? [];
              const isCurrent = children.length
                ? isCurrentSection(pathname, link.href)
                : isCurrentPath(pathname, link.href);
              const isExpanded = expanded === link.href;
              const sublistId = `mobile-submenu-${link.label.toLowerCase()}`;

              return (
                <li key={link.href}>
                  <div className="flex items-center gap-3">
                    <Link
                      href={link.href}
                      aria-current={isCurrent ? "page" : undefined}
                      onClick={onClose}
                      className={`group flex min-h-16 flex-1 items-center justify-between py-5 text-h3 transition-colors duration-150 hover:text-brand motion-safe:active:translate-x-1 ${isCurrent ? "font-medium text-brand" : ""}`}
                    >
                      <span>{link.label}</span>
                      <span
                        aria-hidden="true"
                        className={`text-sm transition-colors duration-150 group-hover:text-brand ${isCurrent ? "text-brand" : "text-ink-subtle"}`}
                      >
                        0{index + 1}
                      </span>
                    </Link>
                    {children.length ? (
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={sublistId}
                        aria-label={`${isExpanded ? "Hide" : "Show"} ${link.label} pages`}
                        onClick={() => setExpanded(isExpanded ? null : link.href)}
                        className={`inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${isExpanded ? "border-brand text-brand" : "border-line-strong text-ink"}`}
                      >
                        <Chevron open={isExpanded} className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  {children.length && isExpanded ? (
                    <ul id={sublistId} className="pb-4">
                      {children.map((child) => {
                        const isChildCurrent = isCurrentPath(pathname, child.href);
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={isChildCurrent ? "page" : undefined}
                              onClick={onClose}
                              className={`flex min-h-12 items-center gap-3 text-base transition-colors duration-150 hover:text-brand ${isChildCurrent ? "font-medium text-brand" : "text-ink-muted"}`}
                            >
                              <span aria-hidden="true" className="text-accent-text">
                                —
                              </span>
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={primaryCta.href}
          onClick={onClose}
          className="mt-6 inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-canvas transition-colors duration-150 hover:bg-brand-deep"
        >
          {primaryCta.label}
        </Link>
      </div>
    </div>
  );
}
