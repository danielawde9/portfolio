"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface SplitTextProps {
  children: React.ReactNode
  stagger?: number
  duration?: number
  delay?: number
}

export function SplitText({ children, stagger = 0.03, duration = 0.5, delay = 0 }: SplitTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    // Get all the elements that need to be split
    const elements = textRef.current.querySelectorAll("h1, h2, h3, h4, h5, h6, p")

    elements.forEach((element) => {
      // Get the original text
      const text = element.textContent || ""
      // Clear the element
      element.textContent = ""

      // Create a wrapper for the characters
      const wrapper = document.createElement("span")
      wrapper.style.display = "inline-block"
      element.appendChild(wrapper)

      // Split the text into characters and create spans
      const chars = text.split("")
      const charElements = chars.map((char) => {
        const span = document.createElement("span")
        span.textContent = char
        span.style.display = "inline-block"
        span.style.opacity = "0"
        span.style.transform = "translateY(20px)"
        return span
      })

      // Add the character spans to the wrapper
      charElements.forEach((span) => {
        wrapper.appendChild(span)
      })

      // Animate the characters
      gsap.to(charElements, {
        opacity: 1,
        y: 0,
        stagger,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
        },
      })
    })

    return () => {
      // Cleanup if needed
    }
  }, [stagger, duration, delay])

  return <div ref={textRef}>{children}</div>
}
