"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GradientBlob, AnimatedCircle } from "./sectionsUI/animated-shapes";
import SkillCard from "./sectionsUI/skill-card";
import SkillTag from "./sectionsUI/skill-tag";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Skill categories with colors
const skillCategories = [
  {
    name: "Development",
    color: "#FF3366",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Next.js",
      "HTML/CSS",
    ],
  },
  {
    name: "AR/Mobile",
    color: "#FF9933",
    skills: ["Unity", "C#", "AR Foundation", "Kotlin", "Firebase"],
  },
  {
    name: "Backend",
    color: "#FFCC33",
    skills: ["MongoDB", "MySQL", "Express", "REST APIs", "Firebase"],
  },
  {
    name: "Management",
    color: "#33CCFF",
    skills: [
      "Agile",
      "Team Leadership",
      "Project Management",
      "Stakeholder Management",
    ],
  },
];

interface AboutSectionProps {
  forwardedRef: React.RefObject<HTMLElement | null>;
}

export default function AboutSection({ forwardedRef }: AboutSectionProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
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
        }
      );
    }

    // Category tabs animation
    if (categoryRefs.current.length > 0) {
      gsap.fromTo(
        categoryRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(1.7)",
          delay: 0.4,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  // Handle category change animation
  useEffect(() => {
    if (skillsRef.current) {
      const tl = gsap.timeline();

      tl.to(skillsRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power2.in",
      })
        .set(skillsRef.current, { y: -10 })
        .to(skillsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
    }
  }, [activeCategory]);

  return (
    <section ref={forwardedRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <h2
            ref={headingRef}
            className="text-5xl font-bold mb-4 inline-block pb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#FF9933] to-[#33CCFF]"
          >
            ABOUT ME
          </h2>
          <div className="w-40 h-1 bg-gradient-to-r from-primary via-[#FF9933] to-[#33CCFF] mx-auto mt-2 mb-8"></div>
          <p
            ref={descriptionRef}
            className="max-w-3xl mx-auto text-white text-lg"
          >
            I'm a skilled Software Engineer and Project Manager with expertise
            in web and mobile application development, including augmented
            reality technologies. I combine technical solutions with marketing
            strategies to improve user experiences and business outcomes.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <SkillCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 16.98h-5.99c-1.66 0-3.01-1.34-3.01-3s1.34-3 3.01-3H18" />
                <path d="M6 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
                <path d="M10 17v4" />
                <path d="M14 17v4" />
              </svg>
            }
            title="Technical Expertise"
            description="Proficient in web, mobile, and AR development with a focus on creating innovative solutions."
            color="#FF3366"
            delay={0.1}
          />

          <SkillCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            title="Team Leadership"
            description="Experience leading cross-functional teams and mentoring junior developers to achieve project goals."
            color="#FF9933"
            delay={0.2}
          />

          <SkillCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
            title="Project Management"
            description="Skilled in Agile methodologies, stakeholder management, and delivering projects on time."
            color="#FFCC33"
            delay={0.3}
          />

          <SkillCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            }
            title="Problem Solving"
            description="Engineering background with a passion for solving complex technical challenges."
            color="#33CCFF"
            delay={0.4}
          />
        </div>

        {/* Skills section with tabs */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">
            Technical Skills
          </h3>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {skillCategories.map((category, index) => (
              <button
                key={index}
                ref={(el) => {
                  categoryRefs.current[index] = el;
                }}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-gradient-to-r text-white font-medium scale-105"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                }`}
                style={{
                  backgroundImage:
                    activeCategory === index
                      ? `linear-gradient(to right, ${category.color}, ${category.color}CC)`
                      : "none",
                }}
                onClick={() => setActiveCategory(index)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Skills tags */}
          <div ref={skillsRef} className="flex flex-wrap justify-center gap-3">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <SkillTag
                key={skill}
                name={skill}
                level={Math.floor(Math.random() * 30) + 70} // Random level between 70-100
                color={skillCategories[activeCategory].color}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
