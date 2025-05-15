"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface SkillTagProps {
  name: string;
  level?: number;
  color?: string;
  delay?: number;
}

export default function SkillTag({
  name,
  level = 85,
  color = "#33CCFF",
  delay = 0,
}: SkillTagProps) {
  const tagRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showLevel, setShowLevel] = useState(false);

  // Initial animation
  useEffect(() => {
    if (!tagRef.current) return;

    gsap.fromTo(
      tagRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        delay,
        scrollTrigger: {
          trigger: tagRef.current,
          start: "top 90%",
        },
      }
    );
  }, [delay]);

  // Progress animation on hover
  useEffect(() => {
    if (!progressRef.current) return;

    if (showLevel) {
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: `${level}%`,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(progressRef.current, {
        width: "0%",
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [showLevel, level]);

  // Hover animation
  useEffect(() => {
    if (!tagRef.current) return;

    if (isHovered) {
      gsap.to(tagRef.current, {
        scale: 1.05,
        backgroundColor: color,
        color: "#000",
        duration: 0.3,
        ease: "power2.out",
      });

      // Show level after a short delay
      const timer = setTimeout(() => setShowLevel(true), 200);
      return () => clearTimeout(timer);
    } else {
      gsap.to(tagRef.current, {
        scale: 1,
        backgroundColor: "rgba(31, 41, 55, 0.7)",
        color: "#fff",
        duration: 0.3,
        ease: "power2.out",
      });

      setShowLevel(false);
    }
  }, [isHovered, color]);

  return (
    <div
      ref={tagRef}
      className="relative py-2 px-4 rounded-full bg-gray-800/70 backdrop-blur-sm text-sm font-medium cursor-pointer overflow-hidden text-foreground"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{name}</span>
      <div
        ref={progressRef}
        className="absolute left-0 top-0 bottom-0 rounded-full opacity-50"
        style={{ backgroundColor: color, width: "0%" }}
      ></div>
    </div>
  );
}
