"use client";

import type React from "react";

import { useRef, useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import AnimatedBackground from "@/components/animated-background";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

export default function Home() {
  // Refs for scrolling
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  // Enhanced smooth scroll with GSAP
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      const targetPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetPosition,
          autoKill: false,
        },
        ease: "power3.inOut",
      });
    }
  };

  useEffect(() => {
    // Initial page load animation
    gsap.fromTo(
      "body",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.inOut" }
    );

    // Create a scroll progress indicator
    gsap.to("progress", {
      value: 100,
      ease: "none",
      scrollTrigger: {
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <main className="relative bg-transparent text-white">
      {/* Global animated background */}
      <AnimatedBackground />

      {/* Scroll progress indicator */}
      <progress
        className="fixed top-0 left-0 right-0 h-1 z-50 appearance-none bg-transparent pointer-events-none"
        max="100"
        value="0"
        style={
          {
            // Custom styling for the progress bar
            "--color": "#33CCFF",
            "--background": "transparent",
            "--border-radius": "0px",
          } as React.CSSProperties
        }
      />

      <Navigation
        onScrollToSection={scrollToSection}
        aboutRef={aboutRef}
        projectsRef={projectsRef}
        experienceRef={experienceRef}
        contactRef={contactRef}
      />

      <div className="relative z-10">
        <HeroSection
          onScrollToSection={scrollToSection}
          aboutRef={aboutRef}
          projectsRef={projectsRef}
        />

        <AboutSection forwardedRef={aboutRef} />
        <ExperienceSection forwardedRef={experienceRef} />
        <ContactSection forwardedRef={contactRef} />
        <Footer />
      </div>
    </main>
  );
}
