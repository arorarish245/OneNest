"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "💡 How does OneNest support single parents?",
    answer:
      "OneNest offers AI-powered legal assistance, emotional support, and financial aid resources, all tailored specifically for single parents."
  },
  {
    question: "🔒 Is my personal information secure?",
    answer:
      "Absolutely! We prioritize your privacy with end-to-end encryption and strict data protection measures."
  },
  {
    question: "🌟 Can I get legal guidance through OneNest?",
    answer:
      "Yes! Our AI-driven platform connects you with verified legal experts and provides accurate legal insights."
  },
  {
    question: "💬 How can I access support chats?",
    answer:
      "You can easily access our 24/7 AI-powered support chat by visiting the 'Chat' section on the website."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-[#B8E6E2] to-[#FBF8EF] py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6FCF97] to-[#FFB433] drop-shadow-lg">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Find answers to common questions about OneNest.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="grid gap-8">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <button
                className="w-full p-6 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl font-bold text-gray-800">{item.question}</h3>
                <span className="text-2xl text-[#FFB433]">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 text-gray-600"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
