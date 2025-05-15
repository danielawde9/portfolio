"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useTheme } from "next-themes";
import { Menu, X, ChevronRight, Download, Mail } from "lucide-react";

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
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    // Animate navigation on load
    if (navRef.current) {
      const tl = gsap.timeline();

      // Logo animation
      tl.fromTo(
        logoRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Nav items staggered animation
      if (navItemsRef.current) {
        const navButtons = navItemsRef.current.querySelectorAll(".nav-item");
        tl.fromTo(
          navButtons,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );
      }

      // Contact button animation
      const contactButton = document.querySelector(".contact-btn");
      if (contactButton) {
        tl.fromTo(
          contactButton,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.2"
        );
      }
    }

    // Handle scroll event to add background opacity and track active section
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

      // Determine active section
      const sections = [
        { ref: projectsRef, id: "projects" },
        { ref: aboutRef, id: "about" },
        { ref: experienceRef, id: "experience" },
        { ref: contactRef, id: "contact" },
      ];

      // Find the current section in view
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [aboutRef, projectsRef, experienceRef, contactRef]);

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

  const handleClick = (
    ref: React.RefObject<HTMLElement | null>,
    sectionId: string
  ) => {
    // Set active section
    setActiveSection(sectionId);

    // Close mobile menu with animation
    if (isOpen && mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => setIsOpen(false),
      });
    } else {
      setIsOpen(false);
    }

    onScrollToSection(ref);
  };

  const toggleMobileMenu = () => {
    if (mobileMenuRef.current) {
      if (!isOpen) {
        // Open the menu with animation
        setIsOpen(true);
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          }
        );

        // Animate menu items
        const menuItems =
          mobileMenuRef.current.querySelectorAll(".mobile-nav-item");
        gsap.fromTo(
          menuItems,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            delay: 0.2,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      } else {
        // Close the menu with animation
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => setIsOpen(false),
        });
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          ref={logoRef}
          href="/"
          className="text-2xl font-bold text-white relative group"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-blue-400">
            DA.
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
        </Link>

        {/* Desktop Navigation */}
        <div
          ref={navItemsRef}
          className="hidden md:flex space-x-8 md:items-center"
        >
          <button
            onClick={() => handleClick(projectsRef, "projects")}
            className={`nav-item relative px-2 py-1 text-gray-300 hover:text-white transition-colors ${
              activeSection === "projects" ? "text-white" : ""
            }`}
          >
            Projects
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-lime-400 transform scale-x-0 transition-transform duration-300 ${
                activeSection === "projects" ? "scale-x-100" : ""
              }`}
            ></span>
          </button>

          <button
            onClick={() => handleClick(aboutRef, "about")}
            className={`nav-item relative px-2 py-1 text-gray-300 hover:text-white transition-colors ${
              activeSection === "about" ? "text-white" : ""
            }`}
          >
            About
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-lime-400 transform scale-x-0 transition-transform duration-300 ${
                activeSection === "about" ? "scale-x-100" : ""
              }`}
            ></span>
          </button>

          <button
            onClick={() => handleClick(experienceRef, "experience")}
            className={`nav-item relative px-2 py-1 text-gray-300 hover:text-white transition-colors ${
              activeSection === "experience" ? "text-white" : ""
            }`}
          >
            Experience
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-lime-400 transform scale-x-0 transition-transform duration-300 ${
                activeSection === "experience" ? "scale-x-100" : ""
              }`}
            ></span>
          </button>

          <Link
            href="/resume"
            className="nav-item hidden lg:block text-gray-300 hover:text-white transition-colors"
          >
            Resume
          </Link>

          <a
            href="mailto:hello@danielawd9.com"
            className="contact-btn ml-2 px-5 py-2 rounded-full bg-lime-400 text-black font-semibold shadow-md hover:bg-lime-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-black flex items-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative w-8 h-8">
            {isOpen ? (
              <X
                size={24}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            ) : (
              <Menu
                size={24}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden bg-black/95 backdrop-blur-lg shadow-xl overflow-hidden ${
          isOpen ? "block" : "hidden"
        }`}
        style={{ height: 0, opacity: 0 }}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
          <button
            onClick={() => handleClick(projectsRef, "projects")}
            className={`mobile-nav-item flex justify-between items-center text-white py-3 px-4 text-left rounded-lg transition-colors ${
              activeSection === "projects"
                ? "bg-gray-800/50 text-lime-400"
                : "hover:bg-gray-800/30"
            }`}
          >
            <span>Projects</span>
            <ChevronRight
              size={16}
              className={
                activeSection === "projects" ? "text-lime-400" : "text-gray-500"
              }
            />
          </button>

          <button
            onClick={() => handleClick(aboutRef, "about")}
            className={`mobile-nav-item flex justify-between items-center text-white py-3 px-4 text-left rounded-lg transition-colors ${
              activeSection === "about"
                ? "bg-gray-800/50 text-lime-400"
                : "hover:bg-gray-800/30"
            }`}
          >
            <span>About</span>
            <ChevronRight
              size={16}
              className={
                activeSection === "about" ? "text-lime-400" : "text-gray-500"
              }
            />
          </button>

          <button
            onClick={() => handleClick(experienceRef, "experience")}
            className={`mobile-nav-item flex justify-between items-center text-white py-3 px-4 text-left rounded-lg transition-colors ${
              activeSection === "experience"
                ? "bg-gray-800/50 text-lime-400"
                : "hover:bg-gray-800/30"
            }`}
          >
            <span>Experience</span>
            <ChevronRight
              size={16}
              className={
                activeSection === "experience"
                  ? "text-lime-400"
                  : "text-gray-500"
              }
            />
          </button>

          <button
            onClick={() => handleClick(contactRef, "contact")}
            className={`mobile-nav-item flex justify-between items-center text-white py-3 px-4 text-left rounded-lg transition-colors ${
              activeSection === "contact"
                ? "bg-gray-800/50 text-lime-400"
                : "hover:bg-gray-800/30"
            }`}
          >
            <span>Contact</span>
            <ChevronRight
              size={16}
              className={
                activeSection === "contact" ? "text-lime-400" : "text-gray-500"
              }
            />
          </button>

          <Link
            href="/resume"
            className="mobile-nav-item flex justify-between items-center text-white py-3 px-4 text-left rounded-lg hover:bg-gray-800/30 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <span>Resume</span>
            <Download size={16} className="text-gray-500" />
          </Link>

          <a
            href="mailto:hello@danielawd9.com"
            className="mobile-nav-item py-3 px-4 mt-4 rounded-lg bg-lime-400 text-black font-semibold shadow hover:bg-lime-500 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-300 flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
}
