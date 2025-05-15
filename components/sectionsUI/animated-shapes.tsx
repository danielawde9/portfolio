"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function FloatingShape({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shapeRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "sine.inOut" },
    });

    tl.to(shapeRef.current, {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      duration: "random(4, 8)",
      delay,
    });

    return () => {
      tl.kill();
    };
  }, [delay]);

  return <div ref={shapeRef} className={className} />;
}

interface GradientBlobProps {
  colors: string[];
  size: number;
  className?: string;
  delay?: number;
}

export function GradientBlob({
  colors,
  size,
  className = "",
  delay = 0,
}: GradientBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blobRef.current) return;

    // Random starting position within constraints
    const randomX = Math.random() * 40 - 20; // -20 to 20
    const randomY = Math.random() * 40 - 20; // -20 to 20

    // Create animation timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, delay });

    // Animate the blob
    tl.to(blobRef.current, {
      x: randomX,
      y: randomY,
      scale: 1.1,
      rotation: 20,
      borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
      duration: 8,
      ease: "sine.inOut",
    })
      .to(blobRef.current, {
        x: -randomX,
        y: -randomY,
        scale: 0.9,
        rotation: -20,
        borderRadius: "40% 60% 30% 70% / 60% 40% 70% 30%",
        duration: 8,
        ease: "sine.inOut",
      })
      .to(blobRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%",
        duration: 8,
        ease: "sine.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [delay]);

  return (
    <div
      ref={blobRef}
      className={`absolute rounded-full filter blur-3xl opacity-20 ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${colors.join(", ")})`,
      }}
    />
  );
}

interface AnimatedCircleProps {
  size: number;
  color: string;
  className?: string;
  delay?: number;
}

export function AnimatedCircle({
  size,
  color,
  className = "",
  delay = 0,
}: AnimatedCircleProps) {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!circleRef.current) return;

    // Create animation
    const tl = gsap.timeline({ repeat: -1, delay });

    // Floating animation
    tl.to(circleRef.current, {
      y: -20,
      duration: 2,
      ease: "sine.inOut",
    }).to(circleRef.current, {
      y: 0,
      duration: 2,
      ease: "sine.inOut",
    });

    // Slight pulsing
    gsap.to(circleRef.current, {
      scale: 1.2,
      opacity: 0.6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [delay]);

  return (
    <div
      ref={circleRef}
      className={`rounded-full filter blur-md ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  );
}
