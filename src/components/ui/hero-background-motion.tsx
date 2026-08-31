"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";

/** A quiet ambient wash that gives the hero depth without moving the artwork. */
export function HeroBackgroundMotion() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-12 z-0 bg-[radial-gradient(circle_at_78%_42%,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent_40%)]"
          initial={{ opacity: 0.25, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: [0.22, 0.34, 0.22], x: [0, 10, 0], y: [0, -6, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </MotionConfig>
    </LazyMotion>
  );
}
