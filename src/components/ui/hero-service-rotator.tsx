"use client";

import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { useEffect, useState } from "react";

type HeroServiceRotatorProps = {
  services: readonly string[];
};

export function HeroServiceRotator({ services }: HeroServiceRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (services.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % services.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [services.length]);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <span className="relative block min-h-[1.2em] text-hero text-accent" aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={services[index]}
              className="absolute inset-x-0 top-0 block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {services[index]}
            </m.span>
          </AnimatePresence>
        </span>
      </MotionConfig>
    </LazyMotion>
  );
}
