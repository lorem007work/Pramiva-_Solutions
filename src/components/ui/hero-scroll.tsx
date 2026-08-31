"use client";

import { useEffect, useRef } from "react";
import { scroll } from "motion";

export function HeroScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  /* Vanilla scroll() rather than useScroll/useTransform/m: in motion@13.1.1
     under this Next/React version the hook chain leaves the style bindings
     frozen at their server-rendered values (subscriptions fail to propagate
     upstream, and the native ViewTimeline promotion sticks at 0 for a
     top-of-page target). The imperative API tracks reliably. */
  useEffect(() => {
    const target = ref.current;
    const el = inner.current;
    if (!target || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    return scroll(
      (progress: number) => {
        el.style.transform = `translateY(${(progress * 90).toFixed(1)}px)`;
        el.style.opacity = (1 - progress * 0.75).toFixed(3);
      },
      { target, offset: ["start start", "end start"] },
    );
  }, []);

  return (
    <div ref={ref}>
      <div ref={inner}>{children}</div>
    </div>
  );
}
