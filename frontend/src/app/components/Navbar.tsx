"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#253237] to-[#1E293B] text-[#FBF8EF] shadow-lg sticky top-0 z-50">
      
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/logo.png" 
            alt="OneNest Logo" 
            width={40} 
            height={40} 
            className="rounded-full hover:scale-110 transition-transform"
          />
          <span className="text-3xl font-extrabold tracking-wide text-white hover:text-[#FFB433] transition">
            OneNest
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10">
          {[
            { href: "/", label: "Home" },
            { href: "/login", label: "Login" },
            { href: "/register", label: "Register" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "/schemes", label: "Schemes" },
            { href: "/chat", label: "Chat" },
            { href: "/sentiment", label: "Sentiment Analysis" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative group text-lg font-medium transition ${
                pathname === link.href 
                  ? "text-[#FFB433] font-bold" 
                  : "text-white"
              } hover:text-[#FFB433]`}
            >
              {link.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FFB433] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white text-3xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#1E293B] shadow-lg md:hidden flex flex-col items-center space-y-6 py-6"
          >
            {[
              { href: "/", label: "Home" },
              { href: "/login", label: "Login" },
              { href: "/register", label: "Register" },
              { href: "/dashboard", label: "Dashboard" },
              { href: "/schemes", label: "Schemes" },
              { href: "/chat", label: "Chat" },
              { href: "/sentiment", label: "Sentiment Analysis" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium transition ${
                  pathname === link.href 
                    ? "text-[#FFB433] font-bold" 
                    : "text-white"
                } hover:text-[#FFB433]`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
