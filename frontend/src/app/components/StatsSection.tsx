"use client";
import { motion } from "framer-motion";

const globalStats = [
  { value: "320M+", label: "Single parents globally", color: "#80CBC4" },
  { value: "80%", label: "Struggle to access legal aid", color: "#B4EBE6" },
  { value: "45%", label: "Lack reliable childcare support", color: "#FFA726" },  // Changed to orange for better contrast
  { value: "60%", label: "Feel isolated without support", color: "#F4A261 " },
];

const oneNestGoals = [
  { value: "50K+", label: "Users by Year 1", color: "#80CBC4" },
  { value: "1M+", label: "AI support chats by Year 2", color: "#B4EBE6" },
  { value: "100+", label: "NGO & legal partnerships", color: "#FFA726" },  // Improved contrast
  { value: "5K+", label: "Successful financial aids", color: "#F4A261 " },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#B4EBE6] via-[#A1E3DD] to-[#80CBC4] text-center"> 
      
      {/* Global Single Parent Stats */}
      <motion.h2 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-[#253237] mb-16"
      >
        🌎 Single Parent Trends
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 px-8">
        {globalStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="bg-white shadow-xl rounded-2xl p-10 transform transition-transform duration-500 hover:shadow-2xl hover:rotate-3"
          >
            <div className="text-6xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <p className="text-lg text-gray-700 mt-3">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* OneNest Vision Stats */}
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-5xl font-extrabold text-[#253237] my-16"
      >
        🚀 Our Future Vision
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 px-8">
        {oneNestGoals.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotateY: -10 }}
            className="bg-white shadow-xl rounded-2xl p-10 transform transition-transform duration-500 hover:shadow-2xl hover:-rotate-3"
          >
            <div className="text-6xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <p className="text-lg text-gray-700 mt-3">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
