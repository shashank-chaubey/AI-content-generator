"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const searchTexts = [
  "🤔 What are you looking for?",
  "🚀 Find anything in seconds!",
  "🔍 Type and discover!",
];

function SearchSection({ onSearchInput }: { onSearchInput: (value: string) => void }) {
  const [currentText, setCurrentText] = useState(searchTexts[0]);
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % searchTexts.length;
      setCurrentText(searchTexts[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-8 text-center text-white sm:p-10">
      
      {/* Dynamic Changing Text */}
      <motion.h2
        className="text-xl font-bold sm:text-2xl"
        key={currentText}
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: [0, -5, 0],
          color: ["#ffffff", "#ffd700", "#ff5733", "#00ffcc", "#ffffff"],
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {currentText}
      </motion.h2>

      {/* Search Bar */}
      <div className="w-full flex justify-center">
        <motion.div
          className="my-5 flex w-full max-w-2xl items-center gap-2 rounded-md border bg-white p-3 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent w-full outline-none text-black"
            onChange={(event) => onSearchInput(event.target.value)}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default SearchSection;
