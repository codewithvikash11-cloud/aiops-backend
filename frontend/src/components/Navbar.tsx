"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Cpu, Zap, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Models", href: "/models" },
  { name: "Calculator", href: "/calculator" },
  { name: "Latency", href: "/latency" },
  { name: "AI Tools", href: "/tools" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between p-4 lg:px-12" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-secondary p-[1px] glow-effect">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0B0F19]">
                <Cpu className="h-5 w-5 text-accent group-hover:text-white transition-colors absolute" />
                <Zap className="h-3 w-3 text-secondary absolute translate-x-[4px] -translate-y-[4px] fill-secondary" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
              AIOps
            </span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium leading-6 transition-all duration-200 hover:text-white ${
                  isActive ? "text-accent drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-gray-400"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="https://github.com/codewithvikash11-cloud/aiops-backend"
            target="_blank"
            className="flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-700 hover:border-gray-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-50 bg-[#0B0F19]/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between p-4 px-6 border-b border-gray-800">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Cpu className="h-6 w-6 text-accent" />
                <span className="text-xl font-bold text-white">AIOps</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root px-6">
              <div className="-my-6 divide-y divide-gray-800">
                <div className="space-y-4 py-6 flex flex-col">
                  {navLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="https://github.com/codewithvikash11-cloud/aiops-backend"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-white/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Github className="h-5 w-5" />
                    Star on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
