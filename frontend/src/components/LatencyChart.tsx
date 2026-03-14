"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Loader2 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AIModel {
  name: string;
  provider: string;
  latency: number;
}

export default function LatencyChart() {
  const [data, setData] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://aiops-backend-production-fed5.up.railway.app/api/models");
        
        // Pick top ~15 fastest models to display in charts so it's not overcrowded
        const sorted = response.data.sort((a: AIModel, b: AIModel) => a.latency - b.latency).slice(0, 15);
        setData(sorted);
      } catch (err) {
        console.error("Error fetching models:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-24 text-primary">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  const chartLabels = data.map((d) => d.name);
  const chartValues = data.map((d) => d.latency);

  const barChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Latency (ms)",
        data: chartValues,
        backgroundColor: "rgba(79, 127, 255, 0.7)",
        borderColor: "rgba(79, 127, 255, 1)",
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: "rgba(34, 211, 238, 0.9)",
      },
    ],
  };

  const lineChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Hardware Ping",
        data: chartValues,
        borderColor: "rgba(124, 58, 237, 1)", // Secondary Color
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        pointBackgroundColor: "rgba(34, 211, 238, 1)", // Accent Color
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#94A3B8", // gray-400
          font: { family: "Inter" }
        }
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#94A3B8", font: { family: "Inter", size: 10 } },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#94A3B8", font: { family: "Inter" } },
      },
    },
  };

  return (
    <div className="p-6 md:p-8 w-full bg-[#0B0F19]/60 backdrop-blur-3xl rounded-xl">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
        <h3 className="text-xl font-bold font-sans text-white">Top 15 Real-time API Speeds</h3>
        <p className="text-sm text-gray-400 font-mono tracking-wide px-3 py-1 bg-gray-900 rounded-lg border border-gray-800">
          Lower is better
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        <div className="glass-panel p-4 rounded-xl border border-white/5 h-[400px]">
          <h4 className="text-sm font-semibold text-gray-400 mb-4 px-2 tracking-wide uppercase">Bar Overview</h4>
          <div className="w-full h-[320px]">
            <Bar data={barChartData} options={options} />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/5 h-[400px]">
          <h4 className="text-sm font-semibold text-gray-400 mb-4 px-2 tracking-wide uppercase">Line Benchmark</h4>
          <div className="w-full h-[320px]">
            <Line data={lineChartData} options={options} />
          </div>
        </div>

      </div>
    </div>
  );
}
