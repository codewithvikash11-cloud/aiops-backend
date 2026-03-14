"use client";

import ToolCard from "@/components/ToolCard";
import { Wrench, Hash, Braces, Send, FileJson, CopyCheck, Code, ShieldCheck, Fingerprint, Clock, TextSelect, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function ToolsLandingPage() {
  const toolsInfo = [
    { title: "AI Token Counter", description: "Instantly count tiktoken tokens accurately for OpenAI models.", slug: "token-counter", icon: <Hash className="w-6 h-6" />, category: "AI" as const },
    { title: "JSON Formatter", description: "Format, validate and beautify nasty JSON strings.", slug: "json-formatter", icon: <Braces className="w-6 h-6" />, category: "Formatting" as const },
    { title: "API Tester", description: "Send fast HTTP requests without Postman. Great for debugging AI endpoints.", slug: "api-tester", icon: <Send className="w-6 h-6" />, category: "Utility" as const },
    { title: "Prompt Formatter", description: "Beautify and escape system prompts for JSON payload injections.", slug: "prompt-formatter", icon: <TextSelect className="w-6 h-6" />, category: "AI" as const },
    { title: "JSON Validator", description: "Strict schema validation to catch syntax errors.", slug: "json-validator", icon: <FileJson className="w-6 h-6" />, category: "Formatting" as const },
    { title: "Base64 Encoder", description: "Decode and encode Base64 strings safely.", slug: "base64", icon: <Code className="w-6 h-6" />, category: "Utility" as const },
    { title: "JWT Decoder", description: "Inspect JSON Web Tokens securely on the client.", slug: "jwt-decoder", icon: <ShieldCheck className="w-6 h-6" />, category: "Security" as const },
    { title: "UUID Generator", description: "Generate secure version 4 universally unique identifiers.", slug: "uuid-generator", icon: <Fingerprint className="w-6 h-6" />, category: "Utility" as const },
    { title: "Timestamp Converter", description: "Convert Epoch times to human-readable localized dates.", slug: "timestamp", icon: <Clock className="w-6 h-6" />, category: "Utility" as const },
    { title: "Regex Tester", description: "Test complex regular expressions instantly.", slug: "regex-tester", icon: <CopyCheck className="w-6 h-6" />, category: "Utility" as const },
    { title: "Markdown Preview", description: "Edit and preview GitHub-flavored markdown files.", slug: "markdown-preview", icon: <FileText className="w-6 h-6" />, category: "Formatting" as const },
  ];

  return (
    <div className="w-full relative mt-16 max-w-7xl mx-auto flex flex-col min-h-screen z-10 px-4 md:px-0">
      
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
          <Wrench className="w-8 h-8 text-emerald-400" /> AI Developer Tools
        </h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl font-light">
          A suite of free, client-side only utilities to build, format, and debug AI applications at blazing speeds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24 z-10 relative">
          {toolsInfo.map((tool, i) => (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
