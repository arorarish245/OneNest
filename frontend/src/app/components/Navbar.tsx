"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-[#80CBC4] text-[#FBF8EF] shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-3 border-b-3 border-[#B4EBE6]">
        
        
        <Link href="/" className="flex items-center space-x-1 hover:scale-105 transition duration-300">
          <Image 
            src="/logo.png" 
            alt="OneNest Logo" 
            width={32}                   
            height={32}
            className="rounded-full"

          />
          <span className="text-2xl font-bold tracking-wide hover:text-[#FFB433] transition">
            neNest
          </span>
        </Link>

        
        <div className="hidden md:flex space-x-8">
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
              className={`relative group transition ${
                pathname === link.href 
                  ? "text-[#FFB433] font-bold"
                  : "text-[#FBF8EF]"
              } hover:text-[#FFB433]`}
            >
              {link.label}
              
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FFB433] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        
        <div className="md:hidden">
          <button className="text-[#FBF8EF] focus:outline-none">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
