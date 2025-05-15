"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Mail } from "lucide-react";
import { fadeIn, fadeInUp } from "@/utils/animations";

interface ContactSectionProps {
  forwardedRef: React.RefObject<HTMLElement | null>;
}

export default function ContactSection({ forwardedRef }: ContactSectionProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
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

    // Contact info animation
    if (contactInfoRef.current) {
      gsap.fromTo(
        contactInfoRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={forwardedRef} className="py-20 relative">
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
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-lime-400" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-base mb-1">Email</p>
              <a
                href="mailto:hello@danielawde9.com"
                className="text-gray-300 hover:text-lime-400 transition-colors text-lg font-mono break-all"
              >
                hello@danielawde9.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
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
                href="tel:+96170979482"
                className="text-gray-300 hover:text-lime-400 transition-colors text-lg font-mono"
              >
                +961 70 979 482
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
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
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
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
                href="https://linkedin.com/in/danielawde9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-lime-400 transition-colors text-lg font-mono break-all"
              >
                linkedin.com/in/danielawde9
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
