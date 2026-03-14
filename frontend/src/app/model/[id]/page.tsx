"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import CostCalculator, { AIModel } from "@/components/CostCalculator";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Zap, DatabaseZap, DollarSign } from "lucide-react";

export default function ModelDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  
  const [model, setModel] = useState<AIModel & { context_length: number, input_price: number, output_price: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModel() {
      try {
        const response = await axios.get(`https://aiops-backend-production-fed5.up.railway.app/api/models/${id}`);
        setModel(response.data);
      } catch (err) {
        console.error("Error fetching model details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchModel();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-primary">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (!model) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center gap-4 text-gray-400">
        <h2 className="text-2xl font-bold text-white">Model Not Found</h2>
        <button onClick={() => router.push("/models")} className="text-primary hover:underline">Return to Models Database</button>
      </div>
    );
  }

  return (
    <div className="w-full relative mt-8 max-w-6xl mx-auto flex flex-col min-h-screen z-10 px-4">
      
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10 w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Models
      </button>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-start flex-col lg:flex-row gap-10"
      >
        {/* Detail Left Component */}
        <div className="flex-1 w-full">
          <div className="flex flex-col items-start gap-4 mb-10">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-400 uppercase tracking-widest">
              {model.provider}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white glow-effect">{model.name}</h1>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-12">
            
            <div className="glass-panel p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
              <h4 className="text-gray-500 font-medium text-sm flex items-center gap-2 mb-2"><DollarSign className="w-4 h-4 text-accent" /> Input Cost (/1M)</h4>
              <p className="text-3xl font-mono font-bold text-white">${model.input_price}</p>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
              <h4 className="text-gray-500 font-medium text-sm flex items-center gap-2 mb-2"><DollarSign className="w-4 h-4 text-secondary" /> Output Cost (/1M)</h4>
              <p className="text-3xl font-mono font-bold text-white">${model.output_price}</p>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
              <h4 className="text-gray-500 font-medium text-sm flex items-center gap-2 mb-2"><Zap className="w-4 h-4 text-primary" /> Latency</h4>
              <p className="text-3xl font-mono font-bold text-white">{model.latency}<span className="text-lg text-gray-500 font-normal ml-1">ms</span></p>
            </div>

            <div className="glass-panel p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
              <h4 className="text-gray-500 font-medium text-sm flex items-center gap-2 mb-2"><DatabaseZap className="w-4 h-4 text-emerald-400" /> Max Context</h4>
              <p className="text-3xl font-mono font-bold text-white">{model.context_length.toLocaleString()}<span className="text-lg text-gray-500 font-normal ml-1">t</span></p>
            </div>
            
          </div>
        </div>
      </motion.div>

      {/* Built in Cost Calculator per spec */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full mt-10 mb-20"
      >
        <div className="glass-panel rounded-2xl border border-gray-800 bg-gray-900/40 p-1 shadow-[-10px_-10px_30px_4px_rgba(79,127,255,0.05),_10px_10px_30px_4px_rgba(34,211,238,0.05)]">
          {/* Mount the already completed calculator passing in the id so it defaults to this model */}
          <CostCalculator preselectedModelId={model._id} />
        </div>
      </motion.div>
    </div>
  );
}
