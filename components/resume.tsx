"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Section = ({ children, className = "", delay = 0 }: SectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={`mb-12 ${className}`}
    >
      {children}
    </motion.section>
  );
};

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => (
  <h2 className="font-space-grotesk text-2xl font-bold mb-6 pb-2 border-b border-primary/20 text-foreground flex items-center gap-2">
    <span className="relative">
      <span className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-full"></span>
      {children}
    </span>
  </h2>
);

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="mb-8 relative pl-5 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:to-transparent hover:before:bg-primary/80 before:transition-all before:duration-300"
    >
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
          <li key={index} className="flex items-start gap-2">
            <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
            <span>{duty}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function Resume() {
  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto">
      {/* Header Section */}
      <motion.header
        className="mb-12 relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-background to-background/40 border border-primary/10 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <div className="relative z-10">
          <motion.h1
            className="font-space-grotesk text-4xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            DANIEL AWDE
          </motion.h1>

          <motion.h2
            className="font-space-grotesk text-xl md:text-2xl text-foreground/80 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Technical Project Manager & Software Engineer
          </motion.h2>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <motion.div
              className="space-y-2 text-sm text-foreground/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                </span>
                Baakline, Al Shouf, Lebanon
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                </span>
                +961 70 979 482
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                </span>
                hello@danielawde9.com
              </p>
            </motion.div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="https://github.com/danielawde9"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-foreground/5 hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/danielawde9"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-foreground/5 hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://danielawde9.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-foreground/5 hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </Link>
              <Link
                href="mailto:hello@danielawde9.com"
                className="p-3 rounded-full bg-foreground/5 hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Professional Summary */}
      <Section delay={0.2}>
        <SectionTitle>PROFESSIONAL SUMMARY</SectionTitle>
        <p className="text-foreground/80 text-lg leading-relaxed">
          Versatile Technical Project Manager and Software Engineer with proven
          expertise in web and mobile application development, including
          augmented reality technologies. Adept at bridging technical solutions
          with strategic business objectives to enhance user experiences and
          drive organizational success. Demonstrated ability to lead
          cross-functional teams, manage stakeholder relationships, and deliver
          complex projects on time and within budget. Committed to leveraging
          technical expertise and leadership skills to foster innovation and
          achieve impactful results.
        </p>
      </Section>

      {/* Core Competencies */}
      <Section delay={0.3}>
        <SectionTitle>CORE COMPETENCIES</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
          {[
            "Technical Leadership",
            "Project Management",
            "Team Coordination",
            "Stakeholder Management",
            "Software Development",
            "AR/VR Technologies",
            "Digital Marketing",
            "SEO Optimization",
            "Client Relationship",
          ].map((skill: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-foreground/5 rounded-lg p-3 flex items-center gap-3 hover:bg-primary/10 transition-all duration-300"
            >
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-foreground/80">{skill}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Professional Experience */}
      <Section delay={0.4}>
        <SectionTitle>PROFESSIONAL EXPERIENCE</SectionTitle>

        <ExperienceCard
          title="Technical Project Manager"
          company="Lelabo Digital"
          period="Jan 2024 – Present"
          duties={[
            "Lead SEO projects for international clients targeting the MENA region, focusing on on-page and off-page optimization strategies.",
            "Manage the development of complex game web applications, implementing SEO strategies to enhance visibility and user engagement.",
            "Direct a cross-functional team of developers, designers, and QA specialists, fostering collaboration and driving innovation.",
            "Serve as the primary point of contact for clients and stakeholders, effectively managing expectations and addressing concerns.",
            "Implement project management methodologies to ensure timely delivery and high-quality outcomes.",
          ]}
        />

        <ExperienceCard
          title="Full Stack Development Trainer"
          company="Park Innovation & AUF"
          period="Nov 2022 – Jan 2024"
          duties={[
            "Designed and delivered a comprehensive 900-hour training program in full stack development for 20 non-CS background students.",
            "Conducted a 350-hour training program for CS graduate students, covering various programming languages and technologies.",
            "Developed curriculum focusing on MERN stack (MongoDB, Express.js, React, Node.js) and modern web development practices.",
            "Mentored students through complex technical challenges, resulting in high completion rates and job placements.",
          ]}
        />

        <ExperienceCard
          title="Technical Consultant & Front-End Developer"
          company="Mercy Corps & Saffron Souk"
          period="May 2021 – Oct 2023"
          duties={[
            "Provided technical leadership and consultancy services, guiding the launch of new websites and expanding online visibility.",
            "Developed responsive front-end interfaces for e-commerce platforms, enhancing user experience and conversion rates.",
            "Implemented digital marketing strategies, including SEO optimization, resulting in increased organic traffic.",
            "Led training sessions in digital marketing and web development, mentoring over 60 students.",
          ]}
        />

        <ExperienceCard
          title="Top Rated Freelance Front End Developer"
          company="Upwork"
          period="May 2020 – Nov 2023"
          duties={[
            "Managed multiple client projects simultaneously, maintaining high standards of quality and client satisfaction.",
            "Developed websites utilizing web development best practices and SEO optimization techniques.",
            "Achieved top-rated status for consistently delivering high-quality work and maintaining excellent client relationships.",
            "Worked with various technologies including JavaScript, React, Unity, C#, and Firebase.",
          ]}
        />
      </Section>

      {/* Key Projects */}
      <Section delay={0.5}>
        <SectionTitle>KEY PROJECTS</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1 */}
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="group"
          >
            <Card className="h-full overflow-hidden border-primary/10 bg-gradient-to-br from-background/80 to-background group-hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>

                <div className="relative z-10">
                  <h3 className="font-space-grotesk text-xl font-semibold mb-1 text-foreground">
                    Mingo App
                  </h3>
                  <p className="text-sm text-primary/80 mb-3">
                    Unity Developer | 2018-Present
                  </p>
                  <p className="text-foreground/70 text-sm mb-4">
                    Open-source AR-based educational app inspired by Kahoot,
                    gamifying learning experiences for students and teachers.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Unity", "C#", "Firebase", "AR Foundation"].map(
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
          </motion.div>

          {/* Project 2 */}
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="group"
          >
            <Card className="h-full overflow-hidden border-primary/10 bg-gradient-to-br from-background/80 to-background group-hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>

                <div className="relative z-10">
                  <h3 className="font-space-grotesk text-xl font-semibold mb-1 text-foreground">
                    Echoes Of History
                  </h3>
                  <p className="text-sm text-primary/80 mb-3">
                    Unity Developer | Aug 2023-Oct 2023
                  </p>
                  <p className="text-foreground/70 text-sm mb-4">
                    AR application showcasing the Kfarmatta Silk Mill in
                    Lebanon, featuring 3D scanned reconstruction of historical
                    and current states.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Unity", "C#", "Firebase", "AR Foundation"].map(
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
          </motion.div>
        </div>
      </Section>

      {/* Technical Skills */}
      <Section delay={0.6}>
        <SectionTitle>TECHNICAL SKILLS</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-foreground/5 rounded-xl p-6 hover:bg-primary/5 transition-all duration-300">
            <h3 className="font-space-grotesk text-lg font-semibold mb-4 text-foreground">
              Programming & Development
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "JavaScript",
                "Kotlin",
                "C#",
                "ReactJS",
                "NodeJS",
                "Unity",
                "AR Foundation",
                "WordPress",
                "Shopify",
              ].map((skill: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-foreground/5 rounded-xl p-6 hover:bg-primary/5 transition-all duration-300">
            <h3 className="font-space-grotesk text-lg font-semibold mb-4 text-foreground">
              Project Management & Marketing
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Agile",
                "Team Leadership",
                "Stakeholder Engagement",
                "SEO",
                "SEM",
                "PPC",
                "Google Analytics",
              ].map((skill: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Education & Publications */}
      <Section delay={0.7}>
        <SectionTitle>EDUCATION & PUBLICATIONS</SectionTitle>

        <div className="space-y-8">
          <div className="bg-foreground/5 rounded-xl p-6 hover:bg-primary/5 transition-all duration-300">
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

          <div className="bg-foreground/5 rounded-xl p-6 hover:bg-primary/5 transition-all duration-300">
            <h3 className="font-space-grotesk text-lg font-semibold text-foreground">
              Compact Dual-Band Lowpass Bandpass Filter
            </h3>
            <p className="text-primary/80">IEEE Transactions on ICEEE 2020</p>
            <p className="text-foreground/70 mt-3">
              Co-authored a research paper published in IEEE, focusing on the
              design and analysis of a compact dual-band lowpass bandpass
              filter.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
