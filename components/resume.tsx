"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Globe, ChevronRight } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef, ReactNode, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coreCompetencies, techStacks } from "./data/content";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Section = ({ children, className = "", delay = 0 }: SectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (ref.current && isInView) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: delay * 0.3,
        }
      );
    }
  }, [isInView, delay]);

  return (
    <div ref={ref} className={`mb-12 ${className}`}>
      {children}
    </div>
  );
};

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const title = titleRef.current;

      gsap.fromTo(
        title.querySelector(".title-text"),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        title.querySelector(".title-bar"),
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power4.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        title.querySelector(".title-dot"),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          delay: 0.3,
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <h2
      ref={titleRef}
      className="font-space-grotesk text-2xl font-bold mb-6 pb-2 border-b border-primary/20 text-foreground flex items-center gap-2"
    >
      <span className="relative">
        <span className="title-dot absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-full"></span>
        <span className="title-text">{children}</span>
      </span>
      <span className="title-bar ml-2 h-[2px] bg-primary/30 w-full transform-gpu origin-left"></span>
    </h2>
  );
};

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  duties: string[];
}

const ExperienceCard = ({
  title,
  company,
  period,
  duties,
}: ExperienceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (cardRef.current && isInView) {
      const card = cardRef.current;
      const timeline = gsap.timeline();

      timeline.fromTo(
        card,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );

      timeline.fromTo(
        card.querySelector(".line-indicator"),
        { height: 0 },
        { height: "100%", duration: 0.8, ease: "power2.inOut" },
        "-=0.3"
      );

      timeline.fromTo(
        card.querySelectorAll(".duty-item"),
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }
  }, [isInView]);

  return (
    <div ref={cardRef} className="mb-8 relative pl-5 group">
      <span className="line-indicator absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 to-transparent group-hover:bg-primary/80 transition-all duration-300"></span>

      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
        <div>
          <h3 className="font-space-grotesk text-xl font-semibold">{title}</h3>
          <h4 className="text-muted-foreground">{company}</h4>
        </div>
        <span className="text-muted-foreground text-sm bg-primary/10 px-3 py-1 rounded-full mt-1 md:mt-0 w-fit">
          {period}
        </span>
      </div>
      <ul className="space-y-2 text-foreground/80">
        {duties.map((duty: string, index: number) => (
          <li key={index} className="duty-item flex items-start gap-2">
            <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
            <span>{duty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Card with 3D tilt effect
const TiltCard = ({ children }: { children: ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: tiltX,
        rotateY: tiltY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      });

      // Move highlight effect
      const highlight = card.querySelector(".card-highlight");
      if (highlight) {
        gsap.to(highlight, {
          x: x - 100,
          y: y - 100,
          opacity: 0.15,
          duration: 0.5,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      });

      const highlight = card.querySelector(".card-highlight");
      if (highlight) {
        gsap.to(highlight, {
          opacity: 0,
          duration: 0.5,
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="transform-gpu relative overflow-hidden">
      <div className="card-highlight absolute w-200 h-200 rounded-full bg-primary/30 blur-3xl opacity-0 pointer-events-none"></div>
      {children}
    </div>
  );
};

export default function Resume() {
  const headerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header elements
    if (headerRef.current) {
      const tl = gsap.timeline();

      // Glowing background animation
      tl.fromTo(
        ".header-bg",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      );

      // Name animation with text reveal
      if (nameRef.current) {
        tl.fromTo(
          nameRef.current.querySelectorAll(".name-char"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 0.2,
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
      }

      // Contact info animation
      tl.fromTo(
        ".contact-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Social icons animation
      if (socialIconsRef.current) {
        const icons = socialIconsRef.current.querySelectorAll("a");
        tl.fromTo(
          icons,
          { opacity: 0, scale: 0, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
      }
    }

    // Set up scroll-triggered animations for skills
    const skillItems = document.querySelectorAll(".skill-item");
    skillItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: index * 0.05,
        }
      );
    });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto">
      {/* Header Section */}
      <header
        ref={headerRef}
        className="mb-12 relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-background to-background/40 border border-primary/10 shadow-lg"
      >
        <div className="header-bg absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10">
          <h1
            ref={nameRef}
            className="font-space-grotesk text-4xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
            aria-label="DANIEL AWDE"
          >
            Daniel Awde
          </h1>

          <h2
            ref={subtitleRef}
            className="font-space-grotesk text-xl md:text-2xl text-foreground/80 mb-6"
          >
            Software Engineer & Project Manager
          </h2>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="space-y-2 text-sm text-foreground/70">
              <p className="contact-item flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                </span>
                Baakline, Al Shouf, Lebanon
              </p>
              <p className="contact-item flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                </span>
                +961 70 979 482
              </p>
              <p className="contact-item flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                </span>
                hello@danielawde9.com
              </p>
            </div>

            <div ref={socialIconsRef} className="flex gap-4">
              <Link
                href="https://github.com/danielawde9"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon p-3 rounded-full bg-foreground/5 hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <IconBrandGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/danielawde9"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon p-3 rounded-full bg-foreground/5 hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <IconBrandLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://danielawde9.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon p-3 rounded-full bg-foreground/5 hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </Link>
              <Link
                href="mailto:hello@danielawde9.com"
                className="social-icon p-3 rounded-full bg-foreground/5 hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      <Section delay={0.2}>
        <SectionTitle>PROFESSIONAL SUMMARY</SectionTitle>
        <p className="text-foreground/80 text-lg leading-relaxed">
          Skilled Software Engineer and Systems Architect with expertise in
          building AI-powered automation systems and scalable web
          infrastructure. Proficient in transforming complex workflows into
          structured, automated processes while managing cross-functional teams.
          Experienced in transitioning service-based operations to productized
          systems through strategic implementation of modern technologies and
          operational frameworks. Focused on driving innovation through
          systematic approaches to scaling content production and internal
          operations.
        </p>
      </Section>

      {/* Core Competencies */}
      <Section delay={0.3}>
        <SectionTitle>CORE COMPETENCIES</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
          {coreCompetencies.map((skill: string, index: number) => (
            <div
              key={index}
              className="skill-item bg-foreground/5 rounded-lg p-3 flex items-center gap-3 hover:bg-primary/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-foreground/80">{skill}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Professional Experience */}
      <Section delay={0.4}>
        <SectionTitle>PROFESSIONAL EXPERIENCE</SectionTitle>

        <ExperienceCard
          title="Technical Project Manager & Systems Architect"
          company="LelaboDigital"
          period="Jan 2024 – Present"
          duties={[
            "Architected and implemented AI-powered automation systems that streamlined content production workflows, reducing manual effort by 90% while scaling output 10x",
            "Built robust web infrastructure handling high-traffic volumes with 99% uptime using Next.js, Node.js serverless architecture, and Docker containerization",
            "Designed internal operating systems and automation pipelines using Airtable-like workflows, Zapier integrations, and custom APIs to systematize project delivery",
            "Created SOPs and documentation frameworks that transformed ad-hoc processes into repeatable, scalable systems for content creation and distribution",
            "Developed AI-driven content optimization tools for international clients targeting the MENA region, integrating trending topic analysis and localization automation",
            "Led transition from manual service delivery to automated systems by building reusable frameworks and establishing metrics-driven dashboards for performance tracking",
            "Managed cross-functional teams of developers, designers, and QA specialists while implementing agile methodologies and automated task management systems",
            "Served as primary stakeholder liaison, translating founder vision into actionable technical roadmaps with measurable KPIs",
          ]}
        />

        <ExperienceCard
          title="Full Stack Development Trainer"
          company="Park Innovation & AUF"
          period="Nov 2022 – Jan 2024"
          duties={[
            "Designed and delivered a comprehensive 900-hour training program in full stack development for 20 non-CS background students",
            "Conducted a 350-hour training program for CS graduate students, covering various programming languages and technologies",
            "Developed curriculum focusing on MERN stack (MongoDB, Express.js, React, Node.js) and modern web development practices",
            "Mentored students through complex technical challenges, resulting in high completion rates and job placements",
          ]}
        />

        <ExperienceCard
          title="Technical Consultant"
          company="Mercy Corps"
          period="Feb 2023 – Oct 2023"
          duties={[
            "Provided technical consultancy services to the organization, aiding in the launch of their new website and expansion of online visibility",
            "Advised on technical challenges, leveraging software development skills to propose effective solutions",
            "Conducted training sessions in digital marketing and web development, mentoring over 60 students",
            "Implemented digital marketing strategies including SEO optimization, resulting in increased organic traffic",
          ]}
        />

        <ExperienceCard
          title="Front-End Developer"
          company="SaffronSouk"
          period="Jun 2021 – Feb 2023"
          duties={[
            "Developed responsive front-end interfaces for an e-commerce platform",
            "Implemented digital marketing strategies including SEO to increase user engagement and conversion rates",
            "Enhanced online visibility through technical optimizations and marketing initiatives",
          ]}
        />

        <ExperienceCard
          title="Top Rated Freelance Front End Developer"
          company="Upwork"
          period="May 2020 – Nov 2023"
          duties={[
            "Developed websites for clients utilizing web development and SEO best practices to enhance user experience and drive organic traffic",
            "Recognized as a top-rated freelancer on Upwork for consistently delivering high-quality work and maintaining excellent client satisfaction",
            "Managed multiple client projects simultaneously, maintaining high standards of quality",
            "Worked with various technologies including JavaScript, React, Unity, C#, and Firebase",
          ]}
        />

        <ExperienceCard
          title="Coding Bootcamp Program Coordinator"
          company="Park Innovation"
          period="Sep 2019 – Jun 2021"
          duties={[
            "Supervised over 5 coding boot camps, managing over 100 students, and coordinating training sessions on web development, software engineering, and computer programming languages.",
            "Technologies used: Program Coordination, Project Planning, Project Management.",
          ]}
        />

        <ExperienceCard
          title="Network Engineer"
          company="CNS (Converged Network Solutions)"
          period="Jul 2018 – Aug 2019"
          duties={[
            "Regularly configured and troubleshoot complex network solutions, including Cisco firewalls, routers, and switches.",
            "Troubleshoot, diagnosed and resolved hardware, software, and other network and system problems.",
            "Technologies used: CCNA R&S, CCNA Security, CCNP, Network Security.",
          ]}
        />
      </Section>

      {/* Key Projects */}
      <Section delay={0.5}>
        <SectionTitle>KEY PROJECTS</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1 */}
          <TiltCard>
            <Card className="h-full overflow-hidden border-primary/10 bg-gradient-to-br from-background/80 to-background group-hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>

                <div className="relative z-10">
                  <h3 className="font-space-grotesk text-xl font-semibold mb-1 text-foreground">
                    Mingo App
                  </h3>
                  <p className="text-sm text-primary/80 mb-3">
                    Unity Developer | 2018–Present
                  </p>
                  <p className="text-foreground/70 text-sm mb-4">
                    Open-source AR-based educational app inspired by Kahoot,
                    gamifying learning experiences for students and teachers.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {techStacks.arMobile.map(
                      (tech: string, index: number) => (
                        <Badge
                          key={index}
                          className="bg-primary/10 hover:bg-primary/20 text-primary border-none transition-all duration-300"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TiltCard>

          {/* Project 2 */}
          <TiltCard>
            <Card className="h-full overflow-hidden border-primary/10 bg-gradient-to-br from-background/80 to-background group-hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>

                <div className="relative z-10">
                  <h3 className="font-space-grotesk text-xl font-semibold mb-1 text-foreground">
                    Echoes Of History
                  </h3>
                  <p className="text-sm text-primary/80 mb-3">
                    Unity Developer | Aug 2023–Oct 2023
                  </p>
                  <p className="text-foreground/70 text-sm mb-4">
                    AR application showcasing the Kfarmatta Silk Mill in
                    Lebanon, featuring 3D scanned reconstruction of historical
                    and current states.
                  </p>
                  {/* Add project link with pressable style */}
                  <a
                    href="https://echoesofhistory.lelabodigital.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-primary underline hover:text-primary/80 text-sm active:scale-95 transition-transform"
                  >
                    echoesofhistory.lelabodigital.com
                  </a>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {techStacks.arMobile.map(
                      (tech: string, index: number) => (
                        <Badge
                          key={index}
                          className="bg-primary/10 hover:bg-primary/20 text-primary border-none transition-all duration-300"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </div>
      </Section>

      {/* Technical Skills */}
      <Section delay={0.6}>
        <SectionTitle>TECHNICAL SKILLS</SectionTitle>

        <div className="space-y-6">
          <div>
            <h3 className="font-space-grotesk text-lg font-semibold mb-4 text-foreground">
              Technical Proficiencies
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              Proficient in JavaScript, Kotlin, C#, and Python with expertise in
              ReactJS, Next.js, NodeJS, and AR Foundation. Experienced in
              Docker, serverless architecture, and CI/CD pipelines. Skilled in
              automation using Zapier, n8n, and API integrations. Comprehensive
              knowledge of WordPress, Shopify, Unity, and database systems
              (Firebase, MySQL, MongoDB) with hands-on AI/ML integration
              experience.
            </p>
          </div>

          <div>
            <h3 className="font-space-grotesk text-lg font-semibold mb-4 text-foreground">
              Project Management & Operations
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              Strong systems architect with expertise in SOP development,
              process documentation, and workflow design. Proven leadership in
              agile project management and stakeholder engagement. Skilled in
              operational excellence through KPI tracking, dashboard creation,
              and bottleneck analysis. Proficient in digital marketing including
              SEO, SEM, PPC, and Google Analytics.
            </p>
          </div>
        </div>
      </Section>

      {/* Education & Publications */}
      <Section delay={0.7}>
        <SectionTitle>EDUCATION & PUBLICATIONS</SectionTitle>

        <div className="space-y-8">
          <div className="bg-foreground/5 rounded-xl p-6 hover:bg-primary/5 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h3 className="font-space-grotesk text-lg font-semibold text-foreground">
                  Communication & Electronics Engineering (BEng)
                </h3>
                <p className="text-primary/80">Beirut Arab University</p>
              </div>
              <span className="text-foreground/60 text-sm mt-1 md:mt-0 bg-primary/10 px-3 py-1 rounded-full">
                2013 – 2018
              </span>
            </div>
            <p className="text-foreground/70 mt-3">
              Achieved a strong foundation in both hardware and software
              engineering principles.
            </p>
          </div>

          <div className="bg-foreground/5 rounded-xl p-6 hover:bg-primary/5 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg">
            <h3 className="font-space-grotesk text-lg font-semibold text-foreground">
              Compact Dual-Band Lowpass Bandpass Filter
            </h3>
            <p className="text-primary/80">IEEE Transactions on ICEEE 2020</p>
            <p className="text-foreground/70 mt-3">
              Co-authored a research paper published in IEEE, focusing on the
              design and analysis of a compact dual-band lowpass bandpass
              filter.
            </p>
            {/* Add IEEE link with pressable style */}
            <a
              href="https://ieeexplore.ieee.org/document/9102490"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-primary underline hover:text-primary/80 text-sm active:scale-95 transition-transform"
            >
              View on IEEE Xplore
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
