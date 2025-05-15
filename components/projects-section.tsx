"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GradientBlob, AnimatedCircle } from "./animated-shapes"
import InteractiveProjectCard from "./interactive-project-card"
import ProjectFilter from "./project-filter"
import { SplitText } from "./split-text"

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Project interface
interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  categories: string[]
  demoLink: string
  codeLink: string
  color: string
}

export default function ProjectsSection({ forwardedRef }: { forwardedRef: React.RefObject<HTMLElement> }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  // Project data
  const projects: Project[] = [
    {
      id: 1,
      title: "Mingo App",
      description:
        "An open-source AR-based educational app inspired by Kahoot, aiming to gamify learning experiences for students and teachers. Published on Google Play Store.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Unity", "C#", "Firebase", "AR Foundation"],
      categories: ["Mobile", "AR"],
      demoLink: "https://play.google.com/store/apps/details?id=com.danielawde9.mingo",
      codeLink: "https://github.com/danielawde9",
      color: "#FF3366",
    },
    {
      id: 2,
      title: "Echoes Of History",
      description:
        "Augmented Reality (AR) application to showcase the Kfarmatta Silk Mill in Lebanon, featuring a 3D scanned reconstruction of the site's historical and current states.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Unity", "C#", "Firebase", "AR Foundation"],
      categories: ["Mobile", "AR"],
      demoLink: "https://play.google.com/store/apps/details?id=com.danielawde9.echoesofhistory",
      codeLink: "https://github.com/danielawde9",
      color: "#FF9933",
    },
    {
      id: 3,
      title: "SEO Projects for MENA Clients",
      description:
        "Undertook SEO projects for international clients targeting the MENA region, focusing on on-page and off-page SEO using content, trending topics, and localization.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["SEO", "Content Strategy", "WordPress", "Google Analytics"],
      categories: ["Web"],
      demoLink: "#",
      codeLink: "#",
      color: "#FFCC33",
    },
    {
      id: 4,
      title: "E-commerce Platform",
      description:
        "Developed a full-featured e-commerce platform with product management, user authentication, payment processing, and order tracking functionality.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      categories: ["Web"],
      demoLink: "#",
      codeLink: "#",
      color: "#33CCFF",
    },
    {
      id: 5,
      title: "Portfolio Website",
      description:
        "Modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and interactive elements.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "Tailwind CSS", "GSAP", "TypeScript"],
      categories: ["Web"],
      demoLink: "#",
      codeLink: "#",
      color: "#9966FF",
    },
    {
      id: 6,
      title: "AR Navigation App",
      description:
        "Mobile application that uses augmented reality to provide real-time navigation guidance in indoor environments like shopping malls and museums.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Unity", "ARKit", "ARCore", "C#"],
      categories: ["Mobile", "AR"],
      demoLink: "#",
      codeLink: "#",
      color: "#66CC99",
    },
  ]

  // Filter categories
  const categories = ["All", "Web", "Mobile", "AR"]

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.categories.includes(activeCategory))

  // Handle category change
  const handleCategoryChange = (category: string) => {
    // First fade out the projects
    if (projectsRef.current) {
      gsap.to(projectsRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Change the category
          setActiveCategory(category)

          // Then fade in the new projects
          setTimeout(() => {
            if (projectsRef.current) {
              gsap.fromTo(
                projectsRef.current.children,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.05,
                  duration: 0.5,
                  ease: "power2.out",
                },
              )
            }
          }, 100)
        },
      })
    } else {
      setActiveCategory(category)
    }
  }

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

    // Description animation
    if (descriptionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  return (
    <section ref={forwardedRef} className="py-20 relative overflow-hidden bg-black">
      {/* Animated background elements */}
      <GradientBlob colors={["#FF3366", "#9966FF", "#33CCFF"]} size={500} className="-left-40 top-20 opacity-10" />
      <GradientBlob
        colors={["#FFCC33", "#66CC99", "#FF9933"]}
        size={400}
        className="bottom-0 right-0 opacity-10"
        delay={2}
      />
      <AnimatedCircle size={10} color="#FF3366" className="absolute top-60 right-[15%] opacity-40" />
      <AnimatedCircle size={15} color="#FFCC33" className="absolute bottom-40 left-[25%] opacity-30" delay={1.5} />
      <AnimatedCircle size={8} color="#33CCFF" className="absolute top-[30%] left-[10%] opacity-40" delay={2.5} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <SplitText>
            <h2
              ref={headingRef}
              className="text-5xl font-bold mb-4 inline-block pb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FF3366] via-[#FFCC33] to-[#33CCFF]"
            >
              FEATURED PROJECTS
            </h2>
          </SplitText>
          <div className="w-40 h-1 bg-gradient-to-r from-[#FF3366] via-[#FFCC33] to-[#33CCFF] mx-auto mt-2 mb-8"></div>
          <p ref={descriptionRef} className="max-w-3xl mx-auto text-gray-300 text-lg">
            A selection of projects I've developed and led throughout my career.
          </p>
        </div>

        {/* Project filter */}
        <ProjectFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Projects grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <InteractiveProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              demoLink={project.demoLink}
              codeLink={project.codeLink}
              color={project.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
