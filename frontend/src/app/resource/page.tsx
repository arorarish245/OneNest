"use client";
import { useEffect, useState } from "react";
import ResourceCard from "../components/ResourceCard";
import { motion } from "framer-motion";

// Define resource structure
type Resource = {
  _id?: string;
  title: string;
  description: string;
  type: string;
  link: string;
  tags: string[];
  icon: string;
};

// Define categories with additional display info
const categories = [
  {
    name: "Legal Assistance",
    color: "#FFEDD5", // pastel orange
    emoji: "⚖️",
    description: "Guidance and support for legal matters.",
  },
  {
    name: "Mental Health Support",
    color: "#DBEAFE", // pastel blue
    emoji: "🧠",
    description: "Emotional and psychological support.",
  },
  {
    name: "Job Opportunities",
    color: "#DCFCE7", // pastel green
    emoji: "💼",
    description: "Find work and skill development resources.",
  },
  {
    name: "Childcare & Education",
    color: "#EDE9FE", // pastel purple
    emoji: "🎓",
    description: "Support for your child’s learning and care.",
  },
];

export default function ResourceHub() {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/resource/resources")
      .then((res) => res.json())
      .then((data) => setResources(data));
  }, []);

  return (
    <div className="relative bg-[#F8F8F8] min-h-screen px-4 md:px-10 py-10 font-sans overflow-x-hidden">
      {/* Page Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-500 via-orange-400 to-pink-500 text-transparent bg-clip-text">
          Discover Support Tailored For You
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Explore a curated collection of resources to guide and empower single
          parents on every step of their journey.
        </p>
      </motion.div>

      {/* Category sections */}
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          className="mb-20 rounded-2xl p-6 md:p-10"
          style={{ backgroundColor: category.color }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          {/* Category Title & Desc */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black flex items-center gap-2">
              <span>{category.emoji}</span> {category.name}
            </h2>
            <p className="text-gray-700 mt-1 text-sm md:text-base">
              {category.description}
            </p>
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources
              .filter((r) => r.type === category.name)
              .map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
