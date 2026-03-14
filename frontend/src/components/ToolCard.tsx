import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
  category: "Formatting" | "Utility" | "AI" | "Security";
}

export default function ToolCard({ title, description, icon, slug, category }: ToolCardProps) {
  return (
    <Link href={`/tools/${slug}`} className="group block h-full">
      <div className="glass-panel p-6 rounded-2xl h-full flex flex-col justify-between bg-gray-900/30 text-left transition-all border border-gray-800 hover:border-gray-600 hover:bg-gray-800/50 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(79,127,255,0.15)] relative overflow-hidden">
        
        {/* Top Highlight Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#0B0F19] text-accent rounded-lg ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              {icon}
            </div>
            <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full border border-gray-700 bg-gray-800 text-gray-400 group-hover:text-gray-300">
              {category}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-gray-400 mb-6">
            {description}
          </p>
        </div>

        <div className="flex items-center text-sm font-semibold text-primary mt-auto">
          Start tool <ArrowRight className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </div>
      </div>
    </Link>
  );
}
