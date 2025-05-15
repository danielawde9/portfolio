"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { GradientBlob, AnimatedCircle } from "./sectionsUI/animated-shapes";

export default function AnimatedBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optional: Add any global background animations here
    if (backgroundRef.current) {
      // Create subtle movement effect
      gsap.to(backgroundRef.current, {
        backgroundPosition: "100% 100%",
        duration: 120,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
    }

    return () => {
      // Cleanup animations if needed
      gsap.killTweensOf(backgroundRef.current);
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{
        backgroundSize: "200% 200%",
        backgroundPosition: "0% 0%",
      }}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-95"></div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      ></div>

      {/* Animated blobs and circles */}
      <GradientBlob
        colors={["#33CCFF", "#9966FF", "#FF3366"]}
        size={900}
        className="-left-80 -top-40 opacity-20"
      />
      <GradientBlob
        colors={["#FF9933", "#FFCC33", "#66CC99"]}
        size={800}
        className="-right-80 bottom-0 opacity-15"
        delay={2.5}
      />
      <GradientBlob
        colors={["#FFCC33", "#33CCFF", "#FF3366"]}
        size={700}
        className="left-1/2 top-1/4 translate-x-[-50%] opacity-10"
        delay={5}
      />

      {/* Small animated particles */}
      <AnimatedCircle
        size={15}
        color="#FF3366"
        className="absolute top-1/4 right-[20%] opacity-30"
      />
      <AnimatedCircle
        size={20}
        color="#33CCFF"
        className="absolute bottom-1/3 left-[15%] opacity-20"
        delay={1.5}
      />
      <AnimatedCircle
        size={10}
        color="#FFCC33"
        className="absolute top-2/3 right-[30%] opacity-25"
        delay={3}
      />
      <AnimatedCircle
        size={12}
        color="#FF9933"
        className="absolute top-1/2 left-[35%] opacity-15"
        delay={4.5}
      />
      <AnimatedCircle
        size={8}
        color="#66CC99"
        className="absolute bottom-1/5 left-[60%] opacity-20"
        delay={6}
      />

      {/* Grain overlay for texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] bg-repeat"></div>
    </div>
  );
}
