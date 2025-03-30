"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; type: "user" | "bot" }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, type: "user" as "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/chat", { prompt: input });
      const botMessage = { text: response.data.response, type: "bot" as "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "Failed to get response.", type: "bot" as "bot" }]);
    }

    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full rounded-lg shadow-lg overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #80cbc4, #374151)",
      }}
    >
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" style={{ scrollbarWidth: "thin" }}>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-2xl px-5 py-3 max-w-[75%] shadow-md ${
                msg.type === "user"
                  ? "bg-[#35434a] text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <motion.div
              className="bg-gray-200 text-gray-600 px-4 py-2 rounded-2xl text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
              Bot is typing...
            </motion.div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex items-center border-t p-4 bg-white rounded-b-lg shadow-md">
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 p-2 bg-opacity-70 bg-white backdrop-blur-md border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-[#F4A261] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#E76F51] transition"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
