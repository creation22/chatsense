import React from "react";
import { Icon } from "@iconify/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How it Works", href: "#steps" },
        { label: "Live Demo", href: "#" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Privacy Guide", href: "#" },
        { label: "Source Code", href: "https://github.com/creation22/chatsense" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ]
    }
  ];

  return (
    <footer className="w-full border-t border-slate-200 bg-white pt-16 pb-8 relative overflow-hidden">

      {/* Background decoration (matches landing page grid) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Top Grid: Brand + Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">

          {/* Brand Column (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 group cursor-default">
              {/* Logo Squircle */}
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
                <Icon icon="mdi:chat-processing-outline" className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                TalkSense
              </span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Privacy-first conversation intelligence. Decoding the hidden patterns in your chats without storing a single byte.
            </p>

            {/* Socials Row */}
            <div className="flex gap-3">
              {[
                { icon: "prime:twitter", href: "https://twitter.com/_Creation22" },
                { icon: "prime:github", href: "https://github.com/creation22" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all duration-200"
                >
                  <Icon icon={social.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {sections.map((section, idx) => (
            <div key={idx} className="lg:col-span-1 min-w-[120px]">
              <h4 className="font-semibold text-slate-900 text-sm mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-emerald-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter / Status Column (Optional filler) */}
          <div className="lg:col-span-1">
            {/* Can be used for extra links or left empty */}
          </div>
        </div>

        {/* Bottom Bar: Copyright + Status */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All systems operational</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-500">
            <p>© {currentYear} TalkSense.</p>

            <span className="hidden md:block w-1 h-1 rounded-full bg-slate-300"></span>

            <div className="flex items-center gap-1.5">
              <span>Built by</span>
              <a
                href="https://twitter.com/_Creation22"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-900 hover:text-emerald-600 transition-colors border-b border-transparent hover:border-emerald-200"
              >
                Srajan Gupta
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;