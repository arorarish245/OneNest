"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-b from-[#FBF8EF] via-[#B8E6E2] to-[#6FCF97] py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
        
        {/* CTA Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-[#253237] mb-6"
        >
          🌟 Join OneNest Today!
        </motion.h2>

        <p className="text-lg text-gray-700 mb-10">
          Get access to AI-powered legal support, emotional guidance, and financial aid tailored for single parents.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-6">
          <Link href="/register" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#6FCF97] text-white text-lg font-medium px-8 py-4 rounded-full shadow-lg hover:bg-[#55b983] transition"
            >
              Get Started 🚀
            </motion.button>
          </Link>

          <Link href="/learn-more" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#6FCF97] border-2 border-[#6FCF97] text-lg font-medium px-8 py-4 rounded-full shadow-lg hover:bg-[#f4f4f4] transition"
            >
              Learn More 💡
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
