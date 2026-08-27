"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "fadeInUp" | "scaleIn" | "slideInLeft" | "slideInRight";
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  variant = "fadeInUp",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 20%"],
  });

  // Map scroll progress to opacity
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Map scroll progress to y translation
  const y = useTransform(scrollYProgress, [0, 1], [variant === "fadeInUp" ? 40 : 0, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y: variant === "fadeInUp" || variant === "slideInLeft" ? y : undefined,
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// For elements that enter on scroll with fade + scale
export function ScaleReveal({
  children,
  className,
  delay = 0,
}: Omit<ScrollRevealProps, "variant">) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 15%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
