"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";
import { fadeIn, fadeInUp } from "@/utils/animations";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactSectionProps {
  forwardedRef: React.RefObject<HTMLElement | null>;
}

export default function ContactSection({ forwardedRef }: ContactSectionProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const contactItemsRef = useRef<HTMLDivElement[]>([]);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);

  // Add magnetic effect to links
  useEffect(() => {
    linkRefs.current.forEach((link) => {
      if (!link) return;

      const magnetStrength = 0.3;

      link.addEventListener("mousemove", (e) => {
        const bounds = link.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left - bounds.width / 2;
        const mouseY = e.clientY - bounds.top - bounds.height / 2;

        gsap.to(link, {
          x: mouseX * magnetStrength,
          y: mouseY * magnetStrength,
          duration: 0.2,
          ease: "power2.out",
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      });
    });
  }, []);

  useEffect(() => {
    // Heading animation with text reveal
    if (headingRef.current) {
      const heading = headingRef.current;
      const text = heading.textContent || "";
      heading.innerHTML = "";

      // Create spans for each letter
      text.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        heading.appendChild(span);
      });

      // Animate letters
      gsap.to(heading.children, {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
        },
      });
    }

    // Description animation
    if (descriptionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Contact info container animation
    if (contactInfoRef.current) {
      gsap.fromTo(
        contactInfoRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
          },
        }
      );

      // Staggered animation for contact items
      gsap.fromTo(
        contactItemsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  // Handler to add contact items to refs array
  const addToContactItemsRef = (el: HTMLDivElement) => {
    if (el && !contactItemsRef.current.includes(el)) {
      contactItemsRef.current.push(el);
    }
  };

  // Handler to add links to refs array
  const addToLinkRefs = (el: HTMLAnchorElement) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  return (
    <section ref={forwardedRef} className="pb-10 relative">
      <div className="container mx-auto px-4 flex flex-col items-center z-10 relative">
        <div className="mb-12 text-center">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-extrabold mb-4 inline-block border-b-4 border-lime-400 pb-2 text-white tracking-tight"
            style={{ fontFamily: "monospace" }}
          >
            GET IN TOUCH
          </h2>
          <p
            ref={descriptionRef}
            className="max-w-3xl mx-auto mt-6 text-white text-lg md:text-xl"
          >
            Have a project in mind or want to discuss potential opportunities?
            I\'d love to hear from you.
          </p>
        </div>

        <div
          ref={contactInfoRef}
          className="w-full max-w-4xl bg-gray-900/60 backdrop-blur-md rounded-2xl border border-lime-400/30 shadow-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 items-start"
          style={{ borderWidth: 2 }}
        >
          {/* Email */}
          <div
            ref={addToContactItemsRef}
            className="flex items-center gap-4 contact-item transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg p-3 rounded-xl hover:bg-gray-800/40"
          >
            <span className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 transform transition-all duration-300 group-hover:scale-110">
              <Mail className="w-6 h-6 text-lime-400" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-base mb-1">Email</p>
              <a
                ref={addToLinkRefs}
                href="mailto:hello@danielawde9.com"
                className="text-gray-300 hover:text-lime-400 transition-colors text-lg font-mono break-words inline-block"
              >
                hello@danielawde9.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div
            ref={addToContactItemsRef}
            className="flex items-center gap-4 contact-item transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg p-3 rounded-xl hover:bg-gray-800/40"
          >
            <span className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 transform transition-all duration-300 group-hover:scale-110">
              {/* Phone icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-lime-400"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-base mb-1">Phone</p>
              <a
                ref={addToLinkRefs}
                href="tel:+96170979482"
                className="text-gray-300 hover:text-lime-400 transition-colors text-lg font-mono inline-block"
              >
                +961 70 979 482
              </a>
            </div>
          </div>

          {/* Location */}
          <div
            ref={addToContactItemsRef}
            className="flex items-center gap-4 contact-item transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg p-3 rounded-xl hover:bg-gray-800/40"
          >
            <span className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 transform transition-all duration-300 group-hover:scale-110">
              {/* Location icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-lime-400"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-base mb-1">
                Location
              </p>
              <p className="text-gray-300 text-lg font-mono">
                Baakline, Al Shouf, Lebanon
              </p>
            </div>
          </div>

          {/* LinkedIn */}
          <div
            ref={addToContactItemsRef}
            className="flex items-center gap-4 contact-item transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg p-3 rounded-xl hover:bg-gray-800/40"
          >
            <span className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 transform transition-all duration-300 group-hover:scale-110">
              {/* LinkedIn icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-lime-400"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-base mb-1">
                LinkedIn
              </p>
              <a
                ref={addToLinkRefs}
                href="https://linkedin.com/in/danielawde9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-lime-400 transition-colors text-lg font-mono break-words inline-block"
              >
                in/danielawde9
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
