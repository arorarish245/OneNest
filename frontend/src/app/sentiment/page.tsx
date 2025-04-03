"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function SentimentPage() {
  const [inputText, setInputText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 10000); // Stop after 10 sec
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch("http://localhost:8000/api/sentiment/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "12345", text: inputText }),
      });

      if (!response.ok) throw new Error("Failed to analyze sentiment");

      const data = await response.json();
      setAnalysis(data);

      // Trigger confetti if sentiment is positive
      if (data.sentiment === "positive") setShowConfetti(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sentiment mapping for emojis and border colors
  const sentimentStyles: Record<string, { emoji: string; border: string }> = {
    positive: { emoji: "😊", border: "border-green-500" },
    negative: { emoji: "😔", border: "border-red-500" },
    neutral: { emoji: "😐", border: "border-yellow-500" },
  };

  const sentimentData = sentimentStyles[analysis?.sentiment] || { emoji: "🤔", border: "border-gray-400" };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#B8E6E2] to-[#F8F8F8] overflow-hidden">
      {showConfetti && <Confetti width={width} height={height} />}
      
      {/* Floating Background Elements (Balanced Six Elements) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Orange Floating Elements */}
        <motion.div className="absolute w-36 h-36 bg-orange-300 rounded-full opacity-40"
          animate={{ y: [0, -50, 0], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          style={{ top: "10%", left: "10%" }} 
        />
        <motion.div className="absolute w-32 h-32 bg-orange-200 rounded-full opacity-35"
          animate={{ y: [0, -40, 0], x: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          style={{ bottom: "15%", right: "15%" }} 
        />
        <motion.div className="absolute w-40 h-40 bg-orange-400 rounded-full opacity-30"
          animate={{ y: [0, -60, 0], x: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          style={{ top: "40%", left: "30%" }} 
        />

        {/* Blue Floating Elements */}
        <motion.div className="absolute w-34 h-34 bg-blue-300 rounded-full opacity-40"
          animate={{ y: [0, -50, 0], x: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut" }}
          style={{ bottom: "30%", left: "5%" }} 
        />
        <motion.div className="absolute w-38 h-38 bg-blue-200 rounded-full opacity-35"
          animate={{ y: [0, -35, 0], x: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut" }}
          style={{ top: "20%", right: "30%" }} 
        />
        <motion.div className="absolute w-28 h-28 bg-blue-400 rounded-full opacity-30"
          animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
          style={{ bottom: "50%", right: "10%" }} 
        />
      </div>

      {/* Main Card */}
      <motion.div
        className={`max-w-3xl w-full p-8 rounded-xl shadow-xl bg-white relative border-4 ${analysis ? sentimentData.border : "border-gray-300"}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Sentiment Analysis</h1>
        
        <textarea
          className="w-full border border-gray-300 rounded-lg p-4 text-black font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter your thoughts..."
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <motion.button
          onClick={handleAnalyze}
          className="mt-4 w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-all shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </motion.button>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        {analysis && (
          <motion.div
            className="mt-6 p-5 bg-gray-50 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Results:</h2>
            
            <p className="text-lg font-medium text-gray-800">
              <strong>Sentiment:</strong> 
              <span className={`px-3 py-1 rounded-md ml-2 ${sentimentData.border} border-2`}>
                {sentimentData.emoji} {analysis.sentiment}
              </span>
            </p>

            <p className="text-lg text-gray-800">
              <strong>Emotion:</strong> <span className="text-blue-700">{analysis.emotion}</span>
            </p>

            <p className="text-lg text-gray-800">
              <strong>Confidence:</strong> {Math.round(analysis.confidence * 100)}%
            </p>

            {analysis.coping_tip && (
              <div className="mt-4 p-4 bg-blue-200 text-blue-900 rounded-lg shadow">
                <strong>Tip:</strong> {analysis.coping_tip}
              </div>
            )}

{analysis.emergency_support && (
  <div className="mt-4 p-4 bg-red-200 text-red-900 rounded-lg shadow">
    <strong>Emergency Support:</strong> {analysis.emergency_support.message}

    {/* Emergency Resources List */}
    {analysis.emergency_support.resources && analysis.emergency_support.resources.length > 0 && (
      <ul className="mt-2 list-disc list-inside">
        {analysis.emergency_support.resources.map((res: { name: string; contact: string }, index: number) => (
          <li key={index} className="text-sm">
            <strong>{res.name}:</strong> {res.contact}
          </li>
        ))}
      </ul>
    )}
  </div>
)}

            
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
