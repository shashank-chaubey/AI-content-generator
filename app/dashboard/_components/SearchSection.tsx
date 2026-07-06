"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const searchTexts = ["What will you create today?", "Find the right AI tool in seconds", "Start with a template, finish with your voice"];

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
    <section className="relative overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-8 sm:py-14 lg:px-10">
      <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Template library</p>
      
      {/* Dynamic Changing Text */}
      <motion.h2
        className="min-h-10 text-2xl font-bold tracking-tight sm:text-3xl"
        key={currentText}
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: [0, -5, 0],
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {currentText}
      </motion.h2>

      {/* Search Bar */}
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Browse focused prompts for writing, marketing, study, and development.</p>
      <div className="w-full">
        <motion.div
          className="mt-6 flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-white p-3.5 shadow-2xl shadow-black/20 sm:p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Search className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search templates, e.g. blog, email, code..."
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
            onChange={(event) => onSearchInput(event.target.value)}
          />
        </motion.div>
      </div>
      </div>
    </section>
  );
}

export default SearchSection;
