"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import { gsap } from "gsap"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  demoLink: string
  codeLink: string
  color: string
  index: number
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
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Initial animation
  useEffect(() => {
    if (!cardRef.current) return

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1 * index,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      },
    )
  }, [index])

  // Mouse move 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageRef.current || !contentRef.current) return

    // Get card dimensions and position
    const card = cardRef.current
    const { left, top, width, height } = card.getBoundingClientRect()

    // Calculate mouse position relative to card
    const x = e.clientX - left
    const y = e.clientY - top

    // Calculate rotation values based on mouse position
    const rotateY = ((x - width / 2) / width) * 10 // -10 to 10 degrees
    const rotateX = ((y - height / 2) / height) * -10 // 10 to -10 degrees

    // Apply rotation to card
    gsap.to(card, {
      rotationY: rotateY,
      rotationX: rotateX,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
    })

    // Move image slightly for parallax effect
    gsap.to(imageRef.current, {
      x: rotateY * 0.5,
      y: rotateX * 0.5,
      duration: 0.5,
      ease: "power2.out",
    })

    // Move content in opposite direction for enhanced 3D effect
    gsap.to(contentRef.current, {
      x: rotateY * -0.3,
      y: rotateX * -0.3,
      duration: 0.5,
      ease: "power2.out",
    })
  }

  // Reset card position on mouse leave
  const handleMouseLeave = () => {
    if (!cardRef.current || !imageRef.current || !contentRef.current) return

    gsap.to([cardRef.current, imageRef.current, contentRef.current], {
      rotationY: 0,
      rotationX: 0,
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    })

    setIsHovered(false)
  }

  // Hover effect
  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return

    if (isHovered) {
      // Card hover animation
      gsap.to(cardRef.current, {
        boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 20px ${color}33`,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })

      // Image hover animation
      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      })
    } else {
      // Reset animations
      gsap.to(cardRef.current, {
        boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }, [isHovered, color])

  return (
    <div
      ref={cardRef}
      className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden h-full transform-gpu"
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-video relative overflow-hidden">
        <div ref={imageRef} className="w-full h-full transform-gpu">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, ${color}99 100%)`,
              opacity: isHovered ? 0.3 : 0,
            }}
          ></div>
        </div>
      </div>

      <div ref={contentRef} className="p-6 transform-gpu">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-gray-600 text-gray-300 transition-colors duration-300"
              style={{ borderColor: isHovered ? color : "" }}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between">
          <Link
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white flex items-center group"
          >
            <ExternalLink className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:scale-110" />
            <span
              className="relative overflow-hidden"
              style={{
                background: isHovered ? `linear-gradient(to right, white, ${color})` : "",
                WebkitBackgroundClip: isHovered ? "text" : "",
                WebkitTextFillColor: isHovered ? "transparent" : "",
              }}
            >
              Demo
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: color }}
              ></span>
            </span>
          </Link>

          <Link
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white flex items-center group"
          >
            <Github className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:scale-110" />
            <span
              className="relative overflow-hidden"
              style={{
                background: isHovered ? `linear-gradient(to right, white, ${color})` : "",
                WebkitBackgroundClip: isHovered ? "text" : "",
                WebkitTextFillColor: isHovered ? "transparent" : "",
              }}
            >
              Code
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: color }}
              ></span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
