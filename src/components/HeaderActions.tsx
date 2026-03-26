import React, { useState } from 'react';
import { exportToHTML, exportToPDF } from '../utils/exportUtils';

interface HeaderActionsProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  markdown: string;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({ theme, toggleTheme, markdown }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = () => {
    if (!markdown.trim()) return;

    try {
      const encoded = encodeURIComponent(markdown);
      const url = new URL(window.location.href);
      url.searchParams.set('data', encoded);
      
      const finalUrl = url.toString();
      
      if (finalUrl.length > 2000) {
        alert("Warning: Your markdown content is quite large. The generated URL exceeds 2000 characters and might not be supported by all browsers or messaging apps.");
      }

      window.history.replaceState(null, '', finalUrl);
      navigator.clipboard.writeText(finalUrl);
      
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to generate share link", err);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-[60] flex items-center gap-3 pointer-events-auto">
      <button 
        onClick={handleShare}
        className="px-3.5 py-2 text-sm font-semibold rounded-lg bg-[#C9A0AB]/10 text-[#C9A0AB] border border-[#C9A0AB]/30 hover:bg-[#C9A0AB]/20 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C9A0AB]/50 dark:bg-[#C9A0AB]/5 dark:hover:bg-[#C9A0AB]/10 backdrop-blur-sm relative"
      >
        {copySuccess ? 'Copied!' : 'Share Link'}
      </button>
      <button 
        onClick={exportToHTML}
        className="px-3.5 py-2 text-sm font-semibold rounded-lg bg-[#C9A0AB]/10 text-[#C9A0AB] border border-[#C9A0AB]/30 hover:bg-[#C9A0AB]/20 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C9A0AB]/50 dark:bg-[#C9A0AB]/5 dark:hover:bg-[#C9A0AB]/10 backdrop-blur-sm"
      >
        Download HTML
      </button>
      <button 
        onClick={exportToPDF}
        className="px-3.5 py-2 text-sm font-semibold rounded-lg bg-[#C9A0AB] text-white hover:bg-[#b08591] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C9A0AB]/50 border border-transparent backdrop-blur-sm"
      >
        Export PDF
      </button>
      <button 
        onClick={toggleTheme}
        className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center cursor-pointer ml-1"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
};
