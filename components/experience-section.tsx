"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GradientBlob, AnimatedCircle } from "./animated-shapes"

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Experience {
  id: number
  title: string
  company: string
  period: string
  description: string
  responsibilities: string[]
  color: string
}

export default function ExperienceSection({ forwardedRef }: { forwardedRef: React.RefObject<HTMLElement> }) {
  const [activeExperience, setActiveExperience] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([])

  const experiences: Experience[] = [
    {
      id: 1,
      title: "Technical Project Manager",
      company: "Lelabo Digital",
      period: "Jan 2024 – Present",
      description:
        "Leading SEO projects and managing cross-functional teams for international clients targeting the MENA region.",
      responsibilities: [
        "Lead SEO projects for international clients targeting the MENA region",
        "Manage cross-functional teams of developers, designers, and QA specialists",
        "Serve as primary point of contact for clients and stakeholders",
        "Implement project management methodologies to ensure timely delivery",
      ],
      color: "#FF3366",
    },
    {
      id: 2,
      title: "Full Stack Development Trainer",
      company: "Park Innovation & AUF",
      period: "Nov 2022 – Jan 2024",
      description:
        "Delivered comprehensive training programs in full stack development for students with diverse backgrounds.",
      responsibilities: [
        "Delivered 900-hour training program for 20 non-CS background students",
        "Conducted 350-hour training for CS graduates on MERN stack",
        "Mentored students through complex technical challenges",
        "Developed curriculum focusing on modern web development practices",
      ],
      color: "#FF9933",
    },
    {
      id: 3,
      title: "Technical Consultant & Front-End Developer",
      company: "Mercy Corps & Saffron Souk",
      period: "May 2021 – Oct 2023",
      description:
        "Provided technical consultancy services and developed responsive front-end interfaces for e-commerce platforms.",
      responsibilities: [
        "Provided technical leadership for website launch and online visibility expansion",
        "Developed responsive front-end interfaces for e-commerce platforms",
        "Implemented digital marketing strategies to increase organic traffic",
        "Led training sessions in digital marketing and web development",
      ],
      color: "#FFCC33",
    },
    {
      id: 4,
      title: "Top Rated Freelance Front End Developer",
      company: "Upwork",
      period: "May 2020 – Nov 2023",
      description: "Developed websites for clients, utilizing web development and SEO best practices.",
      responsibilities: [
        "Managed multiple client projects simultaneously",
        "Developed websites utilizing web development best practices",
        "Achieved top-rated status for consistently delivering high-quality work",
        "Worked with various technologies including JavaScript, React, Unity, and C#",
      ],
      color: "#33CCFF",
    },
  ]

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        },
      )
    }

    // Timeline animation
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll(".timeline-item")

      timelineItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.1 * index,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
            },
          },
        )
      })
    }

    // Content animation
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 70%",
          },
        },
      )
    }
  }, [])

  // Handle experience change animation
  useEffect(() => {
    if (contentRef.current) {
      const tl = gsap.timeline()

      tl.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      })
        .set(contentRef.current, { y: -20 })
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        })
    }
  }, [activeExperience])

  return (
    <section ref={forwardedRef} className="py-20 relative overflow-hidden bg-gray-900">
      {/* Animated background elements */}
      <GradientBlob colors={["#FF3366", "#FF9933", "#33CCFF"]} size={400} className="-top-20 -left-20 opacity-20" />
      <GradientBlob
        colors={["#FFCC33", "#33CCFF", "#FF3366"]}
        size={500}
        className="bottom-0 right-0 opacity-10"
        delay={2}
      />
      <AnimatedCircle size={15} color="#FFCC33" className="absolute top-40 left-[20%] opacity-60" />
      <AnimatedCircle size={10} color="#FF3366" className="absolute bottom-40 right-[30%] opacity-60" delay={1.5} />
      <AnimatedCircle size={20} color="#33CCFF" className="absolute top-[60%] right-[15%] opacity-40" delay={2.5} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <h2
            ref={headingRef}
            className="text-5xl font-bold mb-4 inline-block pb-2 bg-clip-text text-transparent bg-gradient-to-r from-lime-400 via-teal-300 to-blue-400"
          >
            WORK EXPERIENCE
          </h2>
          <div className="w-40 h-1 bg-gradient-to-r from-lime-400 via-teal-300 to-blue-400 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline navigation */}
          <div ref={timelineRef} className="lg:col-span-1">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => (experienceRefs.current[index] = el)}
                className={`timeline-item relative pl-8 py-4 border-l-2 cursor-pointer transition-all duration-300 ${
                  activeExperience === index ? `border-[${exp.color}]` : "border-gray-700 opacity-70 hover:opacity-100"
                }`}
                onClick={() => setActiveExperience(index)}
              >
                <div
                  className={`absolute -left-[5px] top-5 w-[10px] h-[10px] rounded-full ${
                    activeExperience === index ? `bg-[${exp.color}]` : "bg-gray-700"
                  }`}
                ></div>
                <div className="mb-1">
                  <h3 className={`text-xl font-bold ${activeExperience === index ? "text-white" : "text-gray-300"}`}>
                    {exp.title}
                  </h3>
                  <p className={activeExperience === index ? `text-[${exp.color}]` : "text-gray-400"}>{exp.company}</p>
                  <p className="text-gray-400 text-sm">{exp.period}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Experience content */}
          <div ref={contentRef} className="lg:col-span-2">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2">{experiences[activeExperience].title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: experiences[activeExperience].color }}
                  ></span>
                  <p className="text-xl text-gray-300">{experiences[activeExperience].company}</p>
                </div>
                <p className="text-gray-300 mb-6">{experiences[activeExperience].description}</p>

                <h4 className="text-lg font-semibold mb-3">Key Responsibilities:</h4>
                <ul className="space-y-3">
                  {experiences[activeExperience].responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 mt-1 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: experiences[activeExperience].color }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-black"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-300">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
