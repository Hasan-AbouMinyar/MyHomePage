import React from "react";

const NewSkills = () => {
  const technicalSkills = [
    { name: "HTML" },
    { name: "CSS" },
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "React JS" },
    { name: "Next.js" },
    { name: "Three.js" },
    { name: "GSAP" },
    { name: "Framer Motion" },
    { name: "Git" },
    { name: "GitHub" },
    { name: "Redux" },
    { name: "Tailwind CSS" },
    { name: "Material UI" },
    { name: "Figma" },
    { name: "Firebase" },
    { name: "Wordpress" },
  ];

  const softSkills = [
    "Analytical Thinking",
    "Time & Task Management",
    "Effective Communication",
    "Persistence & Problem Solving",
    "Self-Learning",
    "Creativity & Design Thinking",
    "Teamwork & Collaboration",
  ];

  return (
    <div id="skills" className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white p-10 flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-10 text-center">Technical and Soft Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Technical Skills</h3>
            <ul className="space-y-2">
              {technicalSkills.map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Soft Skills</h3>
            <ul className="space-y-2">
              {softSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSkills;
