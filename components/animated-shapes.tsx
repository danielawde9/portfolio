"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function FloatingShape({
  className,
  delay = 0,
}: {
  className: string
  delay?: number
}) {
  const shapeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!shapeRef.current) return

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "sine.inOut" },
    })

    tl.to(shapeRef.current, {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      duration: "random(4, 8)",
      delay,
    })

    return () => {
      tl.kill()
    }
  }, [delay])

  return <div ref={shapeRef} className={className} />
}

export function GradientBlob({ colors = ["#FF3366", "#FF9933", "#FFCC33"], size = 300, className = "", delay = 0 }) {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!blobRef.current) return

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "sine.inOut" },
    })

    tl.to(blobRef.current, {
      borderRadius: "60% 40% 70% 30% / 30% 50% 70% 60%",
      duration: 8,
      delay,
    })
      .to(blobRef.current, {
        borderRadius: "40% 60% 30% 70% / 50% 60% 30% 40%",
        duration: 8,
      })
      .to(blobRef.current, {
        borderRadius: "60% 40% 50% 50% / 40% 40% 60% 60%",
        duration: 8,
      })

    return () => {
      tl.kill()
    }
  }, [delay])

  const gradientId = `gradient-${Math.random().toString(36).substring(2, 9)}`

  return (
    <div
      ref={blobRef}
      className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(45deg, ${colors.join(", ")})`,
      }}
    />
  )
}

export function AnimatedCircle({ size = 20, color = "#FFCC33", className = "", delay = 0 }) {
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!circleRef.current) return

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power1.inOut" },
    })

    tl.to(circleRef.current, {
      y: "random(-40, 40)",
      x: "random(-40, 40)",
      scale: "random(0.8, 1.2)",
      duration: "random(3, 6)",
      delay,
    })

    return () => {
      tl.kill()
    }
  }, [delay])

  return (
    <div
      ref={circleRef}
      className={`rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  )
}
