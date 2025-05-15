"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";

// Register ScrollToPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

interface NavigationProps {
  onScrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
  aboutRef: React.RefObject<HTMLElement | null>;
  projectsRef: React.RefObject<HTMLElement | null>;
  experienceRef: React.RefObject<HTMLElement | null>;
  contactRef: React.RefObject<HTMLElement | null>;
}

export default function Navigation({
  onScrollToSection,
  aboutRef,
  projectsRef,
  experienceRef,
  contactRef,
}: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Animate navigation on load
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );
    }

    // Handle scroll event to add background opacity
    const handleScroll = () => {
      if (navRef.current) {
        const scrollY = window.scrollY;
        const opacity = Math.min(scrollY / 200, 0.9);
        navRef.current.style.backgroundColor = `rgba(0, 0, 0, ${
          opacity + 0.1
        })`;
        navRef.current.style.backdropFilter = `blur(${Math.min(
          scrollY / 100,
          8
        )}px)`;
      }
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced smooth scroll with GSAP
  const smoothScrollTo = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const targetPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetPosition,
          autoKill: false,
        },
        ease: "power3.inOut",
      });
    }
  };

  const handleClick = (ref: React.RefObject<HTMLElement | null>) => {
    setIsOpen(false);
    onScrollToSection(ref);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          DA.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button
            onClick={() => handleClick(projectsRef)}
            className="text-gray-300 hover:text-lime-400 transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => handleClick(aboutRef)}
            className="text-gray-300 hover:text-lime-400 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => handleClick(experienceRef)}
            className="text-gray-300 hover:text-lime-400 transition-colors"
          >
            Experience
          </button>
          <button
            onClick={() => handleClick(contactRef)}
            className="text-gray-300 hover:text-lime-400 transition-colors"
          >
            Contact
          </button>
          <Link
            href="/resume"
            className="text-gray-300 hover:text-lime-400 transition-colors"
          >
            Resume
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => handleClick(projectsRef)}
              className="text-white py-2 px-4 text-left hover:text-lime-400 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => handleClick(aboutRef)}
              className="text-white py-2 px-4 text-left hover:text-lime-400 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleClick(experienceRef)}
              className="text-white py-2 px-4 text-left hover:text-lime-400 transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => handleClick(contactRef)}
              className="text-white py-2 px-4 text-left hover:text-lime-400 transition-colors"
            >
              Contact
            </button>
            <Link
              href="/resume"
              className="text-white py-2 px-4 block hover:text-lime-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
