"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { gsap } from "gsap"
import { createScrollTrigger } from "@/utils/animations"

export default function AboutSection({ forwardedRef }: { forwardedRef: React.RefObject<HTMLElement> }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      const headingAnim = gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )
      createScrollTrigger(headingRef.current, headingAnim)
    }

    // Description animation
    if (descriptionRef.current) {
      const descAnim = gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )
      createScrollTrigger(descriptionRef.current, descAnim)
    }

    // Cards animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".card-item")
      cards.forEach((card, index) => {
        const cardAnim = gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 * index },
        )
        createScrollTrigger(card, cardAnim)
      })
    }

    // Skills animation
    if (skillsRef.current) {
      const skills = skillsRef.current.querySelectorAll(".skill-badge")
      const skillsAnim = gsap.fromTo(
        skills,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
      )
      createScrollTrigger(skillsRef.current, skillsAnim)
    }
  }, [])

  return (
    <section ref={forwardedRef} className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 ref={headingRef} className="text-4xl font-bold mb-4 inline-block border-b-4 border-lime-400 pb-2">
            ABOUT ME
          </h2>
          <p ref={descriptionRef} className="max-w-3xl mx-auto mt-6 text-gray-300">
            I'm a skilled Software Engineer and Project Manager with expertise in web and mobile application
            development, including augmented reality technologies. I combine technical solutions with marketing
            strategies to improve user experiences and business outcomes.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gray-800 border-gray-700 h-full card-item">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-lime-400/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-lime-400"
                >
                  <path d="M18 16.98h-5.99c-1.66 0-3.01-1.34-3.01-3s1.34-3 3.01-3H18" />
                  <path d="M6 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
                  <path d="M10 17v4" />
                  <path d="M14 17v4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Technical Expertise</h3>
              <p className="text-gray-400">
                Proficient in web, mobile, and AR development with a focus on creating innovative solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 h-full card-item">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-lime-400/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-lime-400"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Team Leadership</h3>
              <p className="text-gray-400">
                Experience leading cross-functional teams and mentoring junior developers to achieve project goals.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 h-full card-item">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-lime-400/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-lime-400"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Project Management</h3>
              <p className="text-gray-400">
                Skilled in Agile methodologies, stakeholder management, and delivering projects on time.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 h-full card-item">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-lime-400/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-lime-400"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Problem Solving</h3>
              <p className="text-gray-400">
                Engineering background with a passion for solving complex technical challenges.
              </p>
            </CardContent>
          </Card>
        </div>

        <div ref={skillsRef} className="flex flex-wrap justify-center gap-2">
          {[
            "JavaScript",
            "TypeScript",
            "React",
            "Node.js",
            "Unity",
            "C#",
            "AR Foundation",
            "Firebase",
            "MongoDB",
            "MySQL",
            "WordPress",
            "SEO",
            "Agile",
            "Team Leadership",
          ].map((skill, index) => (
            <Badge key={index} className="bg-gray-800 text-gray-200 hover:bg-gray-700 text-sm py-1.5 px-3 skill-badge">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
