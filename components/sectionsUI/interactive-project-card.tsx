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
    <div
      ref={cardRef}
      className="group bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-xl transition-all duration-300"
      style={{
        boxShadow: `0 10px 15px rgba(0,0,0,0.1)`,
      }}
    >
      <div className="card-content relative p-5 flex flex-col h-full">
        <div className="card-image relative w-full h-48 mb-4 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500"
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `${color}` }}
          ></div>
        </div>

        <h3 className="card-title text-xl font-bold mb-2 text-white">
          {title}
        </h3>

        <p className="text-gray-300 mb-4 flex-grow">{description}</p>

        <div className="card-tags flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs py-1 px-2 rounded-full text-black font-medium"
              style={{ backgroundColor: `${color}` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="card-buttons flex gap-3">
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-sm transition-colors"
          >
            <ExternalLink size={14} /> Demo
          </a>
          <a
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-sm transition-colors"
          >
            <Github size={14} /> Code
          </a>
        </div>
      </div>
    </div>
  );
}
