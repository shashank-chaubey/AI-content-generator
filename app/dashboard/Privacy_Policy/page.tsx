"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-black px-4 py-10 text-center text-white sm:px-6">
      <motion.div 
        className="absolute top-10 left-1/3 w-24 h-24 bg-blue-500 blur-3xl opacity-20 animate-pulse"
      ></motion.div>


      <motion.h1 
        className="mb-4 text-3xl font-bold sm:text-4xl md:text-6xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Privacy <span className="text-blue-400">Policy</span>
      </motion.h1>

      <motion.p 
        className="text-lg text-gray-400 mb-6 max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Your privacy is important to me. This policy outlines how I collect, use, and protect your data when you use my AI-powered applications.
      </motion.p>


      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-blue-400">🔒 Data Security</h3>
          <p className="text-sm text-gray-300 mt-2">I implement industry-standard security measures to protect your data.</p>
        </div>
        <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-yellow-400">📄 Data Usage</h3>
          <p className="text-sm text-gray-300 mt-2">Your data is used only to enhance user experience and is never sold.</p>
        </div>
        <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400">📬 Contact</h3>
          <p className="text-sm text-gray-300 mt-2">For privacy-related concerns, email me at nnehub@gmail.com.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button 
          className="px-6 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
          onClick={() => router.push("/dashboard")}
        >
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
}
