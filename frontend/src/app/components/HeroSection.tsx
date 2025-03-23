"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#253237] via-[#1E293B] to-[#0F172A]">
      
      {/* Background Waves */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path 
            fill="#6FCF97" 
            fillOpacity="0.4" 
            d="M0,256L60,245.3C120,235,240,213,360,181.3C480,149,600,107,720,117.3C840,128,960,192,1080,213.3C1200,235,1320,213,1380,202.7L1440,192V320H0Z"
          />
        </svg>
        <svg
          className="absolute w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path 
            fill="#F4A261" 
            fillOpacity="0.3" 
            d="M0,320L60,288C120,256,240,192,360,181.3C480,171,600,213,720,229.3C840,245,960,235,1080,213.3C1200,192,1320,160,1380,144L1440,128V320H0Z"
          />
        </svg>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 px-6 lg:px-24 relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-7xl font-['Manrope'] font-extrabold leading-tight text-white">
            💖 Because <span 
              className="bg-gradient-to-r from-[#F4A261] to-[#6FCF97] text-transparent bg-clip-text"
            > Every Parent Matters</span> 
            <span className="block text-[#B8E6E2] text-4xl mt-2">Your Strength, Our Support</span>
          </h1>

          <p className="mt-8 text-xl font-['Manrope'] text-gray-300 max-w-xl leading-relaxed">
            Navigate single parenting with <span className="font-bold text-[#F4A261]">personalized resources</span>, expert legal guidance, and compassionate AI-driven support—all in one place.
          </p>

          <div className="mt-10 flex justify-center lg:justify-start">
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #FF8A80" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FF6B6B] text-white font-bold py-4 px-12 rounded-full shadow-lg hover:bg-[#FF8A80] transition duration-300"
              >
                🌿 Join Now
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Content (Image) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="bg-white shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-300">
            
            {/* Glowing Border Animation */}
            <div className="absolute inset-0 rounded-3xl border-4 border-transparent group-hover:border-[#6FCF97] transition-all duration-300"></div>

            <Image
              src="/hero_img.png"  
              alt="Single Parent"
              width={550}
              height={550}
              className="rounded-2xl group-hover:scale-105 transition-all duration-300"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
