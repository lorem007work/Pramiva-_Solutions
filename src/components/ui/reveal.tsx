"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";

type RevealProps = HTMLAttributes<HTMLDivElement>;

/**
 * Progressively enhances below-the-fold content with a one-time entrance.
 *
 * Server-rendered content stays visible by default. JavaScript only hides an
 * element after confirming it starts outside the viewport, so a failed script
 * can never leave content inaccessible.
 */
export function Reveal({ children, className = "", ...props }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      element.dataset.revealState = "ready";
      return;
    }

    const bounds = element.getBoundingClientRect();
    const startsInViewport = bounds.top < window.innerHeight && bounds.bottom > 0;

    if (startsInViewport) {
      element.dataset.revealState = "ready";
      return;
    }

    element.dataset.revealState = "pending";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        // Reveal when the element enters the viewport, and ALSO when it has
        // already passed above it. A programmatic jump — anchor link, restored
        // scroll position, or a fast flick — can move an element from below the
        // viewport to above it within a single frame, so `isIntersecting` never
        // becomes true and the content stays at opacity 0 permanently. Verified
        // on the deployed site: jumping to the page bottom left one section
        // invisible until it was scrolled back into view.
        const hasPassedAbove = entry.boundingClientRect.bottom < 0;
        if (!entry.isIntersecting && !hasPassedAbove) return;

        element.dataset.revealState = hasPassedAbove ? "ready" : "visible";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={`reveal ${className}`} {...props}>
      {children}
    </div>
  );
}
