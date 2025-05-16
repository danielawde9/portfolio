"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

// Add window.mouseMoveTimeout to Window interface
declare global {
  interface Window {
    mouseMoveTimeout: NodeJS.Timeout | undefined;
  }
}

interface ParticleProps {
  size: number;
  color: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  delay: number;
}

const generateParticles = (count: number): ParticleProps[] => {
  return Array.from({ length: count }, () => ({
    size: Math.random() * 6 + 2,
    color: [
      "rgba(163, 230, 53, 0.8)", // lime
      "rgba(51, 204, 255, 0.8)", // blue
      "rgba(255, 51, 102, 0.8)", // pink
      "rgba(255, 204, 51, 0.8)", // yellow
      "rgba(153, 102, 255, 0.8)", // purple
    ][Math.floor(Math.random() * 5)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    speed: Math.random() * 5 + 2,
    opacity: Math.random() * 0.5 + 0.1,
    delay: Math.random() * 5,
  }));
};

export default function AnimatedBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const particlesRef = useRef<ParticleProps[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark" || theme === undefined;
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({
        x: (clientX / window.innerWidth) * 100,
        y: (clientY / window.innerHeight) * 100,
      });
      setIsHovering(true);

      // Reset hover state after inactivity
      clearTimeout(window.mouseMoveTimeout);
      window.mouseMoveTimeout = setTimeout(() => {
        setIsHovering(false);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(window.mouseMoveTimeout);
    };
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    // Initial setup
    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Animation loop
    const animate = (time: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }
      const deltaTime = time - (previousTimeRef.current ?? 0);
      previousTimeRef.current = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(
          (particle.x * window.innerWidth) / 100,
          (particle.y * window.innerHeight) / 100,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity * (isHovering ? 1.5 : 1);
        ctx.fill();

        // Update position with delta time
        particle.y += (particle.speed * deltaTime) / 1000;

        // Reset position when particle goes off screen
        if (particle.y > 100) {
          particle.y = -5;
          particle.x = Math.random() * 100;
        }

        // Interactive effect: particles move away from mouse
        if (isHovering) {
          const distX = mousePosition.x - particle.x;
          const distY = mousePosition.y - particle.y;
          const distance = Math.sqrt(distX * distX + distY * distY);

          if (distance < 20) {
            const angle = Math.atan2(distY, distX);
            const repelForce = (20 - distance) / 10;
            particle.x -= Math.cos(angle) * repelForce * (deltaTime / 100);
            particle.y -= Math.sin(angle) * repelForce * (deltaTime / 100);
          }
        }
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = isDark
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.05)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = ((p1.x - p2.x) * window.innerWidth) / 100;
          const dy = ((p1.y - p2.y) * window.innerHeight) / 100;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.globalAlpha = (1 - distance / 150) * 0.2;
            ctx.moveTo(
              (p1.x * window.innerWidth) / 100,
              (p1.y * window.innerHeight) / 100
            );
            ctx.lineTo(
              (p2.x * window.innerWidth) / 100,
              (p2.y * window.innerHeight) / 100
            );
            ctx.stroke();
          }
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovering, mousePosition, isDark, particles]);

  // Background gradient animation
  useEffect(() => {
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundPosition: "100% 100%",
        duration: 120,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
    }

    return () => {
      gsap.killTweensOf(backgroundRef.current);
    };
  }, []);

  // Add this useEffect after other hooks:
  useEffect(() => {
    const generated = generateParticles(50);
    setParticles(generated);
    particlesRef.current = generated;
  }, []);

  return (
    <>
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

        {/* Canvas for particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Main background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-lime-500/10 via-blue-500/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-500/10 via-pink-500/5 to-transparent blur-3xl"></div>

        {/* Grain overlay for texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] bg-repeat"></div>
      </div>
    </>
  );
}
