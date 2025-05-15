"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// Register ScrollToPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

export default function Home() {
  // Refs for scrolling
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Enhanced smooth scroll with GSAP
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const targetPosition = ref.current.getBoundingClientRect().top + window.scrollY

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetPosition,
          autoKill: false,
        },
        ease: "power3.inOut",
      })
    }
  }

  useEffect(() => {
    // Initial page load animation
    gsap.fromTo("body", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.inOut" })
  }, [])

  return (
    <main className="bg-black text-white">
      <Navigation
        onScrollToSection={scrollToSection}
        aboutRef={aboutRef}
        projectsRef={projectsRef}
        experienceRef={experienceRef}
        contactRef={contactRef}
      />
      <HeroSection onScrollToSection={scrollToSection} aboutRef={aboutRef} />
      <AboutSection forwardedRef={aboutRef} />
      <ProjectsSection forwardedRef={projectsRef} />
      <ExperienceSection forwardedRef={experienceRef} />
      <ContactSection forwardedRef={contactRef} />
      <Footer />
    </main>
  )
}
