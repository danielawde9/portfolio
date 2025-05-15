"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface InteractiveProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
  color: string;
  index: number;
}

export default function InteractiveProjectCard({
  title,
  description,
  image,
  tags,
  demoLink,
  codeLink,
  color,
  index,
}: InteractiveProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1 * index,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        },
      }
    );
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className="group bg-black bg-opacity-50 border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 opacity-0"
      whileHover={{
        scale: 1.03,
        boxShadow: `0 10px 30px -10px ${color}40`,
      }}
    >
      <div className="relative h-48 overflow-hidden">
        {/* Placeholder image with color overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${color}30, ${color}90)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs font-medium rounded-full"
              style={{ backgroundColor: `${color}30`, color: `${color}` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-300 mb-6 text-sm">{description}</p>

        <div className="flex justify-between items-center">
          <Link
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors"
          >
            <ExternalLink size={16} />
            <span className="text-sm">Demo</span>
          </Link>

          <Link
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors"
          >
            <Github size={16} />
            <span className="text-sm">Code</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
