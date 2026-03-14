import Link from "next/link";
import { Cpu, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const navigation = {
    product: [
      { name: "Models", href: "/models" },
      { name: "Pricing", href: "/pricing" },
      { name: "Calculator", href: "/calculator" },
      { name: "Latency", href: "/latency" },
    ],
    tools: [
      { name: "AI Tools", href: "/tools" },
      { name: "Token Counter", href: "/tools/token-counter" },
      { name: "Prompt Formatter", href: "/tools/prompt-formatter" },
      { name: "JSON Validator", href: "/tools/json-validator" },
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
      { name: "OpenAI vs Claude", href: "/gpt4o-vs-claude" },
      { name: "Best Models", href: "/best-ai-model-for-chatbots" },
    ],
    social: [
      { name: "GitHub", href: "https://github.com/codewithvikash11-cloud", icon: Github },
      { name: "Twitter", href: "#", icon: Twitter },
      { name: "LinkedIn", href: "#", icon: Linkedin },
    ],
  };

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0B0F19]/50 glass-panel" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-[1600px] px-6 pb-8 pt-16 sm:pt-24 lg:px-12 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Cpu className="h-6 w-6 text-accent" />
              <span className="text-2xl font-bold tracking-tight text-white glow-effect">AIOps</span>
            </Link>
            <p className="text-sm leading-6 text-gray-400 max-w-xs">
              Empowering engineers to compare AI models, analyze performance drops, and slash API costs with developer-grade analytics.
            </p>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-500 hover:text-accent transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Developer Tools</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.tools.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400 text-center">&copy; 2026 AIOps Premium SaaS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
