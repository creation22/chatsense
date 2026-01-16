import React, { useState } from "react";
import { Icon } from "@iconify/react";
import DonateModal from "./DonateModal"; // Ensure DonateModal.jsx is in the same folder

const Navbar = ({ onHomeClick, showHomeButton = false, isDark = false }) => {
  const [showDonateModal, setShowDonateModal] = useState(false);

  // Define theme colors
  const baseClass = isDark ? "bg-slate-900/80 border-slate-800" : "bg-white/60 border-white/40";
  const textClass = isDark ? "text-slate-200" : "text-slate-600";
  const hoverClass = isDark ? "hover:bg-slate-800 hover:text-white" : "hover:bg-emerald-50 hover:text-emerald-700";
  const logoClass = isDark ? "text-white" : "text-slate-800";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-md transition-all duration-300 ${baseClass}`}>
        
        {/* Container to center content */}
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
            
            {/* Home Button */}
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

            {/* GitHub Star Button */}
            <a 
              href="https://github.com/creation22/chatsense" // Double check your repo URL
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-200 ${hoverClass}`}
            >
              <Icon icon="mdi:github" className="w-4 h-4" />
              <span>Star</span>
            </a>

            {/* Donate Button (Triggers Modal) */}
            <button
              onClick={() => setShowDonateModal(true)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-200 
                ${isDark ? 'hover:bg-rose-900/30 hover:text-rose-400' : 'hover:bg-rose-50 hover:text-rose-600'}`}
            >
              <Icon icon="mdi:heart" className="w-4 h-4" />
              <span>Donate</span>
            </button>

            {/* Twitter / Social Icon */}
            <a
              href="https://twitter.com/_Creation22"
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

      {/* Donate Modal Rendered Outside Nav Flow */}
      {showDonateModal && (
        <DonateModal 
          onClose={() => setShowDonateModal(false)}
          upiId="srajangupta220@okhdfcbank" // ⚠️ REPLACE THIS WITH YOUR REAL UPI ID
          name="ChatSense Support"
        />
      )}
    </>
  );
};

export default Navbar;