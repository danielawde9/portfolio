import React from "react";

export type Experience = {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  color: string;
};

interface ExperienceItemProps {
  experience: Experience;
  setActiveExperience?: (idx: number) => void;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  experience,
  setActiveExperience,
}) => {
  return (
    <article
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
      itemScope
      itemType="https://schema.org/JobPosting"
      onClick={() =>
        setActiveExperience && setActiveExperience(experience.id - 1)
      }
    >
      <header className="mb-6">
        <h3 className="text-3xl font-bold mb-2 text-white" itemProp="title">
          {experience.title}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: experience.color }}
          ></span>
          <p className="text-xl text-white" itemProp="hiringOrganization">
            {experience.company}
          </p>
        </div>
        <time className="block text-white mb-2" itemProp="datePosted">
          {experience.period}
        </time>
        <p className="text-white mb-6" itemProp="description">
          {experience.description}
        </p>
      </header>
      <section>
        <h4 className="text-lg font-semibold mb-3 text-white">
          Key Responsibilities:
        </h4>
        <ul className="space-y-3">
          {experience.responsibilities.map((responsibility, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div
                className="w-5 h-5 mt-1 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: experience.color }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-white">{responsibility}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default ExperienceItem;
