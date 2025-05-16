"use client";

import type React from "react";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import AnimatedBackground from "@/components/animated-background";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function Home() {
  // Refs for scrolling
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: ref.current.offsetTop, autoKill: false },
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
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollToPlugin);
    }
  }, []);

  return (
    <main className="relative bg-transparent text-white">
      {/* Global animated background */}
      <AnimatedBackground />
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
