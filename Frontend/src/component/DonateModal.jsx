import React, { useState } from "react";
import QRCode from "react-qr-code"; // Ensure you installed: npm install react-qr-code
import { Icon } from "@iconify/react";

const DonateModal = ({ onClose, upiId = "your-upi-id@okaxis", name = "TalkSense Support" }) => {
  const [copied, setCopied] = useState(false);

  // Format: upi://pay?pa=ADDRESS&pn=NAME&cu=INR
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <Icon icon="mdi:close" className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-500 mb-3">
            <Icon icon="mdi:heart" className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Support Development</h2>
          <p className="text-sm text-slate-500 mt-1">Scan to pay via any UPI App</p>
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-4 rounded-xl border-2 border-slate-100 flex justify-center mb-6 shadow-inner">
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={upiLink}
              viewBox={`0 0 256 256`}
              fgColor="#334155" // Slate-700
            />
          </div>
        </div>

        {/* Copy UPI Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">UPI ID</p>
              <p className="text-sm font-mono text-slate-700 truncate">{upiId}</p>
            </div>
            <button
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-all ${copied
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-white text-slate-500 hover:text-emerald-600 shadow-sm border border-slate-200"
                }`}
            >
              <Icon icon={copied ? "mdi:check" : "mdi:content-copy"} className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-xs text-slate-400">
            Thank you for keeping the project alive! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;