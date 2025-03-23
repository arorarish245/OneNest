"use client";
import { motion } from "framer-motion";
import { FaRobot, FaSmile, FaBook, FaHandHoldingUsd } from "react-icons/fa";

const KeyFeatures = () => {
  const features = [
    {
      icon: <FaRobot className="text-[#FFB433] text-4xl" />,
      title: "AI-Powered Chatbot",
      description: "Instant legal guidance, parenting tips, and emotional support with real-time AI assistance.",
    },
    {
      icon: <FaSmile className="text-[#FFB433] text-4xl" />,
      title: "Sentiment Analysis",
      description: "Analyze emotional trends with AI-powered insights and personalized recommendations.",
    },
    {
      icon: <FaBook className="text-[#FFB433] text-4xl" />,
      title: "Resource Hub",
      description: "Access parenting guides, legal resources, and engage in community discussions with fellow single parents.",
    },
    {
      icon: <FaHandHoldingUsd className="text-[#FFB433] text-4xl" />,
      title: "Financial Aid Finder",
      description: "Discover grants and schemes tailored to your location and financial profile with our smart recommendation engine.",
    },
  ];

  const circleVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: [0.3, 0.6, 0.1],
      scale: [1, 1.5, 1],
      transition: { repeat: Infinity, duration: 8, ease: "easeInOut" },
    },
  };

  return (
    <section className="relative bg-[#B4EBE6] py-20 overflow-hidden">
      {/* Floating Circles */}
      <motion.div
        className="absolute w-32 h-32 bg-[#FFB433] rounded-full opacity-20"
        style={{ top: "10%", left: "5%" }}
        variants={circleVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute w-40 h-40 bg-[#80CBC4] rounded-full opacity-30"
        style={{ top: "30%", left: "80%" }}
        variants={circleVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute w-24 h-24 bg-[#FFB433] rounded-full opacity-20"
        style={{ bottom: "15%", left: "60%" }}
        variants={circleVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute w-28 h-28 bg-[#80CBC4] rounded-full opacity-25"
        style={{ bottom: "5%", right: "10%" }}
        variants={circleVariants}
        initial="initial"
        animate="animate"
      />

      <div className="container mx-auto text-center relative z-10">
        <motion.h2
          className="text-6xl font-extrabold mb-12 text-[#53746D]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[#FFB433]">Empower.</span>{" "}
          <span className="text-[#80CBC4]">Support.</span>{" "}
          <span className="text-[#53746D]">Thrive.</span>
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#FBF8EF] p-10 rounded-3xl shadow-lg border border-[#80CBC4] hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-[#1E3A3A]">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
