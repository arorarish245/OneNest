'use client';

import React, { useState } from 'react';
import {
  FaExternalLinkAlt, FaMoneyBillWave, FaHome, FaChild, FaTools,
  FaGraduationCap, FaHeartbeat, FaBriefcase,
} from 'react-icons/fa';

type SchemeProps = {
  scheme: {
    title: string;
    description: string;
    eligibility?: string;
    benefits?: string;
    application_process?: string;
    official_link?: string;
    region?: string;
  };
};

const SchemeBookCard = ({ scheme }: SchemeProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getIcon = (title: string, description: string) => {
    const content = `${title} ${description}`.toLowerCase();
    if (content.includes('financial') || content.includes('income') || content.includes('scholarship'))
      return <FaMoneyBillWave size={60} className="text-[#6FCF97]" />;
    if (content.includes('house') || content.includes('housing') || content.includes('rent'))
      return <FaHome size={60} className="text-[#6FCF97]" />;
    if (content.includes('child') || content.includes('creche') || content.includes('kids'))
      return <FaChild size={60} className="text-[#6FCF97]" />;
    if (content.includes('skill') || content.includes('training') || content.includes('employment'))
      return <FaTools size={60} className="text-[#6FCF97]" />;
    if (content.includes('education') || content.includes('school') || content.includes('college'))
      return <FaGraduationCap size={60} className="text-[#6FCF97]" />;
    if (content.includes('health') || content.includes('medical') || content.includes('insurance'))
      return <FaHeartbeat size={60} className="text-[#6FCF97]" />;
    if (content.includes('job') || content.includes('career') || content.includes('internship'))
      return <FaBriefcase size={60} className="text-[#6FCF97]" />;
    return <FaMoneyBillWave size={60} className="text-[#6FCF97]" />;
  };

  return (
    <div className="w-full max-w-md perspective">
      <div
        className={`relative w-full h-[360px] transition-transform duration-1000 transform-style-preserve-3d ${showDetails ? 'rotate-y-180' : ''}`}
      >
        {/* Front Side */}
        <div className={`absolute w-full h-full backface-hidden bg-white border-l-4 border-[#6FCF97] rounded-xl shadow-lg p-6 flex flex-col justify-between items-center text-center transition-all`}>
          <h3 className="text-lg font-bold text-gray-800 mb-3">{scheme.title}</h3>
          <div className="flex-grow flex items-center justify-center">
            {getIcon(scheme.title, scheme.description)}
          </div>
          <button
            className="mt-auto px-4 py-2 bg-[#F4A261] text-white rounded-full font-medium hover:bg-orange-500 transition"
            onClick={() => setShowDetails(true)}
          >
            View Details
          </button>
        </div>

        {/* Back Side (Details) */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 bg-white border-l-4 border-[#6FCF97] rounded-xl shadow-lg p-6 flex flex-col transition-all`}>
          <div className="flex-1 overflow-y-auto pr-1 space-y-2 text-sm text-gray-700">
            <h3 className="text-lg font-bold text-teal-700">{scheme.title}</h3>
            <p><strong>Description:</strong> {scheme.description}</p>
            {scheme.eligibility && <p><strong>Eligibility:</strong> {scheme.eligibility}</p>}
            {scheme.benefits && <p><strong>Benefits:</strong> {scheme.benefits}</p>}
            {scheme.application_process && <p><strong>Application Process:</strong> {scheme.application_process}</p>}
            {scheme.official_link && (
              <p>
                <strong>Official Link:</strong>{' '}
                <a href={scheme.official_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline inline-flex items-center gap-1">
                  Visit <FaExternalLinkAlt size={12} />
                </a>
              </p>
            )}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
            onClick={() => setShowDetails(false)}
          >
            Hide Details
          </button>
        </div>
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1500px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-180 .backface-hidden {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default SchemeBookCard;
