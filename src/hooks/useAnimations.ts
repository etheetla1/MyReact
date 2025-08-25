import { useMemo } from 'react';

interface AnimationVariant {
  hidden: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    transition: {
      duration?: number;
      delay?: number;
      ease?: string;
      staggerChildren?: number;
      delayChildren?: number;
    };
  };
}

interface ItemVariant {
  hidden: {
    opacity: number;
    scale: number;
  };
  visible: (i: number) => {
    opacity: number;
    scale: number;
    transition: {
      delay: number;
      duration: number;
      ease: string;
    };
  };
}

interface AnimationHook {
  fadeIn: (delay?: number) => AnimationVariant;
  fadeInUp: (delay?: number) => AnimationVariant;
  slideLeft: (delay?: number) => AnimationVariant;
  slideRight: (delay?: number) => AnimationVariant;
  container: (delay?: number) => AnimationVariant;
  imageContainer: AnimationVariant;
  itemVariants: ItemVariant;
  staggerContainer: AnimationVariant;
  staggerItem: AnimationVariant;
}

export const useAnimations = (): AnimationHook => {
  return useMemo(() => ({
    // Fade animations
    fadeIn: (delay = 0) => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay },
      },
    }),

    fadeInUp: (delay = 0) => ({
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: "easeOut" },
      },
    }),

    // Slide animations
    slideLeft: (delay = 0) => ({
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay },
      },
    }),

    slideRight: (delay = 0) => ({
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay },
      },
    }),

    // Container animations
    container: (delay = 0) => ({
      hidden: { x: -100, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, delay, ease: "easeOut" },
      },
    }),

    // Image animations
    imageContainer: {
      hidden: { x: 100, opacity: 0, scale: 0.8 },
      visible: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 1, delay: 0.3, ease: "easeOut" },
      },
    },

    // Item animations for lists/grids
    itemVariants: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
          ease: "easeOut"
        }
      })
    },

    // Stagger container
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },

    // Stagger item
    staggerItem: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      },
    },
  }), []);
};
