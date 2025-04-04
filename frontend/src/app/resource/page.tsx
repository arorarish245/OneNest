"use client";
import { useEffect, useState } from "react";
import ResourceCard from "../components/ResourceCard";

type Resource = {
  _id?: string;
  title: string;
  description: string;
  type: string;
  link: string;
  tags: string[];
  icon: string;
};

const categories = ["Legal Assistance", "Mental Health Support", "Job Opportunities", "Childcare & Education"];

export default function ResourceHub() {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/resource/resources") // ✅ Update backend URL if needed
      .then((res) => res.json())
      .then((data) => setResources(data));
  }, []);

  return (
    <div className="bg-[#F8F8F8] min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">📚 Resource Hub</h1>

      {categories.map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-semibold text-orange-500 mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources
              .filter((r) => r.type === category)
              .map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
