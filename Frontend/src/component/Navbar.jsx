import React from "react";
import { Icon } from "@iconify/react";

const Navbar = ({ onHomeClick, showHomeButton = false, isDark = false }) => {
  // Define theme colors based on props, but optimized for the Emerald theme
  const baseClass = isDark ? "bg-slate-900/80 border-slate-800" : "bg-white/60 border-white/40";
  const textClass = isDark ? "text-slate-200" : "text-slate-600";
  const hoverClass = isDark ? "hover:bg-slate-800 hover:text-white" : "hover:bg-emerald-50 hover:text-emerald-700";
  const logoClass = isDark ? "text-white" : "text-slate-800";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-md transition-all duration-300 ${baseClass}`}>
      
      {/* Container to center content on wide screens */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <Icon icon="mdi:chat-processing-outline" className="w-5 h-5" />
          </div>
          <span className={`text-xl font-bold tracking-tight ${logoClass}`}>
            ChatSense
          </span>
        </div>

        {/* Navigation Links */}
        <div className={`flex items-center gap-2 text-sm font-medium ${textClass}`}>
          
          {showHomeButton && onHomeClick ? (
            <button
              onClick={onHomeClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${hoverClass}`}
            >
              <Icon icon="mdi:home-variant-outline" className="w-4 h-4" />
              <span>Home</span>
            </button>
          ) : (
            <a 
              href="/" 
              className={`px-4 py-2 rounded-full transition-all duration-200 ${hoverClass}`}
            >
              Home
            </a>
          )}

          <a 
            href="/support" 
            className={`px-4 py-2 rounded-full transition-all duration-200 ${hoverClass}`}
          >
            Support
          </a>

          {/* Twitter / Social Icon */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className={`p-2 rounded-full transition-all duration-200 ${hoverClass}`}
          >
            <Icon icon="mdi:twitter" className="w-5 h-5" />
          </a>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;