"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";

// Scroll reveal trigger. Decides WHEN a block is on screen; globals.css owns
// what entering looks like. Content is visible until the client confirms the
// block starts off-screen, so a failed script never hides anything.

// Re-arms on exit, so a block animates again when scrolled back to.
// Hysteresis matters here: it shows once 8% is in view but re-arms only when
// fully out, so a block resting near the boundary cannot flicker.
const SHOW_RATIO = 0.08;

// Safety net. IntersectionObserver fires only when the ratio CROSSES a
// threshold, so a block can sit in view unnotified after an odd jump. One
// shared rAF-throttled passive listener promotes anything pending that is
// actually on screen — the "invisible content" failure is never acceptable.
const pending = new Set<HTMLElement>();
let listening = false;
let frame = 0;

function sweep() {
  frame = 0;
  for (const el of pending) {
    const b = el.getBoundingClientRect();
    const inView = b.top < window.innerHeight * (1 - SHOW_RATIO) && b.bottom > 0;
    if (inView) el.dataset.revealState = "visible";
  }
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(sweep);
}

function track(el: HTMLElement) {
  pending.add(el);
  if (!listening) {
    window.addEventListener("scroll", onScroll, { passive: true });
    listening = true;
  }
}

function untrack(el: HTMLElement) {
  pending.delete(el);
  if (pending.size === 0 && listening) {
    window.removeEventListener("scroll", onScroll);
    listening = false;
  }
}

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  // Force group mode. Normally inferred from a [data-stagger] descendant.
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

    // One entrance system per block: a block holding staggered children hands
    // the entrance to them and stays still, so the two never compound.
    const isGroup = group ?? element.querySelector("[data-stagger]") !== null;
    if (isGroup) element.dataset.revealMode = "group";

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Reduced motion opts out of the whole mechanism, replays included.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      element.dataset.revealState = "ready";
      return;
    }

    const bounds = element.getBoundingClientRect();
    const startsInViewport = bounds.top < window.innerHeight && bounds.bottom > 0;
    element.dataset.revealState = startsInViewport ? "ready" : "pending";

    const observer = new IntersectionObserver(
      ([record]) => {
        if (!record) return;
        if (record.intersectionRatio >= SHOW_RATIO) {
          element.dataset.revealState = "visible";
        } else if (record.intersectionRatio === 0) {
          // Fully out of view: re-arm so the next entry animates again.
          element.dataset.revealState = "pending";
        }
      },
      { threshold: [0, SHOW_RATIO] },
    );

    observer.observe(element);
    track(element);

    return () => {
      observer.disconnect();
      untrack(element);
    };
  }, [group]);

  return (
    <div ref={elementRef} className={`reveal ${className}`} {...props}>
      {children}
    </div>
  );
}
