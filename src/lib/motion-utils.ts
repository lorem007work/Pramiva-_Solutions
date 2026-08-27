import { Variants } from "motion/react";

// Scroll-triggered entrance animations using Motion.dev
export const scrollAnimations = {
  // Fade and slide up on scroll
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  } as Variants,

  // Scale and fade in
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  } as Variants,

  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  } as Variants,

  // Slide in from right
  slideInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  } as Variants,

  // Staggered container for multiple children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as Variants,

  // Child item for staggered animation
  staggerItem: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  } as Variants,
};

// Animation configuration for scroll-based triggers
export const scrollConfig = {
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
  },

  staggerDelay: 0.08,
  scaleOnHover: 1.02,
};
