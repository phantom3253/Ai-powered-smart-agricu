import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Hrishabh Kumar",
    role: "Developer",
    work: "Helps in integration and developing the backend.",
    photo: "/images/professor.jpg",
    linkedin: "https://linkedin.com/in/anjali",
  },
  {
    name: "Omkar Waghmode",
    role: "Frontend Developer",
    work: "Developed UI and integrated multi-language support.",
    photo: "/images/omkar.jpg", 
    linkedin: "https://linkedin.com/in/omkar",
    github: "https://github.com/omkar",
  },
  {
    name: "Adarsh Aanchal",
    role: "ML Engineer",
    work: "Built crop recommendation and plant disease detection models.",
    photo: "/images/sneha.jpg",
    linkedin: "https://linkedin.com/in/sneha",
    github: "https://github.com/sneha",
  },
 
];

// ✨ NEW: We separate the professor from the rest of the team to style them differently.
const professor = teamMembers[0];
const students = teamMembers.slice(1);

const Team = () => {
  return (
    <div className="p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Meet Our Team
        </h2>
        <p className="text-gray-500 mt-2">The dedicated people behind this project.</p>
      </div>

      {/* ✨ NEW: A dedicated section for the professor, centered on large screens. */}
      <div className="flex justify-center mb-10">
        <div
          className="bg-green-50 rounded-lg border border-green-200 p-6 flex flex-col items-center text-center shadow-lg transition-shadow duration-300 hover:shadow-xl w-full max-w-sm relative overflow-hidden"
        >
          {/* ✨ NEW: A small "Guide" badge to highlight the role. */}
          <div className="absolute top-2 right-[-30px] bg-green-500 text-white text-xs font-bold px-8 py-1 transform rotate-45">
            Guide
          </div>
          <img
            src={professor.photo}
            alt={professor.name}
            className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-white"
          />
          <h3 className="text-xl font-semibold text-gray-900">{professor.name}</h3>
          <p className="text-sm font-medium text-green-700">{professor.role}</p>
          <p className="text-sm text-gray-600 mt-3 flex-grow">{professor.work}</p>

          <div className="flex space-x-4 mt-6 pt-4 border-t border-green-200 w-full justify-center">
            {professor.linkedin && (
              <a
                href={professor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FaLinkedin size={22} />
              </a>
            )}
            {professor.github && (
              <a
                href={professor.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-800 transition-colors"
              >
                <FaGithub size={22} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ✨ NEW: A separate grid for the other team members. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-28 h-28 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm font-medium text-green-600">{member.role}</p>
            <p className="text-sm text-gray-600 mt-3 flex-grow">{member.work}</p>

            <div className="flex space-x-4 mt-6 pt-4 border-t border-gray-200 w-full justify-center">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <FaLinkedin size={22} />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-800 transition-colors"
                >
                  <FaGithub size={22} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;