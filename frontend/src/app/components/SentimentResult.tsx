import React from "react";

type SentimentProps = {
  sentiment: string;
  confidence: number;
  emotion: string;
  copingTip: string;
  emergencySupport?: {
    message: string;
    resources: { name: string; contact: string }[];
  };
};

const SentimentResult: React.FC<SentimentProps> = ({
  sentiment,
  confidence,
  emotion,
  copingTip,
  emergencySupport,
}) => {
  const sentimentColors = {
    positive: "bg-green-100 text-green-800",
    neutral: "bg-gray-100 text-gray-800",
    negative: "bg-red-100 text-red-800",
  };

  const sentimentEmojis = {
    positive: "😃",
    neutral: "😐",
    negative: "😢",
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
      {/* Sentiment */}
      <div className={`p-3 rounded-md ${sentimentColors[sentiment]}`}>
        <h2 className="text-lg font-bold flex items-center">
          {sentimentEmojis[sentiment]} Sentiment: {sentiment.toUpperCase()}
        </h2>
        <p className="text-sm">Confidence: {(confidence * 100).toFixed(2)}%</p>
      </div>

      {/* Emotion Category */}
      <div className="mt-4">
        <span className="inline-block bg-blue-200 text-blue-800 px-3 py-1 text-xs font-semibold rounded-full">
          Emotion: {emotion}
        </span>
      </div>

      {/* Coping Tip */}
      <div className="mt-4 p-3 border-l-4 border-blue-500 bg-blue-50">
        <p className="text-sm">{copingTip}</p>
      </div>

      {/* Emergency Support */}
      {emergencySupport && (
        <div className="mt-4 p-4 border-l-4 border-red-500 bg-red-50">
          <h3 className="text-red-700 font-semibold">{emergencySupport.message}</h3>
          <ul className="mt-2">
            {emergencySupport.resources.map((res, index) => (
              <li key={index} className="text-sm text-red-700">
                {res.name}: <span className="font-bold">{res.contact}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SentimentResult;
