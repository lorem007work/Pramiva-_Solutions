"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";

/**
 * THE ONLY MOTION MODULE IN THE CODEBASE — CLAUDE.md rule 7.
 *
 * NO ANIMATION LIBRARY. `motion` was adopted on 2026-08-25 and removed the
 * same day: it cost +34 KB gzipped on every route, taking the site from 179 KB
 * to 213 KB against a 185 KB budget, and every effect on the page is a fade, a
 * translate or a scale. Those are three CSS declarations. The dependency was
 * buying nothing that `IntersectionObserver` plus keyframes does not already
 * do — see docs/ARCHITECTURE.md §5.1 and docs/MOTION-ART-DIRECTION.md.
 *
 * What lives here is the trigger, not the animation. This file decides WHEN a
 * block has entered the viewport and writes that onto the element as a data
 * attribute; globals.css decides what entering looks like. Keeping the timing
 * in the stylesheet is why there is only one set of numbers to change.
 *
 * SERVER RENDERING AND THE NO-JAVASCRIPT CASE
 *
 * Content is visible in the server-rendered HTML and stays visible until this
 * component has confirmed, on the client, that the block starts outside the
 * viewport. A script that never loads, or throws, therefore cannot leave a
 * section stuck at opacity 0 — the failure mode is "no animation", never
 * "no content".
 */

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Force group mode instead of letting the component detect it.
   *
   * Group mode is normally inferred: if the block contains a `[data-stagger]`
   * child, its children own the entrance and the container does not animate.
   * Pass `group` explicitly only when the staggered children are mounted after
   * the first paint, which nothing currently does.
   */
  group?: boolean;
};

export function Reveal({
  children,
  className = "",
  group,
  ...props
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    /*
      ONE ENTRANCE SYSTEM PER BLOCK.

      Before this, a section with a list ran two animations on top of each
      other: the container rose and faded, and then every `[data-stagger]`
      child rose and faded again inside it. Nested opacity multiplies (a child
      at 0.5 inside a parent at 0.5 renders at 0.25) and the two transforms
      compound, so the group arrived soft, late and overworked.

      The block declares which system it uses, once, here. A block that
      contains staggered children hands the entrance to those children and
      stays still itself; a block that does not, animates as a whole.
    */
    const isGroup = group ?? element.querySelector("[data-stagger]") !== null;
    if (isGroup) element.dataset.revealMode = "group";

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
  }, [group]);

  return (
    <div ref={elementRef} className={`reveal ${className}`} {...props}>
      {children}
    </div>
  );
}
