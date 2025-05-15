"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { gsap } from "gsap";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate footer on load
    if (footerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });

      // Animate copyright text
      tl.fromTo(
        copyrightRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      // Animate social icons with stagger effect
      if (socialIconsRef.current) {
        const icons = socialIconsRef.current.querySelectorAll(".social-icon");
        tl.fromTo(
          icons,
          { opacity: 0, scale: 0.8, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
      }

      // Animate border
      tl.fromTo(
        ".footer-border",
        { width: "0%" },
        { width: "100%", duration: 1.5, ease: "power2.inOut" },
        "-=0.6"
      );
    }
  }, []);

  return (
    <footer ref={footerRef} className="py-8 relative z-10">
      {/* Animated gradient border */}
      <div className="footer-border h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent w-0 mx-auto mb-8"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p ref={copyrightRef} className="text-white">
              © {new Date().getFullYear()} Daniel Awde. All rights reserved.
            </p>
          </div>
          <div ref={socialIconsRef} className="flex space-x-4">
            <Link
              href="https://github.com/danielawde9"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon text-gray-400 hover:text-lime-400 transition-all transform hover:scale-110 duration-300"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/danielawde9"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon text-gray-400 hover:text-lime-400 transition-all transform hover:scale-110 duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:hello@danielawde9.com"
              className="social-icon text-gray-400 hover:text-lime-400 transition-all transform hover:scale-110 duration-300"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
