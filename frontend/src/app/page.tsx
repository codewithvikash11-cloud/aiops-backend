"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Zap, Activity, Calculator, BrainCircuit, Box, Server, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center relative mt-16">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-accent/15 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl z-10 px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Find the Best AI Model <br className="hidden md:block" />
          <span className="gradient-text drop-shadow-lg">for Your App</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
          Developer-first dashboard to compare AI models by API cost, latency speed, and performance across top providers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/models"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-gray-950 font-semibold hover:bg-gray-200 transition-all hover-glow shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <Activity className="w-5 h-5" />
            Compare Models
          </Link>
          <Link
            href="/calculator"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-gray-700 bg-gray-900/50 text-white font-medium hover:bg-gray-800 transition-all hover-glow"
          >
            <Calculator className="w-5 h-5 text-accent" />
            AI Cost Calculator
          </Link>
        </div>
      </motion.div>

      {/* Floating Elements Animation */}
      <motion.div 
        animate={{ y: [-10, 10, -10] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-1/4 left-[15%] hidden lg:flex items-center justify-center w-16 h-16 rounded-2xl glass-panel text-primary pointer-events-none"
      >
        <BrainCircuit className="w-8 h-8" />
      </motion.div>
      <motion.div 
        animate={{ y: [15, -15, 15] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-[15%] hidden lg:flex items-center justify-center w-20 h-20 rounded-2xl glass-panel text-accent pointer-events-none"
      >
        <Server className="w-10 h-10" />
      </motion.div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-32 z-10 px-4">
        {[
          { title: "AI Model Comparison", icon: <Box className="w-6 h-6 text-primary" />, desc: "Instantly compare top LLMs by performance and benchmark scores.", path: "/models" },
          { title: "Cost Calculator", icon: <Calculator className="w-6 h-6 text-accent" />, desc: "Precise token calculator utilizing the newest API pricing metrics.", path: "/calculator" },
          { title: "Latency Dashboard", icon: <Activity className="w-6 h-6 text-secondary" />, desc: "Monitor real-time throughput rates and AI server latency.", path: "/latency" },
          { title: "AI Developer Tools", icon: <Zap className="w-6 h-6 text-emerald-400" />, desc: "Token counters, formatters, and utility apps for engineers.", path: "/tools" },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link href={feature.path}>
              <div className="glass-panel hover-glow p-6 rounded-2xl h-full flex flex-col items-start bg-gray-900/30 text-left transition-all border border-gray-800 cursor-pointer overflow-hidden group">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Trusted Providers Section */}
      <div className="w-full max-w-4xl mt-32 z-10 px-4 border-t border-gray-800 pt-16">
        <p className="text-sm font-mono text-gray-500 mb-8 tracking-widest uppercase">Benchmarking the industry leaders</p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-80 mix-blend-screen grayscale hover:grayscale-0 transition-all duration-500">
          {["OpenAI", "Anthropic", "Google", "Meta", "Mistral", "DeepSeek", "Cohere", "Alibaba"].map((brand) => (
            <div key={brand} className="text-xl md:text-2xl font-bold text-gray-300 group flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
              <span className="group-hover:text-white transition-colors">{brand}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
