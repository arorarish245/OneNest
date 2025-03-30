"use client";
import React, { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Chatbot from "./Chatbot";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-110 z-50"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={28} />
      </button>

      {/* Side Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="bg-black opacity-50 w-full h-full"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="w-[600px] h-full bg-white shadow-lg transform transition-transform ease-in-out duration-300"
          >
            {/* Header */}
            <div
              className="flex items-center p-2 text-white shadow-md"
              style={{ backgroundColor: "#1E293B" }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="OneNest Logo"
                  width={55} // ✅ Larger logo
                  height={55}
                  className="rounded-full hover:scale-110 transition-transform"
                />
                <h2 className="text-2xl font-bold ml-2" style={{ fontFamily: "Poppins, sans-serif" }}> 
                  NestMate
                </h2>
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto"
              >
                <X size={28} />
              </button>
            </div>

            {/* Chatbot Component */}
            <div className="h-[calc(100vh-60px)]">
              <Chatbot />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
