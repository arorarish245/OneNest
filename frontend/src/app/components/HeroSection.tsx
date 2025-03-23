"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#B8E6E2] to-[#80CBC4] min-h-[90vh] flex items-center justify-center overflow-hidden">
      
      <motion.div
        className="absolute top-10 left-10 w-36 h-36 bg-[#F4A261] rounded-full opacity-60 blur-xl"
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-10 right-20 w-28 h-28 bg-[#6FCF97] rounded-full opacity-70 blur-xl"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6 lg:px-20">
    
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-5xl font-extrabold text-[#2C3E50] leading-tight">
            Empowering 
            <span className="text-[#F4A261]"> Single Parents</span>
          </h1>
          
          <p className="mt-6 text-lg text-gray-700 max-w-xl leading-relaxed">
            🌟 Get access to <span className="font-bold text-[#F4A261]">financial schemes</span>, emotional support, 
            and AI-powered legal assistance — all in one place.
          </p>

          <div className="mt-6 flex justify-center lg:justify-start">
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#6FCF97] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#57b482] transition"
              >
                🌟 Get Started
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition">
            <Image
              src="/hero_img.png"  
              alt="Mother with Baby"
              width={450}
              height={450}
              className="rounded-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
