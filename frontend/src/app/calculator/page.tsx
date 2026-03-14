"use client";

import CostCalculator from "@/components/CostCalculator";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";

export default function CalculatorPage() {
  return (
    <div className="w-full relative mt-16 max-w-4xl mx-auto flex flex-col min-h-screen z-10">
      
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
          <Calculator className="w-8 h-8 text-secondary" /> AI Cost Calculator
        </h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl font-light">
          Input your estimated token volume to dynamically calculate the overall API cost and latency hit for top AI models.
        </p>

        <div className="glass-panel rounded-2xl border border-gray-800 bg-gray-900/40 p-1 mb-20 shadow-[-10px_-10px_30px_4px_rgba(79,127,255,0.05),_10px_10px_30px_4px_rgba(34,211,238,0.05)] w-full">
          <CostCalculator />
        </div>
      </motion.div>
    </div>
  );
}
