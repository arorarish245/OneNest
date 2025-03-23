"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const StoryCarousel = () => {
  const slides = [
    {
      story: `"After my divorce, I felt completely lost. Managing finances and legalities alone seemed impossible. I had no one to turn to, and even basic legal guidance felt overwhelming."`,
      solution: `OneNest offers simplified legal resources and AI-powered support, guiding you through legalities and providing emotional support whenever you need it.`,
    },
    {
      story: `"Being a single parent meant working two jobs to make ends meet. I barely had time to research financial aid, let alone apply for it. I missed out on grants I was eligible for."`,
      solution: `OneNest suggests tailored financial aid schemes based on your income and location, ensuring you never miss out on support.`,
    },
    {
      story: `"Parenting alone was emotionally draining. I constantly worried about my child's well-being but had no one to seek guidance from."`,
      solution: `OneNest’s AI-powered chatbot provides emotional support, parenting tips, and real-time assistance, helping you feel supported.`,
    },
    {
      story: `"I felt isolated without a support network. I needed to connect with people who understood my struggles, but finding such a community was difficult."`,
      solution: `OneNest offers interactive forums where you can connect with fellow single parents, share experiences, and find support.`,
    },
  ];

  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000); // Auto-scroll every 8 sec
    return () => clearInterval(interval);
  }, []);

  // Ensure the container has a fixed height
  useEffect(() => {
    if (containerRef.current) {
      const maxHeight = Array.from(containerRef.current.children).reduce(
        (max, child) => Math.max(max, child.offsetHeight),
        0
      );
      containerRef.current.style.height = `${maxHeight}px`;
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#B8E6E2] py-28 font-['Inter']">
      
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Rotating Gradient */}
        <div className="absolute w-full h-full bg-gradient-to-br from-[#6FCF97] to-[#B8E6E2] opacity-40 animate-[spin_15s_linear_infinite]"></div>

        {/* Floating Dots */}
        <div className="absolute w-5 h-5 bg-[#F4A261] rounded-full opacity-50 animate-float left-20 top-16"></div>
        <div className="absolute w-7 h-7 bg-[#6FCF97] rounded-full opacity-50 animate-float right-28 top-36"></div>
        <div className="absolute w-6 h-6 bg-[#F4A261] rounded-full opacity-50 animate-float bottom-32 left-1/3"></div>
      </div>

      <div className="container mx-auto px-8 lg:px-24 relative z-10">
        
        {/* Carousel Container with Fixed Height */}
        <div ref={containerRef} className="relative overflow-hidden shadow-2xl rounded-3xl bg-white transition-all duration-500 ease-in-out">
          <AnimatePresence>
            <motion.div
              key={current}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex items-center justify-between p-20 rounded-3xl"
            >
              {/* Left Side: Story */}
              <div className="w-1/2 pr-12">
                <p className="text-3xl font-['Lora'] italic text-[#F4A261] leading-relaxed mb-6">
                  {slides[current].story}
                </p>
              </div>

              {/* Right Side: Solution */}
              <div className="w-1/2">
                <p className="text-2xl text-gray-700 font-medium leading-relaxed">
                  {slides[current].solution}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 transform -translate-y-1/2 bg-[#6FCF97] text-white p-4 rounded-full shadow-lg hover:bg-[#55b983] hover:scale-110 transition"
            style={{ width: "55px", height: "55px" }}
          >
            <FaChevronLeft size={22} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 bg-[#6FCF97] text-white p-4 rounded-full shadow-lg hover:bg-[#55b983] hover:scale-110 transition"
            style={{ width: "55px", height: "55px" }}
          >
            <FaChevronRight size={22} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-12">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-6 h-6 mx-2 rounded-full cursor-pointer transition ${
                current === index ? "bg-[#F4A261] scale-110" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoryCarousel;
