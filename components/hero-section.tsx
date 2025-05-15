"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeIn, fadeInLeft, fadeInRight, bounce } from "@/utils/animations";
import InteractiveProjectCard from "./sectionsUI/interactive-project-card";
import ProjectFilter from "./sectionsUI/project-filter";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  onScrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
  aboutRef: React.RefObject<HTMLElement | null>;
  projectsRef: React.RefObject<HTMLElement | null>;
}

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  categories: string[];
  demoLink: string;
  codeLink: string;
  color: string;
}

export default function HeroSection({
  onScrollToSection,
  aboutRef,
  projectsRef,
}: HeroSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectsListRef = useRef<HTMLDivElement>(null);

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
      demoLink:
        "https://play.google.com/store/apps/details?id=com.danielawde9.mingo",
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
      demoLink:
        "https://play.google.com/store/apps/details?id=com.danielawde9.echoesofhistory",
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
  ];

  // Filter categories
  const categories = ["All", "Web", "Mobile", "AR"];

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) =>
          project.categories.includes(activeCategory)
        );

  // Handle category change
  const handleCategoryChange = (category: string) => {
    // First fade out the projects
    if (projectsListRef.current) {
      gsap.to(projectsListRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Change the category
          setActiveCategory(category);

          // Then fade in the new projects
          setTimeout(() => {
            if (projectsListRef.current) {
              gsap.fromTo(
                projectsListRef.current.children,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.05,
                  duration: 0.5,
                  ease: "power2.out",
                }
              );
            }
          }, 100);
        },
      });
    } else {
      setActiveCategory(category);
    }
  };

  useEffect(() => {
    // Hero section animations
    const tl = gsap.timeline();

    // Title animation
    tl.add(fadeInLeft(titleRef.current!, 0.2, 1));

    // Skills animation with staggered effect
    const skills = skillsRef.current?.querySelectorAll(".skill-item");
    if (skills) {
      tl.fromTo(
        skills,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );
    }

    // Social icons animation
    tl.add(fadeIn(socialsRef.current!, 0, 0.7), "-=0.5");

    // Image animation
    tl.add(fadeInRight(imageRef.current!, 0, 1), "-=1.5");

    // CTA animation
    tl.add(fadeIn(ctaRef.current!, 0.3, 0.8), "-=0.7");

    // Bouncing arrow animation
    if (arrowRef.current) {
      bounce(arrowRef.current, 1.5);
    }

    // Projects section animations
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
        }
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-10">
                <h1
                  ref={titleRef}
                  className="text-6xl md:text-7xl xl:text-8xl font-bold leading-none tracking-tighter opacity-0 text-white"
                  style={{ fontFamily: "monospace" }}
                >
                  DANIEL
                  <br />
                  AWDE
                </h1>

                <div ref={skillsRef} className="space-y-5">
                  <div className="skill-item opacity-0 flex items-center transform hover:translate-x-2 transition-transform duration-300">
                    <span className="text-lime-400 mr-3 text-xl">=&gt;</span>
                    <span className="text-xl md:text-2xl text-gray-200">
                      Technical Leadership
                    </span>
                  </div>
                  <div className="skill-item opacity-0 flex items-center transform hover:translate-x-2 transition-transform duration-300">
                    <span className="text-lime-400 mr-3 text-xl">=&gt;</span>
                    <span className="text-xl md:text-2xl text-gray-200">
                      Project Management
                    </span>
                  </div>
                  <div className="skill-item opacity-0 flex items-center transform hover:translate-x-2 transition-transform duration-300">
                    <span className="text-lime-400 mr-3 text-xl">=&gt;</span>
                    <span className="text-xl md:text-2xl text-gray-200">
                      Software Engineering
                    </span>
                  </div>
                </div>

                <div ref={ctaRef} className="opacity-0 mt-12 space-y-6">
                  <div className="text-gray-300 mb-8 space-y-1">
                    <p className="text-lg md:text-xl">
                      TECHNICAL PROJECT MANAGER WITH 5+ YEARS OF
                    </p>
                    <p className="text-lg md:text-xl">
                      EXPERIENCE DEVELOPING INNOVATIVE SOLUTIONS
                    </p>
                    <p className="text-lg md:text-xl">
                      FROM CONCEPT TO DEPLOYMENT
                    </p>
                  </div>

                  <div className="flex items-center space-x-8">
                    <Link href="/resume">
                      <Button
                        size="lg"
                        className="bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-full px-10 py-6 text-lg transition-all duration-300 transform hover:scale-105"
                      >
                        HIRE ME
                      </Button>
                    </Link>

                    <div ref={socialsRef} className="flex space-x-6 opacity-0">
                      <Link
                        href="https://github.com/danielawde9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform hover:scale-110 transition-transform duration-300"
                      >
                        <Github className="w-7 h-7 text-gray-300 hover:text-lime-400 transition-colors" />
                      </Link>
                      <Link
                        href="https://linkedin.com/in/danielawde9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform hover:scale-110 transition-transform duration-300"
                      >
                        <Linkedin className="w-7 h-7 text-gray-300 hover:text-lime-400 transition-colors" />
                      </Link>
                      <Link
                        href="mailto:hello@danielawde9.com"
                        className="transform hover:scale-110 transition-transform duration-300"
                      >
                        <Mail className="w-7 h-7 text-gray-300 hover:text-lime-400 transition-colors" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div ref={imageRef} className="order-1 lg:order-2 opacity-0">
              <div className="relative mx-auto max-w-md lg:max-w-full">
                <div className="relative z-10 overflow-hidden rounded-2xl p-2 bg-gradient-to-br from-lime-400/20 to-blue-500/20">
                  <Image
                    src="/images/daniel_awde.jpg"
                    alt="Daniel Awde"
                    width={600}
                    height={700}
                    className="rounded-xl object-cover mx-auto h-auto w-full shadow-2xl transform hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/40 via-purple-500/40 to-blue-600/40 blur-3xl opacity-70 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-20">
            <button
              ref={arrowRef}
              onClick={() => onScrollToSection(projectsRef)}
              className="text-white bg-black/50 p-4 rounded-full backdrop-blur-sm border border-gray-800 hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-110"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <section ref={projectsRef} className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-12 text-center">
            <h2
              ref={headingRef}
              className="text-5xl font-bold mb-4 inline-block pb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FF3366] via-[#FFCC33] to-[#33CCFF]"
            >
              FEATURED PROJECTS
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-primary via-[#FFCC33] to-[#33CCFF] mx-auto mt-2 mb-8"></div>
            <p
              ref={descriptionRef}
              className="max-w-3xl mx-auto text-white text-lg"
            >
              A selection of projects I've developed and led throughout my
              career.
            </p>
          </div>

          {/* Project filter */}
          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Projects grid */}
          <div
            ref={projectsListRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
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
    </>
  );
}
