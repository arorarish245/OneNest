"use client";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";

type Resource = {
  _id?: string;
  title: string;
  description: string;
  type: string;
  link: string;
  tags: string[];
  icon: string;
};

const categoryBackgrounds: Record<string, string> = {
  "Legal Assistance": "bg-[#E6F4FF]",
  "Mental Health Support": "bg-[#FFE6EC]",
  "Job Opportunities": "bg-[#E6FFFB]",
  "Childcare & Education": "bg-[#FFF1E6]",
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  const bgStyle = categoryBackgrounds[resource.type] || "bg-white";

  return (
    <div
      className={`group ${bgStyle} rounded-2xl shadow-md border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >

      {/* Icon */}
      <div className="text-4xl mb-3 group-hover:animate-bounce transition">{resource.icon}</div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-black mb-2 font-[Poppins]">{resource.title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 font-[Poppins]">{resource.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-[Poppins]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Link */}
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-teal-600 font-semibold mt-2 hover:underline font-[Poppins]"
      >
        Visit Resource →
      </a>
    </div>
  );
}
