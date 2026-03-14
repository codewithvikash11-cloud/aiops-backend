"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link2, Search, SlidersHorizontal, ArrowUpDown, Loader2, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface AIModel {
  _id: string;
  name: string;
  provider: string;
  input_price: number;
  output_price: number;
  context_length: number;
  latency: number;
}

export default function ModelTable() {
  const [data, setData] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [providerFilter, setProviderFilter] = useState("All");
  
  const [sortBy, setSortBy] = useState<"name" | "cost" | "latency">("name");
  const [sortDesc, setSortDesc] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://aiops-backend-production-fed5.up.railway.app/api/models");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching models:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const providers = ["All", ...Array.from(new Set(data.map((m) => m.provider)))];

  const handleSort = (key: "cost" | "latency" | "name") => {
    if (sortBy === key) setSortDesc(!sortDesc);
    else {
      setSortBy(key);
      setSortDesc(false);
    }
  };

  const filteredData = useMemo(() => {
    let result = [...data];

    // Filter by Search
    if (search) {
      result = result.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Filter by Provider
    if (providerFilter !== "All") {
      result = result.filter((m) => m.provider === providerFilter);
    }

    // Sorting
    result.sort((a, b) => {
      let valA, valB;
      if (sortBy === "cost") {
        valA = a.input_price + a.output_price;
        valB = b.input_price + b.output_price;
      } else if (sortBy === "latency") {
        valA = a.latency;
        valB = b.latency;
      } else {
        valA = a.name;
        valB = b.name;
      }

      if (valA < valB) return sortDesc ? 1 : -1;
      if (valA > valB) return sortDesc ? -1 : 1;
      return 0;
    });

    return result;
  }, [data, search, providerFilter, sortBy, sortDesc]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-24 text-primary">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 w-full flex flex-col gap-6 font-sans">
      
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-black/20 p-4 rounded-xl border border-white/5 shadow-inner">
        <div className="relative w-full sm:w-96 text-gray-400 focus-within:text-white transition-colors">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
          <input
            type="text"
            placeholder="Search AI models..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-gray-950 border border-gray-800 focus:border-primary/50 text-sm rounded-lg pl-10 pr-4 py-2 hover:bg-gray-900 transition-all outline-none"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <select
            value={providerFilter}
            onChange={(e) => { setProviderFilter(e.target.value); setPage(1); }}
            className="w-full sm:w-auto bg-gray-950 border border-gray-800 text-gray-300 rounded-lg px-4 py-2 hover:bg-gray-900 transition-all outline-none cursor-pointer text-sm font-medium"
          >
            {providers.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0B0F19]/60 backdrop-blur-md">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-800 bg-black/40 text-gray-400 uppercase tracking-wider font-mono text-xs">
              <th className="p-4 rounded-tl-xl font-medium cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("name")}>
                <div className="flex items-center gap-2">Model <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="p-4 font-medium">Provider</th>
              <th className="p-4 font-medium text-right cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort("cost")}>
                <div className="flex items-center justify-end gap-2">Input ($/1M) <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="p-4 font-medium text-right cursor-pointer hover:text-secondary transition-colors" onClick={() => handleSort("cost")}>
                Output ($/1M)
              </th>
              <th className="p-4 font-medium text-right hidden sm:table-cell">Context</th>
              <th className="p-4 rounded-tr-xl font-medium text-right cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort("latency")}>
                <div className="flex items-center justify-end gap-2">Avg. Latency (ms) <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/80">
            {paginatedData.map((model, idx) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={model._id} 
                className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
              >
                <td className="p-4 font-medium text-gray-100 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  {model.name}
                </td>
                <td className="p-4 text-gray-400 group-hover:text-gray-200 transition-colors">
                  <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono">
                    {model.provider}
                  </span>
                </td>
                <td className="p-4 text-right text-accent font-mono">
                  ${model.input_price.toFixed(2)}
                </td>
                <td className="p-4 text-right text-secondary font-mono">
                  ${model.output_price.toFixed(2)}
                </td>
                <td className="p-4 text-right hidden sm:table-cell font-mono text-gray-400">
                  {model.context_length.toLocaleString()}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-primary font-mono">
                    <Activity className="w-3 h-3" /> {model.latency}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <Link href={`/model/${model._id}`} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-300 hover:text-white hover:border-gray-500 hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                    <Link2 className="w-3 h-3" /> View
                  </Link>
                </td>
              </motion.tr>
            ))}
            
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500 font-mono">No models match your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-800/80 pt-4 mt-2">
          <p className="text-sm text-gray-500 font-mono">
            Showing <span className="text-white font-medium">{(page - 1) * itemsPerPage + 1}</span> to <span className="text-white font-medium">{Math.min(page * itemsPerPage, filteredData.length)}</span> of <span className="text-white font-medium">{filteredData.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 flex items-center justify-center rounded-lg border border-gray-800 hover:bg-gray-800 hover:text-white text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-4 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 font-mono">
              Page {page} of {totalPages}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 flex items-center justify-center rounded-lg border border-gray-800 hover:bg-gray-800 hover:text-white text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
