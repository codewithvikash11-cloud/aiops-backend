"use client";

import ModelTable from "@/components/ModelTable";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function ModelsPage() {
  return (
    <div className="w-full relative mt-16 max-w-7xl mx-auto flex flex-col min-h-screen z-10">
      
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
          <Search className="w-8 h-8 text-accent" /> Select Your Foundation Model
        </h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl font-light">
          Compare cutting-edge Large Language Models by API token costs, max context length, and average latency.
        </p>

        <div className="glass-panel rounded-2xl border border-gray-800 bg-gray-900/40 p-1 mb-20 shadow-[-10px_-10px_30px_4px_rgba(79,127,255,0.05),_10px_10px_30px_4px_rgba(34,211,238,0.05)] w-full">
          <ModelTable />
        </div>
      </motion.div>
    </div>
  );
}
