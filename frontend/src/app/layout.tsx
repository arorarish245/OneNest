import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import ChatWidget from "./components/ChatWidget";

export const metadata: Metadata = {
  title: "OneNest - Empowering Single Parents",
  description: "Support, guidance, and AI-powered assistance for single parents.",
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen bg-gray-50">{children}</main>
        {/* <ChatWidget/> */}
      </body>
    </html>
  );
}
