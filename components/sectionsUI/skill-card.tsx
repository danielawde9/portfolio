"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

export default function SkillCard({
  icon,
  title,
  description,
  color,
  delay = 0,
}: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Initial animation
  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    );
  }, [delay]);

  // Hover animations
  useEffect(() => {
    if (!cardRef.current || !iconRef.current || !contentRef.current) return;

    if (isHovered) {
      // Card hover animation
      gsap.to(cardRef.current, {
        y: -10,
        scale: 1.03,
        boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 15px ${color}33`,
        duration: 0.3,
        ease: "power2.out",
      });

      // Icon animation
      gsap.to(iconRef.current, {
        y: -8,
        scale: 1.1,
        backgroundColor: color,
        color: "#000",
        duration: 0.4,
        ease: "back.out(1.7)",
      });

      // Content animation
      gsap.to(contentRef.current, {
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Reset animations
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(iconRef.current, {
        y: 0,
        scale: 1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        color: color,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(contentRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHovered, color]);

  return (
    <div
      ref={cardRef}
      className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: "translateY(0)" }} // Initial state for GSAP
    >
      <div
        ref={iconRef}
        className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 transition-all duration-300"
        style={{ color }}
      >
        {icon}
      </div>
      <div ref={contentRef}>
        <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-secondary dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
