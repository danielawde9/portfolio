"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface ProjectFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function ProjectFilter({ categories, activeCategory, onCategoryChange }: ProjectFilterProps) {
  const filterRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Initial animation
  useEffect(() => {
    if (!filterRef.current) return

    gsap.fromTo(
      filterRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: filterRef.current,
          start: "top 80%",
        },
      },
    )
  }, [])

  // Animate the indicator when category changes
  useEffect(() => {
    if (!indicatorRef.current) return

    const activeIndex = categories.indexOf(activeCategory)
    if (activeIndex === -1 || !buttonRefs.current[activeIndex]) return

    const activeButton = buttonRefs.current[activeIndex]
    const { width, left } = activeButton!.getBoundingClientRect()
    const filterLeft = filterRef.current!.getBoundingClientRect().left

    gsap.to(indicatorRef.current, {
      width: width,
      x: left - filterLeft,
      backgroundColor: getColorForCategory(activeCategory),
      duration: 0.4,
      ease: "power2.out",
    })
  }, [activeCategory, categories])

  // Get color based on category
  const getColorForCategory = (category: string): string => {
    switch (category) {
      case "All":
        return "#33CCFF"
      case "Web":
        return "#FF3366"
      case "Mobile":
        return "#FF9933"
      case "AR":
        return "#FFCC33"
      default:
        return "#33CCFF"
    }
  }

  return (
    <div ref={filterRef} className="flex justify-center mb-8 relative">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-1 relative">
        {/* Animated indicator */}
        <div
          ref={indicatorRef}
          className="absolute h-8 rounded-full z-0 opacity-20 transition-all duration-300"
          style={{ backgroundColor: "#33CCFF" }}
        ></div>

        {/* Filter buttons */}
        {categories.map((category, index) => (
          <button
            key={category}
            ref={(el) => (buttonRefs.current[index] = el)}
            className={`relative z-10 px-5 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeCategory === category ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
