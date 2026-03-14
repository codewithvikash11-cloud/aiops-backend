"use client";

import LatencyChart from "@/components/LatencyChart";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function LatencyPage() {
  return (
    <div className="w-full relative mt-16 max-w-7xl mx-auto flex flex-col min-h-screen z-10">
      
      <div className="absolute top-0 right-[20%] w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
          <Activity className="w-8 h-8 text-primary" /> Global Model Latency
        </h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl font-light">
          Real-time hardware speed reporting and API latency measurements across foundation providers.
        </p>

        <div className="glass-panel rounded-2xl border border-gray-800 bg-gray-900/40 p-1 mb-20 shadow-[-10px_-10px_30px_4px_rgba(79,127,255,0.05),_10px_10px_30px_4px_rgba(34,211,238,0.05)] w-full">
          <LatencyChart />
        </div>
      </motion.div>
    </div>
  );
}
