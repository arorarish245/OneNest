"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white pt-16 pb-10">
      
      {/* Glowing Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-[#F4A261] via-[#6FCF97] to-[#B8E6E2] rounded-full shadow-md mb-12"></div>

      <div className="container mx-auto px-8 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Section 1: Brand Info */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">OneNest</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Empowering single parents with <span className="text-[#F4A261]">AI-driven resources</span>, expert legal support, and financial assistance.
          </p>
        </div>

        {/* Section 2: Navigation Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
          <a href="/about" className="text-gray-400 hover:text-[#F4A261] transition-transform transform hover:translate-x-1">About Us</a>
          <a href="/services" className="text-gray-400 hover:text-[#F4A261] transition-transform transform hover:translate-x-1">Services</a>
          <a href="/contact" className="text-gray-400 hover:text-[#F4A261] transition-transform transform hover:translate-x-1">Contact</a>
          <a href="/privacy" className="text-gray-400 hover:text-[#F4A261] transition-transform transform hover:translate-x-1">Privacy Policy</a>
        </div>

        {/* Section 3: Social Icons */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="#" className="text-white hover:text-[#F4A261] transition-transform transform hover:scale-110">
              <FaFacebookF size={28} />
            </a>
            <a href="#" className="text-white hover:text-[#F4A261] transition-transform transform hover:scale-110">
              <FaTwitter size={28} />
            </a>
            <a href="#" className="text-white hover:text-[#F4A261] transition-transform transform hover:scale-110">
              <FaInstagram size={28} />
            </a>
            <a href="#" className="text-white hover:text-[#F4A261] transition-transform transform hover:scale-110">
              <FaLinkedinIn size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-12">
        © {new Date().getFullYear()} OneNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
