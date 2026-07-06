"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const phrases = [
    "AI-Powered Creativity 🎨",
    "Unlock Your Imagination 🔥",
    "Transform Ideas into Reality 🚀",
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 py-10 text-center text-white sm:px-6">
      
      {/* Floating AI Light Animation */}
      <motion.div 
        className="absolute top-10 left-1/3 w-24 h-24 bg-blue-500 blur-3xl opacity-20 animate-pulse"
      ></motion.div>

      {/* Logo with Subtle Scaling */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6 }}
      >
        <Image src="/logo.svg" alt="Logo" width={120} height={120} className="mb-4 h-20 w-20 sm:mb-6 sm:h-[120px] sm:w-[120px]" />
      </motion.div>

      {/* Hero Text with Fading Animation */}
      <motion.h1 
        className="mb-4 min-h-[5rem] text-3xl font-bold sm:min-h-0 sm:text-4xl md:text-6xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {phrases[currentPhrase]}
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        className="mb-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Supercharge your creativity with AI-driven tools designed to help you 
        write, design, and innovate like never before.
      </motion.p>

      {/* Feature Cards */}
      <motion.div 
        className="mb-8 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-blue-400">✍️ AI Writing</h3>
          <p className="text-sm text-gray-300 mt-2">Generate blogs, articles, and engaging content effortlessly.</p>
        </div>
        <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-yellow-400">📝 Smart Notes</h3>
          <p className="text-sm text-gray-300 mt-2">Create structured and concise notes for any topic or chapter.</p>
        </div>
        <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400">🚀 Productivity</h3>
          <p className="text-sm text-gray-300 mt-2">Enhance workflow with AI-powered emails, responses, and automation.</p>
        </div>

        
      </motion.div>

      {/* CTA Button with Glowing Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button 
          className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
          onClick={() => router.push("/dashboard")}
        >
          Get Started 🚀
        </Button>
      </motion.div>
    </div>
  );
}
