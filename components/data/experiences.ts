import type { Experience } from "../sectionsUI/experience-item";

const experiences: Experience[] = [
  {
    id: 1,
    title: "Technical Project Manager – SEO & Digital Strategy",
    company: "Lelabo Digital",
    period: "Jan 2024 – Present",
    description:
      "Drive end-to-end SEO programs for global brands entering Middle East & North Africa markets, delivering measurable organic-traffic growth.",
    responsibilities: [
      "Audit and optimize international SEO campaigns for Arabic and English SERPs",
      "Coordinate developers, UX/UI designers, and QA engineers to deploy SEO-friendly features",
      "Serve as strategic liaison between C-level stakeholders and production teams",
      "Apply Agile and PMI methodologies to ship deliverables on time and within budget",
    ],
    color: "#FF3366",
  },

  {
    id: 2,
    title: "Full-Stack Development Trainer & Curriculum Designer",
    company: "Park Innovation & AUF",
    period: "Nov 2022 – Jan 2024",
    description:
      "Designed and delivered immersive MERN-stack bootcamps, upskilling career-changers and CS graduates in modern web development.",
    responsibilities: [
      "Led a 900-hour program for 20 non-technical students; achieved 95 % graduation rate",
      "Taught a 350-hour advanced MERN course for computer-science graduates",
      "Mentored learners through complex debugging, code reviews, and career prep",
      "Authored project-based curriculum covering React, Node.js, PostgreSQL, and CI/CD best practices",
    ],
    color: "#FF9933",
  },

  {
    id: 3,
    title: "Technical Consultant & Front-End Developer – E-Commerce Growth",
    company: "Mercy Corps & Saffron Souk",
    period: "May 2021 – Oct 2023",
    description:
      "Advised NGOs and startups on digital transformation and built high-converting storefronts for an online marketplace.",
    responsibilities: [
      "Directed site-launch roadmap, boosting organic visibility by 120 %",
      "Developed responsive, mobile-first React interfaces integrated with e-commerce APIs",
      "Executed content and backlink strategies to increase qualified traffic",
      "Led workshops on SEO, analytics, and conversion optimization for in-house teams",
    ],
    color: "#FFCC33",
  },

  {
    id: 4,
    title: "Top-Rated Freelance Front-End Developer",
    company: "Upwork",
    period: "May 2020 – Nov 2023",
    description:
      "Built pixel-perfect, SEO-optimized websites for global SMB clients while maintaining 100 % Job Success on Upwork.",
    responsibilities: [
      "Managed 30+ concurrent projects with clear Agile sprint communication",
      "Developed sites and SPAs using React, Next.js, TypeScript, and Tailwind CSS",
      "Implemented technical SEO, Core Web Vitals, and accessibility best practices",
      "Created interactive WebGL experiences with Unity and C# for gamified marketing",
    ],
    color: "#33CCFF",
  },
];

export default experiences;
