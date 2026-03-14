import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "OpenAI API Pricing Calculator 2026 - AIOps",
  description: "Calculate and compare API costs for OpenAI GPT-4o, GPT-4 Turbo, and GPT-3.5 explicitly. Discover cheaper alternatives.",
};

export default function OpenAIPricingSEO() {
  return (
    <div className="w-full relative mt-16 max-w-4xl mx-auto flex flex-col min-h-screen z-10 px-4 md:px-0">
      
      <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10 w-fit">
        <ArrowLeft className="w-4 h-4" /> <Link href="/">Back to Dashboard</Link>
      </button>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">OpenAI API Pricing Explained</h1>
      
      <div className="prose prose-invert prose-lg text-gray-300 max-w-none">
        <p>
          OpenAI dominates the Large Language Model market, but understanding token costs across their model versions (GPT-4o, GPT-4 Turbo, GPT-3.5) can be challenging for developers scaling applications.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Current Token Costs (per 1M tokens)</h2>
        <div className="glass-panel rounded-xl overflow-hidden border border-gray-800 my-8">
          <table className="w-full text-left bg-gray-900/40">
            <thead className="bg-[#0B0F19]/80 border-b border-gray-800 text-sm tracking-wider uppercase">
              <tr>
                <th className="p-4">Model</th>
                <th className="p-4 text-right">Input tokens</th>
                <th className="p-4 text-right">Output tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 font-mono">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-sans font-medium text-white flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> GPT-4o</td>
                <td className="p-4 text-right text-emerald-400">$5.00</td>
                <td className="p-4 text-right text-emerald-400">$15.00</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-sans font-medium text-white flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> GPT-4 Turbo</td>
                <td className="p-4 text-right text-primary">$10.00</td>
                <td className="p-4 text-right text-primary">$30.00</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-sans font-medium text-white flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-500"/> GPT-3.5 Turbo</td>
                <td className="p-4 text-right text-gray-500">$0.50</td>
                <td className="p-4 text-right text-gray-500">$1.50</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-white mt-10 mb-4">Calculate Your Specific Workload</h3>
        <p>
          If your application processes millions of chat logs daily, shifting from GPT-4 Turbo to GPT-4o can slash your API bill by 50% overnight.
        </p>

        <div className="mt-10">
          <Link href="/calculator" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary font-semibold text-white hover:bg-white hover:text-primary transition-all shadow-[0_0_15px_rgba(79,127,255,0.4)]">
            Open Advanced Cost Calculator
          </Link>
        </div>

      </div>
    </div>
  );
}
