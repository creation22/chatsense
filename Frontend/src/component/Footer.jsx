import React from "react";
import { Icon } from "@iconify/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-white/40 backdrop-blur-md pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 mb-4 group cursor-default">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
            <Icon icon="mdi:chat-processing-outline" className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            ChatSense
          </span>
        </div>

        {/* Tagline */}
        <p className="text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
          Decoding conversations with privacy-first analysis. 
          Discover the hidden patterns in your chats today.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-emerald-600 transition-colors">Home</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">How it works</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
          <a href="https://github.com/creation22/chatsense" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">GitHub</a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mb-8">
          {[
            { icon: "mdi:twitter", href: "https://twitter.com/_Creation22" },
            { icon: "mdi:github", href: "https://github.com/creation22" },
            { icon: "mdi:instagram", href: "#" },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
            >
              <Icon icon={social.icon} className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Copyright & Made With */}
        <div className="w-full border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} ChatSense. All rights reserved.</p>
          
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Icon icon="mdi:heart" className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>by Creation22</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;