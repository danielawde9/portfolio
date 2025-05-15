import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Fade in animation
export function fadeIn(
  element: HTMLElement,
  delay: number = 0,
  duration: number = 1
) {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
    }
  );
}

// Fade in from left
export function fadeInLeft(
  element: HTMLElement,
  delay: number = 0,
  duration: number = 1
) {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
    }
  );
}

// Fade in from right
export function fadeInRight(
  element: HTMLElement,
  delay: number = 0,
  duration: number = 1
) {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
    }
  );
}

// Fade in from up
export function fadeInUp(
  element: HTMLElement,
  delay: number = 0,
  duration: number = 1
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
    }
  );
}

// Fade in from down
export function fadeInDown(
  element: HTMLElement,
  delay: number = 0,
  duration: number = 1
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: -50 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
    }
  );
}

// Staggered fade in for multiple elements
export const staggerFadeIn = (
  elements: string | Element,
  stagger = 0.1,
  delay = 0,
  duration = 0.5
) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration, delay, stagger, ease: "power3.out" }
  );
};

// Bounce animation
export function bounce(element: HTMLElement, delay: number = 0) {
  const tl = gsap.timeline({ repeat: -1, delay });
  tl.to(element, {
    y: -10,
    duration: 1,
    ease: "power2.out",
  }).to(element, {
    y: 0,
    duration: 1,
    ease: "bounce.out",
  });
  return tl;
}

// Scale animation
export function scale(
  element: HTMLElement,
  delay: number = 0,
  duration: number = 1
) {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: "power3.out",
    }
  );
}

// Typing animation
export const typeText = (
  element: string | Element,
  text: string,
  delay = 0,
  duration = 2
) => {
  return gsap.to(element, {
    duration,
    delay,
    text: {
      value: text,
      delimiter: "",
    },
    ease: "none",
  });
};

// Create scroll trigger animation
export function createScrollTrigger(
  element: HTMLElement | null,
  animationFunction: (el: HTMLElement) => gsap.core.Tween,
  triggerOptions: { start?: string; end?: string } = {}
) {
  if (!element) return;

  const animation = animationFunction(element);

  ScrollTrigger.create({
    trigger: element,
    start: triggerOptions.start || "top 80%",
    end: triggerOptions.end || "bottom 20%",
    animation,
    toggleActions: "play none none none",
  });

  return animation;
}

// Smooth scroll to section
export const smoothScrollTo = (target: Element, duration = 1) => {
  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;

  return gsap.to(window, {
    duration,
    scrollTo: {
      y: targetPosition,
      autoKill: false,
    },
    ease: "power3.inOut",
  });
};
