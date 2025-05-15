"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// Register ScrollToPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

interface NavigationProps {
  onScrollToSection: (ref: React.RefObject<HTMLElement>) => void
  aboutRef: React.RefObject<HTMLElement>
  projectsRef: React.RefObject<HTMLElement>
  experienceRef: React.RefObject<HTMLElement>
  contactRef: React.RefObject<HTMLElement>
}

export default function Navigation({
  onScrollToSection,
  aboutRef,
  projectsRef,
  experienceRef,
  contactRef,
}: NavigationProps) {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Animate navigation on load
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 },
      )
    }

    // Handle scroll event to add background opacity
    const handleScroll = () => {
      if (navRef.current) {
        const scrollY = window.scrollY
        const opacity = Math.min(scrollY / 200, 0.9)
        navRef.current.style.backgroundColor = `rgba(0, 0, 0, ${opacity + 0.1})`
        navRef.current.style.backdropFilter = `blur(${Math.min(scrollY / 100, 8)}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Enhanced smooth scroll with GSAP
  const smoothScrollTo = (ref: React.RefObject<HTMLElement>) => {
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

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">DA.</div>
        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => gsap.to(window, { duration: 1, scrollTo: 0, ease: "power3.inOut" })}
            className="uppercase hover:text-primary"
          >
            Home
          </button>
          <button onClick={() => smoothScrollTo(aboutRef)} className="uppercase hover:text-primary">
            About
          </button>
          <button onClick={() => smoothScrollTo(projectsRef)} className="uppercase hover:text-primary">
            Projects
          </button>
          <button onClick={() => smoothScrollTo(experienceRef)} className="uppercase hover:text-primary">
            Experience
          </button>
          <button onClick={() => smoothScrollTo(contactRef)} className="uppercase hover:text-primary">
            Contact
          </button>
          <Link href="/resume" className="uppercase hover:text-primary">
            Resume
          </Link>
        </div>
        <Link
          href="mailto:hello@danielawde9.com"
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors text-sm"
        >
          hello@danielawde9.com
        </Link>
      </div>
    </nav>
  )
}
