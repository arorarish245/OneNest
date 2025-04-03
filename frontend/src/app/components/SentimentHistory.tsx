import React from "react";

type SentimentLog = {
  sentiment: string;
  emotion: string;
  text: string;
  timestamp: string;
};

type SentimentHistoryProps = {
  logs: SentimentLog[];
};

const SentimentHistory: React.FC<SentimentHistoryProps> = ({ logs }) => {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md">
      <h2 className="text-lg font-bold">🕒 Sentiment History</h2>
      {logs.length === 0 ? (
        <p className="text-sm text-gray-600">No past records found.</p>
      ) : (
        <ul className="mt-3">
          {logs.map((log, index) => (
            <li
              key={index}
              className="p-3 border-b border-gray-300 flex justify-between"
            >
              <div>
                <p className="text-sm">{log.text}</p>
                <span className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-200 rounded-md">
                {log.sentiment} ({log.emotion})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SentimentHistory;
