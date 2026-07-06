"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TermsAndConditions() {
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
        Terms & <span className="text-blue-400">Conditions</span>
      </motion.h1>

      <motion.p 
        className="text-lg text-gray-400 mb-6 max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        By using my AI-powered applications, you agree to the following terms and conditions. Please read them carefully before proceeding.
      </motion.p>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-blue-400">📜 Usage Policy</h3>
          <p className="text-sm text-gray-300 mt-2">You may use my AI tools for personal and professional purposes within ethical guidelines.</p>
        </div>
        <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-yellow-400">⚖️ Liability</h3>
          <p className="text-sm text-gray-300 mt-2">I am not responsible for any unintended outcomes from using my AI-powered applications.</p>
        </div>
        <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400">🔄 Updates</h3>
          <p className="text-sm text-gray-300 mt-2">These terms may be updated from time to time. It is your responsibility to review them periodically.</p>
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
