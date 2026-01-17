import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import DonateModal from "./DonateModal";

const Navbar = ({ onHomeClick, showHomeButton = false, isDark = false }) => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a scroll listener to make the border appear only when scrolling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Constants
  const theme = {
    nav: isDark 
      ? `bg-slate-900/80 border-slate-800 ${scrolled ? 'border-b shadow-lg shadow-black/5' : 'border-transparent'}` 
      : `bg-white/70 border-slate-200/60 ${scrolled ? 'border-b shadow-sm shadow-slate-200/50' : 'border-transparent'}`,
    text: isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900",
    buttonBase: "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border",
    github: isDark 
      ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700" 
      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-sm",
    donate: isDark
      ? "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20"
      : "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100 hover:border-rose-200",
  };

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-xl ${theme.nav}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* --- Brand Identity --- */}
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={onHomeClick || (() => window.location.href = '/')}
          >
            {/* Logo Mark: Squircle shape to match your Steps component */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/20">
              <Icon icon="mdi:chat-processing-outline" className="w-5 h-5 text-white" />
            </div>
            
            {/* Logo Text */}
            <span className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ChatSense
            </span>
          </div>

          {/* --- Actions --- */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Navigation / Home */}
            {showHomeButton && (
              <button
                onClick={onHomeClick}
                className={`hidden md:flex items-center gap-2 text-sm font-medium ${theme.text} transition-colors`}
              >
                <span>Home</span>
              </button>
            )}

            {/* Separator Line (Desktop only) */}
            <div className={`hidden md:block h-4 w-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />

            {/* GitHub Button - "Tool" Aesthetic */}
            <a 
              href="https://github.com/creation22/chatsense" 
              target="_blank"
              rel="noreferrer"
              className={theme.github + " " + theme.buttonBase}
            >
              <Icon icon="mdi:github" className="w-4 h-4" />
              <span className="hidden sm:inline">Star</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-md ml-1 ${isDark ? 'bg-slate-700' : 'bg-slate-100 text-slate-500'}`}>
                Free
              </span>
            </a>

            {/* Donate Button - "Accent" Aesthetic */}
            <button
              onClick={() => setShowDonateModal(true)}
              className={theme.donate + " " + theme.buttonBase}
            >
              <Icon icon="solar:heart-angle-bold" className="w-4 h-4" />
              <span className="hidden sm:inline">Support</span>
            </button>

            {/* Social / Twitter - Subtle Icon */}
            <a
              href="https://twitter.com/_Creation22"
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-lg transition-colors ${theme.text} ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              aria-label="Twitter"
            >
              <Icon icon="prime:twitter" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* --- Modal --- */}
      {showDonateModal && (
        <DonateModal 
          onClose={() => setShowDonateModal(false)}
          upiId="srajangupta220@okhdfcbank"
          name="ChatSense Support"
        />
      )}
    </>
  );
};

export default Navbar;