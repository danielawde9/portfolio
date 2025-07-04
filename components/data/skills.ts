// Skill categories with colors and associated skills
export const skillCategories = [
  {
    name: "Development",
    color: "#FF3366",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Next.js",
      "HTML/CSS",
    ],
  },
  {
    name: "AR/Mobile",
    color: "#FF9933",
    skills: ["Unity", "C#", "AR Foundation", "Kotlin", "Firebase"],
  },
  {
    name: "Backend",
    color: "#FFCC33",
    skills: ["MongoDB", "MySQL", "Express", "REST APIs", "Firebase"],
  },
  {
    name: "Management",
    color: "#33CCFF",
    skills: [
      "Agile",
      "Team Leadership",
      "Project Management",
      "Stakeholder Management",
    ],
  },
];

// Skill proficiency levels for deterministic SSR/CSR rendering
export const skillLevels: Record<string, number> = {
  JavaScript: 97,
  TypeScript: 92,
  React: 95,
  "Node.js": 90,
  "Next.js": 90,
  "HTML/CSS": 98,
  Unity: 85,
  "C#": 88,
  "AR Foundation": 80,
  Kotlin: 75,
  Firebase: 85,
  MongoDB: 80,
  MySQL: 78,
  Express: 82,
  "REST APIs": 87,
  Agile: 95,
  "Team Leadership": 93,
  "Project Management": 94,
  "Stakeholder Management": 92,
};