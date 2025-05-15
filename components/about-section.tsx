"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

// Hardcoded skill levels for deterministic SSR/CSR rendering
const skillLevels: Record<string, number> = {
  JavaScript: 97,
  TypeScript: 92,
  React: 95,
  "Node.js": 90,
  "Next.js": 90,
  "HTML/CSS": 98,
  Unity: 85,
  "C#": 88,
  "AR Foundation": 80,
  Kotlin: 75,
  Firebase: 85,
  MongoDB: 80,
  MySQL: 78,
  Express: 82,
  "REST APIs": 87,
  Agile: 95,
  "Team Leadership": 93,
  "Project Management": 94,
  "Stakeholder Management": 92,
};

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
  const sectionRef = useRef<HTMLElement>(null);
  const cardElements = useRef<(HTMLElement | null)[]>([]);
  const progressBars = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Create parallax scrolling effect
    if (sectionRef.current) {
      const cards = cardsRef.current?.querySelectorAll(".skill-card") || [];

      // Create a scroll-triggered animation
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            rotateY: 10,
            rotateX: 10,
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
            delay: index * 0.1,
          }
        );
      });

      // Heading animation with split text effect
      if (headingRef.current) {
        const chars = headingRef.current.textContent?.split("") || [];
        headingRef.current.innerHTML = "";

        chars.forEach((char, index) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          headingRef.current?.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.03 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
            },
          });
        });
      }
    }

    // Description animation with improved effect
    if (descriptionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 30,
          rotateX: 20,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Category tabs animation with improved staggered effect
    if (categoryRefs.current.length > 0) {
      gsap.fromTo(
        categoryRefs.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.5,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Add mousemove parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardsRef.current) return;

      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 10;
      const yPos = (clientY / window.innerHeight - 0.5) * 10;

      cardElements.current.forEach((card) => {
        if (card) {
          gsap.to(card, {
            rotateY: xPos * 0.5,
            rotateX: -yPos * 0.5,
            transformPerspective: 1000,
            duration: 0.8,
            ease: "power1.out",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animate progress bars when in view
    if (progressBars.current.length > 0) {
      progressBars.current.forEach((bar, index) => {
        if (bar) {
          const level = parseInt(bar.getAttribute("data-level") || "0");
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${level}%`,
              duration: 1.5,
              ease: "power2.out",
              delay: 0.1 * index,
              scrollTrigger: {
                trigger: bar,
                start: "top 90%",
              },
            }
          );
        }
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle category change animation with more advanced effects
  useEffect(() => {
    if (skillsRef.current) {
      const tl = gsap.timeline();
      const skillElements = skillsRef.current.querySelectorAll(".skill-tag");

      // Exit animation for previous skills
      tl.to(skillElements, {
        opacity: 0,
        y: -20,
        scale: 0.9,
        stagger: 0.02,
        duration: 0.3,
        ease: "power2.in",
      })
        .set(skillsRef.current, { opacity: 0 })
        .call(() => {
          // After animation completes, change the category and then animate in the new skills
          const newSkillElements =
            skillsRef.current?.querySelectorAll(".skill-tag");
          if (newSkillElements) {
            tl.set(newSkillElements, { y: 20, opacity: 0, scale: 0.9 })
              .to(skillsRef.current, { opacity: 1, duration: 0.1 })
              .to(newSkillElements, {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.05,
                duration: 0.5,
                ease: "back.out(1.7)",
              });
          }
        });
    }
  }, [activeCategory]);

  return (
    <section
      ref={(el) => {
        // Assign to both refs
        if (forwardedRef && "current" in forwardedRef) {
          forwardedRef.current = el;
        }
        sectionRef.current = el;
      }}
      className="py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        {[
          { width: 500, height: 500, top: 15, left: 10, color: "163,230,53" },
          { width: 600, height: 600, top: 60, left: 80, color: "255,51,102" },
          { width: 400, height: 400, top: 40, left: 50, color: "51,204,255" },
        ].map((item, i) => (
          <div
            key={`about-bg-${i}`}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${item.width}px`,
              height: `${item.height}px`,
              background: `radial-gradient(circle, rgba(${item.color},0.2) 0%, rgba(0,0,0,0) 70%)`,
              top: `${item.top}%`,
              left: `${item.left}%`,
              filter: "blur(100px)",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <h2
            ref={headingRef}
            className="text-5xl font-bold mb-4 inline-block pb-2 text-white"
          >
            ABOUT ME
          </h2>
          <div className="w-40 h-1 bg-gradient-to-r from-lime-400 via-[#FF9933] to-[#33CCFF] mx-auto mt-2 mb-8"></div>
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
          <div
            className="skill-card"
            ref={(el) => {
              if (el) cardElements.current[0] = el;
            }}
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
          </div>

          <div
            className="skill-card"
            ref={(el) => {
              if (el) cardElements.current[1] = el;
            }}
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
          </div>

          <div
            className="skill-card"
            ref={(el) => {
              if (el) cardElements.current[2] = el;
            }}
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
              title="Project Management"
              description="Skilled in Agile methodologies, stakeholder management, and delivering projects on time."
              color="#FFCC33"
              delay={0.3}
            />
          </div>

          <div
            className="skill-card"
            ref={(el) => {
              if (el) cardElements.current[3] = el;
            }}
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
        </div>

        {/* Skills section with tabs */}
        <div className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-gray-800 shadow-xl">
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
                    ? "text-black font-medium scale-105 shadow-lg"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700"
                }`}
                style={{
                  backgroundColor:
                    activeCategory === index ? category.color : "",
                }}
                onClick={() => setActiveCategory(index)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Skills tags */}
          <div ref={skillsRef} className="flex flex-wrap justify-center gap-3">
            {skillCategories[activeCategory].skills.map((skill, index) => {
              const level = skillLevels[skill] ?? 80; // Use hardcoded level or fallback
              return (
                <div key={skill} className="skill-tag w-full sm:w-auto">
                  <div className="bg-gray-800/60 rounded-lg p-3 relative overflow-hidden group hover:scale-105 transition-transform">
                    <div className="relative z-10">
                      <div className="text-white font-medium mb-2">{skill}</div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          ref={(el) => {
                            if (el) progressBars.current.push(el);
                          }}
                          data-level={level}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor:
                              skillCategories[activeCategory].color,
                            width: "0%",
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-400">
                          Proficiency
                        </span>
                        <span className="text-xs text-gray-300">{level}%</span>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{
                        backgroundColor: skillCategories[activeCategory].color,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
