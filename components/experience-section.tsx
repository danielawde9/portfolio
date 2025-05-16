"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Timeline } from "./sectionsUI/timeline";
import experiences from "./data/experiences";
import ExperienceItem from "./sectionsUI/experience-item";
import { Experience } from "./sectionsUI/experience-item";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceSectionProps {
  forwardedRef: React.RefObject<HTMLElement | null>;
}

export default function ExperienceSection({
  forwardedRef,
}: ExperienceSectionProps) {
  const [activeExperience, setActiveExperience] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Create timeline data format
  const timelineData = (experiences as Experience[]).map((exp: Experience) => ({
    title: exp.period,
    periodColor: exp.color,
    content: (
      <ExperienceItem
        key={exp.id}
        experience={exp}
        setActiveExperience={setActiveExperience}
      />
    ),
  }));

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
        }
      );
    }

    // Timeline animation
    if (timelineRef.current) {
      const timelineItems =
        timelineRef.current.querySelectorAll(".timeline-item");

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
          }
        );
      });
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
        }
      );
    }
  }, []);

  return (
    <section ref={forwardedRef} className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <h2
            ref={headingRef}
            className="text-5xl font-bold mb-4 inline-block pb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-teal-300 to-blue-400"
          >
            WORK EXPERIENCE
          </h2>
          <div className="w-40 h-1 bg-gradient-to-r from-primary via-teal-300 to-blue-400 mx-auto mt-2"></div>
        </div>

        <div className="relative w-full overflow-clip" ref={timelineRef}>
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
}
