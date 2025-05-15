"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { createScrollTrigger } from "@/utils/animations"

export default function ExperienceSection({ forwardedRef }: { forwardedRef: React.RefObject<HTMLElement> }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

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

    // Timeline items animation
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll(".timeline-item")
      timelineItems.forEach((item, index) => {
        const itemAnim = gsap.fromTo(
          item,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.2 * index,
          },
        )
        createScrollTrigger(item, itemAnim)
      })
    }
  }, [])

  return (
    <section ref={forwardedRef} className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 ref={headingRef} className="text-4xl font-bold mb-4 inline-block border-b-4 border-lime-400 pb-2">
            WORK EXPERIENCE
          </h2>
          <p ref={descriptionRef} className="max-w-3xl mx-auto mt-6 text-gray-300">
            My journey as a software engineer, tech leader, and project manager.
          </p>
        </div>

        <div ref={timelineRef} className="space-y-12 max-w-4xl mx-auto">
          <div className="relative pl-8 border-l-2 border-lime-400 timeline-item">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-lime-400"></div>
            <div className="mb-1">
              <h3 className="text-xl font-bold">Technical Project Manager</h3>
              <p className="text-lime-400">Lelabo Digital</p>
              <p className="text-gray-400 text-sm">Jan 2024 – Present</p>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Lead SEO projects for international clients targeting the MENA region</li>
              <li>Manage cross-functional teams of developers, designers, and QA specialists</li>
              <li>Serve as primary point of contact for clients and stakeholders</li>
              <li>Implement project management methodologies to ensure timely delivery</li>
            </ul>
          </div>

          <div className="relative pl-8 border-l-2 border-lime-400 timeline-item">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-lime-400"></div>
            <div className="mb-1">
              <h3 className="text-xl font-bold">Full Stack Development Trainer</h3>
              <p className="text-lime-400">Park Innovation & AUF</p>
              <p className="text-gray-400 text-sm">Nov 2022 – Jan 2024</p>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Delivered 900-hour training program for 20 non-CS background students</li>
              <li>Conducted 350-hour training for CS graduates on MERN stack</li>
              <li>Mentored students through complex technical challenges</li>
              <li>Developed curriculum focusing on modern web development practices</li>
            </ul>
          </div>

          <div className="relative pl-8 border-l-2 border-lime-400 timeline-item">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-lime-400"></div>
            <div className="mb-1">
              <h3 className="text-xl font-bold">Technical Consultant & Front-End Developer</h3>
              <p className="text-lime-400">Mercy Corps & Saffron Souk</p>
              <p className="text-gray-400 text-sm">May 2021 – Oct 2023</p>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Provided technical leadership for website launch and online visibility expansion</li>
              <li>Developed responsive front-end interfaces for e-commerce platforms</li>
              <li>Implemented digital marketing strategies to increase organic traffic</li>
              <li>Led training sessions in digital marketing and web development</li>
            </ul>
          </div>

          <div className="relative pl-8 border-l-2 border-lime-400 timeline-item">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-lime-400"></div>
            <div className="mb-1">
              <h3 className="text-xl font-bold">Top Rated Freelance Front End Developer</h3>
              <p className="text-lime-400">Upwork</p>
              <p className="text-gray-400 text-sm">May 2020 – Nov 2023</p>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Managed multiple client projects simultaneously</li>
              <li>Developed websites utilizing web development best practices</li>
              <li>Achieved top-rated status for consistently delivering high-quality work</li>
              <li>Worked with various technologies including JavaScript, React, Unity, and C#</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
