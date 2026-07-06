"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-black px-4 py-10 text-center text-white sm:px-6">
    
      <motion.div 
        className="absolute top-10 left-1/4 w-24 h-24 bg-purple-500 blur-3xl opacity-20 animate-pulse"
      ></motion.div>

      
      <motion.h1 
        className="mb-4 text-3xl font-bold sm:text-4xl md:text-6xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        About <span className="text-blue-400">Me</span>
      </motion.h1>

      <motion.p 
        className="text-lg text-gray-400 mb-6 max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        I am passionate about developing AI-powered applications that enhance creativity, streamline workflows, and generate new ideas. 
        Feel free to reach out to me via email. I would love to hear from you:
      </motion.p>

      {/* Team Showcase */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-blue-400">🚀 Innovation</h3>
          <p className="text-sm text-gray-300 mt-2">Constantly exploring new AI-driven possibilities.</p>
        </div>
        <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-yellow-400">🛠️ Development</h3>
          <p className="text-sm text-gray-300 mt-2">Building smart, efficient, and creative AI applications.</p>
        </div>
        
      </motion.div>
    
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button 
          className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
          onClick={() => router.push("/contact")}
        >
          Reach Out 📩
        </Button>
      </motion.div>
    </div>
  );
}
