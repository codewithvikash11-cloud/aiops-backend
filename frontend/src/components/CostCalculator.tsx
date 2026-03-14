"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Calculator, Orbit, Activity, DollarSign, DatabaseZap } from "lucide-react";
import { motion } from "framer-motion";

export interface AIModel {
  _id: string;
  name: string;
  provider: string;
  latency: number;
}

export default function CostCalculator({ preselectedModelId }: { preselectedModelId?: string }) {
  const [models, setModels] = useState<AIModel[]>([]);
  const [modelId, setModelId] = useState<string>(preselectedModelId || "");
  const [inputTokens, setInputTokens] = useState<number>(1000000);
  const [outputTokens, setOutputTokens] = useState<number>(500000);
  
  const [cost, setCost] = useState<number | null>(null);
  const [latencyResult, setLatencyResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await axios.get("https://aiops-backend-production-fed5.up.railway.app/api/models");
        setModels(response.data);
        if (!preselectedModelId && response.data.length > 0) {
          setModelId(response.data[0]._id);
        }
      } catch (err) {
        console.error("Error fetching models:", err);
      }
    }
    fetchModels();
  }, [preselectedModelId]);

  const calculateCost = async () => {
    if (!modelId) return;
    setLoading(true);
    setCost(null);
    try {
      // Calling the precise API endpoint required for cost
      const res = await axios.post("https://aiops-backend-production-fed5.up.railway.app/api/calculate-cost", {
        model_id: modelId,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
      });
      setCost(res.data.cost);
      
      const selectedInfo = models.find(m => m._id === modelId);
      if(selectedInfo) setLatencyResult(selectedInfo.latency);
      
    } catch (err) {
      console.error("Failed to calculate cost", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 w-full font-sans bg-[#0B0F19]/60 backdrop-blur-3xl rounded-xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Controls */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Select AI Model</label>
            <div className="relative">
              <Orbit className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <select
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                className="w-full bg-[#111827] border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary text-gray-200 rounded-lg pl-10 pr-4 py-3 outline-none appearance-none cursor-pointer hover:bg-gray-900 transition-colors"
              >
                {models.map((m) => (
                  <option key={m._id} value={m._id}>{m.provider} - {m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Input Tokens</label>
              <div className="relative">
                <DatabaseZap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  type="number"
                  min="0"
                  value={inputTokens}
                  onChange={(e) => setInputTokens(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#111827] border border-gray-800 focus:border-primary text-gray-200 rounded-lg pl-9 pr-4 py-3 outline-none font-mono"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Output Tokens</label>
              <div className="relative">
                <DatabaseZap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                <input
                  type="number"
                  min="0"
                  value={outputTokens}
                  onChange={(e) => setOutputTokens(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#111827] border border-gray-800 focus:border-secondary text-gray-200 rounded-lg pl-9 pr-4 py-3 outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculateCost}
            disabled={loading || !modelId}
            className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold tracking-wide hover:opacity-90 disabled:opacity-50 transition-all hover-glow shadow-[0_0_15px_rgba(79,127,255,0.4)]"
          >
            {loading ? <Calculator className="w-5 h-5 animate-pulse" /> : <Calculator className="w-5 h-5" />}
            Calculate API Cost
          </button>
        </div>

        {/* Results Card */}
        <div className="flex-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-800/80 pt-6 md:pt-0 md:pl-8">
          <motion.div 
            className="glass-panel relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#111827] to-[#0B0F19] border border-white/5 p-8 flex flex-col justify-center min-h-[220px]"
            animate={{ scale: cost !== null && !loading ? [0.98, 1.02, 1] : 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Soft backdrop glow behind results inside card */}
            <div className={`absolute inset-0 bg-primary/5 blur-3xl opacity-0 transition-opacity duration-1000 ${cost !== null ? 'opacity-100' : ''}`} />

            {cost === null && !loading ? (
              <div className="text-center text-gray-500 font-mono text-sm relative z-10">
                Awaiting token inputs for evaluation...
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center gap-3 text-accent relative z-10">
                <Calculator className="w-6 h-6 animate-ping" />
                <span className="font-mono animate-pulse">Computing Matrix...</span>
              </div>
            ) : (
              <div className="flex flex-col gap-6 relative z-10">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2 uppercase tracking-wide">
                    <DollarSign className="w-4 h-4 text-primary" /> Estimated API Cost
                  </h4>
                  <div className="text-4xl sm:text-5xl font-bold font-mono text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] flex items-baseline gap-1">
                    <span className="text-2xl text-primary">$</span>
                    {cost?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />

                <div>
                  <h4 className="text-xs font-medium text-gray-400 mb-2 flex items-center gap-2 uppercase tracking-wide">
                    <Activity className="w-3.5 h-3.5 text-accent" /> Estimated Hardware Latency
                  </h4>
                  <div className="text-2xl font-bold font-mono text-gray-200">
                    {latencyResult} 
                    <span className="text-sm font-normal text-gray-500 ml-2">ms / request</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
