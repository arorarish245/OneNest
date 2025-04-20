import React from 'react';

interface SchemeQuestionProps {
  question: string;
  options: string[];
  selectedOption: string | null;
  onSelect: (value: string) => void;
}

const SchemeQuestion: React.FC<SchemeQuestionProps> = ({
  question,
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <div className="bg-[#B8E6E2] rounded-2xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-[#2D2D2D] mb-4">{question}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option, idx) => {
          const isSelected = selectedOption === option;
          return (
            <button
              key={idx}
              onClick={() => onSelect(option)}
              className={`text-left px-4 py-2 rounded-xl border transition-all duration-200 font-medium 
                ${
                  isSelected
                    ? 'bg-[#6FCF97] text-white border-[#6FCF97]'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#F0FDF6] border-gray-300'
                }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SchemeQuestion;
