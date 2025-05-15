"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { fadeIn, fadeInLeft, fadeInRight, bounce } from "@/utils/animations"

interface HeroSectionProps {
  onScrollToSection: (ref: React.RefObject<HTMLElement>) => void
  aboutRef: React.RefObject<HTMLElement>
}

export default function HeroSection({ onScrollToSection, aboutRef }: HeroSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Title animation
    tl.add(fadeInLeft(titleRef.current!, 0.2, 1))

    // Skills animation with staggered effect
    const skills = skillsRef.current?.querySelectorAll(".skill-item")
    if (skills) {
      tl.fromTo(
        skills,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 0.7, ease: "power3.out" },
        "-=0.5",
      )
    }

    // Social icons animation
    tl.add(fadeIn(socialsRef.current!, 0, 0.7), "-=0.5")

    // Image animation
    tl.add(fadeInRight(imageRef.current!, 0, 1), "-=1.5")

    // CTA animation
    tl.add(fadeIn(ctaRef.current!, 0.3, 0.8), "-=0.7")

    // Bouncing arrow animation
    if (arrowRef.current) {
      bounce(arrowRef.current, 1.5)
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section className="min-h-screen pt-24 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter opacity-0"
              style={{ fontFamily: "monospace" }}
            >
              DANIEL
              <br />
              AWDE
            </h1>

            <div ref={skillsRef} className="space-y-4 mb-8">
              <div className="flex items-center skill-item opacity-0">
                <span className="text-lime-400 mr-2">=&gt;</span>
                <span className="text-xl md:text-2xl">Technical Leadership</span>
              </div>
              <div className="flex items-center skill-item opacity-0">
                <span className="text-lime-400 mr-2">=&gt;</span>
                <span className="text-xl md:text-2xl">Project Management</span>
              </div>
              <div className="flex items-center skill-item opacity-0">
                <span className="text-lime-400 mr-2">=&gt;</span>
                <span className="text-xl md:text-2xl">Software Engineering</span>
              </div>
            </div>

            <div ref={socialsRef} className="flex space-x-4 mb-8 opacity-0">
              <Link href="https://github.com/danielawde9" target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6" />
              </Link>
              <Link href="https://linkedin.com/in/danielawde9" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="mailto:hello@danielawde9.com">
                <Mail className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div ref={imageRef} className="relative opacity-0">
            <div className="relative z-10">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Daniel Awde"
                width={500}
                height={600}
                className="rounded-lg mx-auto"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur-3xl -z-10"></div>
          </div>
        </div>

        <div ref={ctaRef} className="text-right mt-8 opacity-0">
          <div className="mb-4 text-right">
            <p className="text-lg md:text-xl">TECHNICAL PROJECT MANAGER WITH 5+ YEARS</p>
            <p className="text-lg md:text-xl">OF EXPERIENCE IN DEVELOPING</p>
            <p className="text-lg md:text-xl">INNOVATIVE SOLUTIONS FROM</p>
            <p className="text-lg md:text-xl">CONCEPT TO DEPLOYMENT</p>
          </div>

          <Link href="/resume">
            <Button size="lg" className="bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-full px-8">
              HIRE ME
            </Button>
          </Link>
        </div>

        <div className="flex justify-center mt-16">
          <button ref={arrowRef} onClick={() => onScrollToSection(aboutRef)} className="text-white">
            <ArrowDown className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  )
}
