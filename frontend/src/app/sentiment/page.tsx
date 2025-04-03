"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa";

const SentimentPage = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<"positive" | "neutral" | "negative" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sentiment/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          user_id: "user123",  // Replace with real user ID from authentication
        }),
      });
  
      const data = await res.json();
      setSentiment(data.sentiment);
      setLoading(false);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-lightblue-300 flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center"
      >
        <h1 className="text-2xl font-bold text-teal-600 mb-4">Sentiment Analysis</h1>

        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          rows={4}
          placeholder="Type your thoughts here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-all"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {sentiment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 rounded-lg text-white text-lg"
            style={{
              backgroundColor:
                sentiment === "positive" ? "#6FCF97" :
                sentiment === "neutral" ? "#F4A261" :
                "#E57373"
            }}
          >
            {sentiment === "positive" && (
              <div className="flex items-center justify-center gap-2">
                <FaSmile className="text-2xl" /> 
                <span>You're feeling good! Keep up the positivity! 😊</span>
              </div>
            )}
            {sentiment === "neutral" && (
              <div className="flex items-center justify-center gap-2">
                <FaMeh className="text-2xl" />
                <span>Seems like you're neutral. Need some motivation? 🤔</span>
              </div>
            )}
            {sentiment === "negative" && (
              <div className="flex items-center justify-center gap-2">
                <FaFrown className="text-2xl" />
                <span>Feeling down? We're here to support you! 💙</span>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SentimentPage;
