"use client";

type Resource = {
  _id?: string;
  title: string;
  description: string;
  type: string;
  link: string;
  tags: string[];
  icon: string;
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">
      <div className="text-3xl mb-2">{resource.icon}</div>
      <h3 className="text-lg font-bold mb-1">{resource.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {resource.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-teal-600 font-medium mt-2 hover:underline"
      >
        Visit Resource →
      </a>
    </div>
  );
}
