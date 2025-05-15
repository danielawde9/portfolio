import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

// Fade in animation
export const fadeIn = (element: string | Element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(element, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration, delay, ease: "power3.out" })
}

// Fade in from left
export const fadeInLeft = (element: string | Element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(element, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration, delay, ease: "power3.out" })
}

// Fade in from right
export const fadeInRight = (element: string | Element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(element, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration, delay, ease: "power3.out" })
}

// Staggered fade in for multiple elements
export const staggerFadeIn = (elements: string | Element, stagger = 0.1, delay = 0, duration = 0.5) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration, delay, stagger, ease: "power3.out" },
  )
}

// Bounce animation
export const bounce = (element: string | Element, delay = 0) => {
  return gsap.fromTo(element, { y: 0 }, { y: -10, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut", delay })
}

// Typing animation
export const typeText = (element: string | Element, text: string, delay = 0, duration = 2) => {
  return gsap.to(element, {
    duration,
    delay,
    text: {
      value: text,
      delimiter: "",
    },
    ease: "none",
  })
}

// Create scroll trigger animation
export const createScrollTrigger = (trigger: string | Element, animation: gsap.core.Tween | gsap.core.Timeline) => {
  return ScrollTrigger.create({
    trigger,
    start: "top 80%",
    end: "bottom 20%",
    animation,
    toggleActions: "play none none reverse",
  })
}

// Smooth scroll to section
export const smoothScrollTo = (target: Element, duration = 1) => {
  const targetPosition = target.getBoundingClientRect().top + window.scrollY
  const startPosition = window.scrollY
  const distance = targetPosition - startPosition

  return gsap.to(window, {
    duration,
    scrollTo: {
      y: targetPosition,
      autoKill: false,
    },
    ease: "power3.inOut",
  })
}
