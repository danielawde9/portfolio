"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  Code,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeIn, fadeInLeft, fadeInRight, bounce } from "@/utils/animations";
import InteractiveProjectCard from "./sectionsUI/interactive-project-card";
import ProjectFilter from "./sectionsUI/project-filter";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  onScrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
  aboutRef: React.RefObject<HTMLElement | null>;
  projectsRef: React.RefObject<HTMLElement | null>;
}

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  categories: string[];
  demoLink: string;
  codeLink: string;
  color: string;
}

export default function HeroSection({
  onScrollToSection,
  aboutRef,
  projectsRef,
}: HeroSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectsListRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const parallaxLayersRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const parallaxItems = useRef<HTMLDivElement[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [typingText, setTypingText] = useState("");
  const [typeIndex, setTypeIndex] = useState(0);
  const typeTexts = ["BUILD", "CREATE", "DEVELOP", "DESIGN", "DEPLOY"];
  const magnetButtonRef = useRef<HTMLDivElement>(null);

  // Project data
  const projects: Project[] = [
    {
      id: 1,
      title: "Mingo App",
      description:
        "An open-source AR-based educational app inspired by Kahoot, aiming to gamify learning experiences for students and teachers. Published on Google Play Store.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Unity", "C#", "Firebase", "AR Foundation"],
      categories: ["Mobile", "AR"],
      demoLink:
        "https://play.google.com/store/apps/details?id=com.danielawde9.mingo",
      codeLink: "https://github.com/danielawde9",
      color: "#FF3366",
    },
    {
      id: 2,
      title: "Echoes Of History",
      description:
        "Augmented Reality (AR) application to showcase the Kfarmatta Silk Mill in Lebanon, featuring a 3D scanned reconstruction of the site's historical and current states.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Unity", "C#", "Firebase", "AR Foundation"],
      categories: ["Mobile", "AR"],
      demoLink:
        "https://play.google.com/store/apps/details?id=com.danielawde9.echoesofhistory",
      codeLink: "https://github.com/danielawde9",
      color: "#FF9933",
    },
    {
      id: 3,
      title: "SEO Projects for MENA Clients",
      description:
        "Undertook SEO projects for international clients targeting the MENA region, focusing on on-page and off-page SEO using content, trending topics, and localization.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["SEO", "Content Strategy", "WordPress", "Google Analytics"],
      categories: ["Web"],
      demoLink: "#",
      codeLink: "#",
      color: "#FFCC33",
    },
    {
      id: 4,
      title: "E-commerce Platform",
      description:
        "Developed a full-featured e-commerce platform with product management, user authentication, payment processing, and order tracking functionality.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      categories: ["Web"],
      demoLink: "#",
      codeLink: "#",
      color: "#33CCFF",
    },
    {
      id: 5,
      title: "Portfolio Website",
      description:
        "Modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and interactive elements.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "Tailwind CSS", "GSAP", "TypeScript"],
      categories: ["Web"],
      demoLink: "#",
      codeLink: "#",
      color: "#9966FF",
    },
    {
      id: 6,
      title: "AR Navigation App",
      description:
        "Mobile application that uses augmented reality to provide real-time navigation guidance in indoor environments like shopping malls and museums.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Unity", "ARKit", "ARCore", "C#"],
      categories: ["Mobile", "AR"],
      demoLink: "#",
      codeLink: "#",
      color: "#66CC99",
    },
  ];

  // Filter categories
  const categories = ["All", "Web", "Mobile", "AR"];

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) =>
          project.categories.includes(activeCategory)
        );

  // Handle category change
  const handleCategoryChange = (category: string) => {
    // First fade out the projects
    if (projectsListRef.current) {
      gsap.to(projectsListRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Change the category
          setActiveCategory(category);

          // Then fade in the new projects
          setTimeout(() => {
            if (projectsListRef.current) {
              gsap.fromTo(
                projectsListRef.current.children,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.05,
                  duration: 0.5,
                  ease: "power2.out",
                }
              );
            }
          }, 100);
        },
      });
    } else {
      setActiveCategory(category);
    }
  };

  useEffect(() => {
    // Text typing animation
    const typingInterval = setInterval(() => {
      const currentText = typeTexts[typeIndex];
      if (typingText.length < currentText.length) {
        setTypingText((prev) => prev + currentText[prev.length]);
      } else {
        setTimeout(() => {
          setTypingText("");
          setTypeIndex((prev) => (prev + 1) % typeTexts.length);
        }, 1000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [typingText, typeIndex]);

  useEffect(() => {
    // 3D parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroSectionRef.current) return;

      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 50;
      const y = (clientY - window.innerHeight / 2) / 50;

      // Animate cursor follower
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Magnetic button effect
      if (magnetButtonRef.current) {
        const button = magnetButtonRef.current;
        const buttonRect = button.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        // Calculate distance between cursor and button center
        const distanceX = clientX - buttonCenterX;
        const distanceY = clientY - buttonCenterY;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );

        // If cursor is close to the button, apply magnetic effect
        if (distance < 150) {
          // The closer the cursor, the stronger the effect
          const magnetStrength = 30 * (1 - Math.min(distance, 100) / 100);
          const moveX = distanceX * (magnetStrength / 100);
          const moveY = distanceY * (magnetStrength / 100);

          gsap.to(button, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: "power3.out",
          });
        } else {
          // Reset position when cursor is far away
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          });
        }
      }

      // Animate parallax elements
      parallaxItems.current.forEach((item, index) => {
        const depth = index * 0.1 + 0.1;
        gsap.to(item, {
          x: x * depth * (index % 2 === 0 ? 1 : -1),
          y: y * depth * (index % 2 === 0 ? 1 : -1),
          duration: 0.5,
          ease: "power1.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hero section animations
    const tl = gsap.timeline();

    // Name text animation (without SplitText)
    if (nameRef.current) {
      const nameElements = nameRef.current.querySelectorAll(".name-char");
      tl.fromTo(
        nameElements,
        {
          opacity: 0,
          y: 50,
          rotationX: -40,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        0.3
      );
    }

    // Skills animation with staggered effect and 3D rotation
    const skills = skillsRef.current?.querySelectorAll(".skill-item");
    if (skills) {
      tl.fromTo(
        skills,
        {
          opacity: 0,
          x: -50,
          rotationY: -90,
          transformOrigin: "left center",
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }

    // CTA button animation with glow effect
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.7"
      );

      const ctaButton = ctaRef.current?.querySelector("a button");
      if (ctaButton) {
        tl.fromTo(
          ctaButton,
          {
            scale: 0.5,
          },
          {
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.5"
        );

        // Add pulsing glow effect
        gsap.to(ctaButton, {
          boxShadow: "0 0 20px rgba(163, 230, 53, 0.7)",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut",
        });
      }
    }

    // Social icons animation with 3D effect
    const socialIcons = socialsRef.current?.querySelectorAll("a");
    if (socialIcons) {
      tl.fromTo(
        socialIcons,
        {
          opacity: 0,
          scale: 0,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );
    }

    // 3D Image animation with floating effect
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        {
          opacity: 0,
          y: 100,
          rotationY: 15,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1.2"
      );

      // Add continuous floating animation
      gsap.to(imageRef.current, {
        y: "+=15",
        rotationZ: "-=2",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Bouncing arrow animation with trail effect
    if (arrowRef.current) {
      gsap.fromTo(
        arrowRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 2,
          ease: "back.out",
          onComplete: () => {
            gsap.to(arrowRef.current, {
              y: 15,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        }
      );
    }

    // Projects section animations with 3D perspective
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (descriptionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 50,
          rotationX: 50,
          transformOrigin: "center top",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Create a staggered entrance for project cards
    if (projectsListRef.current) {
      const cards = projectsListRef.current.children;
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotationY: 25,
          transformOrigin: "center center -50px",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: projectsListRef.current,
            start: "top 85%",
          },
        }
      );

      // Add hover animations for each card
      Array.from(cards).forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardContent = cardElement.querySelector(".card-content");
        const cardImage = cardElement.querySelector(".card-image");
        const cardTitle = cardElement.querySelector(".card-title");
        const cardTags = cardElement.querySelector(".card-tags");
        const cardButtons = cardElement.querySelector(".card-buttons");

        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            y: -15,
            scale: 1.03,
            boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
            duration: 0.3,
            ease: "power2.out",
          });

          if (cardImage) {
            gsap.to(cardImage, {
              scale: 1.1,
              duration: 0.5,
              ease: "power1.out",
            });
          }

          if (cardTitle) {
            gsap.to(cardTitle, {
              color: "#a3e635",
              duration: 0.3,
            });
          }

          if (cardTags) {
            gsap.to(cardTags.children, {
              scale: 1.05,
              stagger: 0.05,
              duration: 0.2,
            });
          }

          if (cardButtons) {
            gsap.to(cardButtons.children, {
              y: -5,
              scale: 1.05,
              stagger: 0.1,
              duration: 0.3,
              ease: "back.out",
            });
          }
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
            duration: 0.5,
            ease: "power2.out",
          });

          if (cardImage) {
            gsap.to(cardImage, {
              scale: 1,
              duration: 0.5,
              ease: "power1.out",
            });
          }

          if (cardTitle) {
            gsap.to(cardTitle, {
              color: "white",
              duration: 0.3,
            });
          }

          if (cardTags) {
            gsap.to(cardTags.children, {
              scale: 1,
              stagger: 0,
              duration: 0.2,
            });
          }

          if (cardButtons) {
            gsap.to(cardButtons.children, {
              y: 0,
              scale: 1,
              stagger: 0,
              duration: 0.3,
              ease: "power1.out",
            });
          }
        });
      });
    }

    // Animate project filter buttons
    const filterButtons = document.querySelectorAll(".filter-button");
    if (filterButtons.length) {
      gsap.fromTo(
        filterButtons,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out",
          scrollTrigger: {
            trigger: filterButtons[0],
            start: "top 85%",
          },
        }
      );
    }

    // Add hover animations for skill items
    const skillItems = skillsRef.current?.querySelectorAll(".skill-item");
    if (skillItems) {
      skillItems.forEach((item) => {
        const icon = item.querySelector(".skill-icon");
        const text = item.querySelector(".skill-text");

        item.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            color: "#a3e635",
            scale: 1.2,
            duration: 0.3,
            ease: "back.out",
          });

          gsap.to(text, {
            x: 5,
            color: "#ffffff",
            duration: 0.3,
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            color: "#a3e635",
            scale: 1,
            duration: 0.3,
          });

          gsap.to(text, {
            x: 0,
            color: "#e5e7eb",
            duration: 0.3,
          });
        });
      });
    }

    return () => {
      tl.kill();
      window.removeEventListener("mousemove", handleMouseMove);

      // Clean up event listeners for cards
      if (projectsListRef.current) {
        Array.from(projectsListRef.current.children).forEach((card) => {
          const cardElement = card as HTMLElement;
          cardElement.removeEventListener("mouseenter", () => {});
          cardElement.removeEventListener("mouseleave", () => {});
        });
      }

      if (skillItems) {
        skillItems.forEach((item) => {
          item.removeEventListener("mouseenter", () => {});
          item.removeEventListener("mouseleave", () => {});
        });
      }
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        className="min-h-screen relative flex items-center overflow-hidden pb-0"
      >
        {/* Cursor follower */}
        <div
          ref={cursorRef}
          className="fixed w-12 h-12 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            background:
              "radial-gradient(circle, rgba(163,230,53,0.7) 0%, rgba(163,230,53,0) 70%)",
            transform: "translate(-50%, -50%)",
            left: 0,
            top: 0,
          }}
        />

        {/* Parallax background elements */}
        <div
          ref={parallaxLayersRef}
          className="absolute inset-0 overflow-hidden"
        >
          {[
            { width: 200, height: 300, left: 15, top: 25, color: "163,230,53" },
            {
              width: 350,
              height: 250,
              left: 65,
              top: 40,
              color: "120,200,255",
            },
            {
              width: 180,
              height: 180,
              left: 85,
              top: 70,
              color: "255,100,150",
            },
            {
              width: 280,
              height: 320,
              left: 30,
              top: 85,
              color: "200,150,255",
            },
            {
              width: 220,
              height: 220,
              left: 50,
              top: 60,
              color: "255,200,100",
            },
          ].map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) parallaxItems.current[i] = el;
              }}
              className="absolute rounded-full bg-gradient-to-br opacity-20"
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                left: `${item.left}%`,
                top: `${item.top}%`,
                background: `radial-gradient(circle, rgba(${item.color},0.3) 0%, rgba(0,0,0,0) 70%)`,
                filter: "blur(40px)",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-24 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-10">
                <h1
                  ref={titleRef}
                  className="text-6xl md:text-7xl xl:text-8xl font-bold leading-none tracking-tighter text-white perspective-1000"
                  style={{ fontFamily: "monospace" }}
                >
                  <span className="block" ref={nameRef}>
                    {"DANIEL".split("").map((char, i) => (
                      <span
                        key={`char-d-${i}`}
                        className="name-char inline-block"
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  <span className="block">
                    {"AWDE".split("").map((char, i) => (
                      <span
                        key={`char-a-${i}`}
                        className="name-char inline-block"
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </h1>

                <div ref={skillsRef} className="space-y-5">
                  <div className="skill-item opacity-0 flex items-center transform hover:translate-x-2 transition-transform duration-300">
                    <span className="skill-icon text-lime-400 mr-3 text-xl">
                      =&gt;
                    </span>
                    <span className="skill-text text-xl md:text-2xl text-gray-200">
                      Technical Leadership
                    </span>
                  </div>
                  <div className="skill-item opacity-0 flex items-center transform hover:translate-x-2 transition-transform duration-300">
                    <span className="skill-icon text-lime-400 mr-3 text-xl">
                      =&gt;
                    </span>
                    <span className="skill-text text-xl md:text-2xl text-gray-200">
                      Project Management
                    </span>
                  </div>
                  <div className="skill-item opacity-0 flex items-center transform hover:translate-x-2 transition-transform duration-300">
                    <span className="skill-icon text-lime-400 mr-3 text-xl">
                      =&gt;
                    </span>
                    <span className="skill-text text-xl md:text-2xl text-gray-200">
                      Software Engineering
                    </span>
                  </div>
                </div>

                <div ref={ctaRef} className="mt-12 space-y-6">
                  <div className="text-gray-300 mb-8 space-y-1">
                    <p className="text-lg md:text-xl">
                      TECHNICAL PROJECT MANAGER WITH 5+ YEARS OF
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg md:text-xl">
                        EXPERIENCE HELPING CLIENTS
                      </p>
                      <div className="ml-2 text-lg md:text-xl text-lime-400 font-bold min-w-[120px] inline-block">
                        {typingText}
                        <span className="animate-pulse">|</span>
                      </div>
                    </div>
                    <p className="text-lg md:text-xl">
                      FROM CONCEPT TO DEPLOYMENT
                    </p>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div ref={magnetButtonRef} className="relative">
                      <Link href="/resume">
                        <Button
                          size="lg"
                          className="bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-full px-10 py-6 text-lg transition-all duration-300 transform hover:scale-105 flex items-center group"
                        >
                          HIRE ME
                          <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>

                    <div ref={socialsRef} className="flex space-x-6">
                      <Link
                        href="https://github.com/danielawde9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform hover:scale-110 transition-transform duration-300"
                      >
                        <Github className="w-7 h-7 text-gray-300 hover:text-lime-400 transition-colors" />
                      </Link>
                      <Link
                        href="https://linkedin.com/in/danielawde9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform hover:scale-110 transition-transform duration-300"
                      >
                        <Linkedin className="w-7 h-7 text-gray-300 hover:text-lime-400 transition-colors" />
                      </Link>
                      <Link
                        href="mailto:hello@danielawde9.com"
                        className="transform hover:scale-110 transition-transform duration-300"
                      >
                        <Mail className="w-7 h-7 text-gray-300 hover:text-lime-400 transition-colors" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={imageRef}
              className="order-1 lg:order-2 flex items-center justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="relative z-20 overflow-hidden rounded-2xl p-2 bg-gradient-to-br from-lime-400/20 to-blue-500/20">
                  <div className="aspect-[6/7] relative overflow-hidden rounded-xl">
                    <Image
                      src="/images/daniel_awde.jpg"
                      alt="Daniel Awde"
                      fill
                      sizes="(max-width: 768px) 90vw, 40vw"
                      className="object-cover object-top shadow-2xl transform hover:scale-105 transition-transform duration-700"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/40 via-purple-500/40 to-blue-600/40 blur-3xl opacity-70 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              ref={arrowRef}
              onClick={() => onScrollToSection(projectsRef)}
              className="text-white bg-black/50 p-4 rounded-full backdrop-blur-sm border border-gray-800 hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-110"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <section ref={projectsRef} className="py-20 relative overflow-hidden">
        {/* Add parallax background for projects section */}
        <div className="absolute inset-0 -z-10">
          {[
            { width: 600, height: 600, top: 20, left: 25 },
            { width: 500, height: 500, top: 50, left: 75 },
            { width: 700, height: 700, top: 80, left: 40 },
          ].map((item, i) => (
            <div
              key={`project-bg-${i}`}
              className="absolute rounded-full opacity-20"
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                background: `radial-gradient(circle, rgba(163,230,53,0.2) 0%, rgba(0,0,0,0) 70%)`,
                top: `${item.top}%`,
                left: `${item.left}%`,
                filter: "blur(100px)",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-12 text-center">
            <h2
              ref={headingRef}
              className="text-5xl font-bold mb-4 inline-block pb-2 text-white"
            >
              FEATURED PROJECTS
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-lime-400 via-[#FFCC33] to-[#33CCFF] mx-auto mt-2 mb-8"></div>
            <p
              ref={descriptionRef}
              className="max-w-3xl mx-auto text-white text-lg"
            >
              A selection of projects I've developed and led throughout my
              career.
            </p>
          </div>

          {/* Project filter */}
          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Projects grid */}
          <div
            ref={projectsListRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <InteractiveProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                demoLink={project.demoLink}
                codeLink={project.codeLink}
                color={project.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
