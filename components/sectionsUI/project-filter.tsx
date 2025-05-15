"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ProjectFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProjectFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: ProjectFilterProps) {
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filterRef.current) {
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: filterRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={filterRef}
      className="flex flex-wrap justify-center gap-3 mb-10 opacity-0"
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? "bg-gradient-to-r from-[#FF3366] via-[#FFCC33] to-[#33CCFF] text-black"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
