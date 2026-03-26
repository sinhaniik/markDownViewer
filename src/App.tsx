import { useState, useEffect, DragEvent } from 'react';
import { Editor } from './components/Editor';
import { Viewer } from './components/Viewer';
import { readMarkdownFile } from './utils/fileReader';
import { exportToHTML, exportToPDF } from './utils/exportUtils';

const DEFAULT_MARKDOWN = '# Markdown Viewer\n\nWelcome to the clean, minimal markdown viewer.\n\n## Features\n- **Live Preview:** See changes instantly on the right.\n- **Syntax Highlighting:** Full support for code blocks.\n- **GitHub Flavored Markdown:** Tables, strikethrough, and more.\n\n### Code Example\n```tsx\nfunction sayHello() {\n  console.log("Hello World!");\n}\n```\n\n### Tables\n| Feature | Status |\n|---------|--------|\n| Redux | Removed |\n| Router | Removed |\n| Markdown | Added |';

function App() {
  const [markdown, setMarkdown] = useState<string>(() => {
    // 1. Try to load from URL first
    try {
      const params = new URLSearchParams(window.location.search);
      const dataParam = params.get('data');
      if (dataParam) {
        return decodeURIComponent(dataParam);
      }
    } catch (err) {
      console.warn('Failed to decode markdown from URL', err);
    }
    
    // 2. Fallback to localStorage
    const saved = localStorage.getItem('markdown');
    return saved !== null ? saved : DEFAULT_MARKDOWN;
  });
  
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  const [isDragging, setIsDragging] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Resizing layout state
  const [editorWidth, setEditorWidth] = useState(50); // percentage
  const [isDraggingDivider, setIsDraggingDivider] = useState(false);

  useEffect(() => {
    localStorage.setItem('markdown', markdown);
  }, [markdown]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

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

  const startResizing = (mouseDownEvent: React.MouseEvent<HTMLDivElement>) => {
    mouseDownEvent.preventDefault();
    setIsDraggingDivider(true);

    const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
      const newWidthPercentage = (mouseMoveEvent.clientX / window.innerWidth) * 100;
      
      const minWidthPx = 300;
      const minWidthPct = (minWidthPx / window.innerWidth) * 100;
      const maxWidthPct = 80; // Limit editor to max 80%

      const constrainedWidth = Math.max(minWidthPct, Math.min(newWidthPercentage, maxWidthPct));
      setEditorWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsDraggingDivider(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      try {
        const content = await readMarkdownFile(file);
        setMarkdown(content);
      } catch (err) {
        console.warn((err as Error).message);
      }
    }
  };

  return (
    <div 
      className={`flex w-screen h-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans relative transition-colors ${isDraggingDivider ? 'select-none pointer-events-none' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div 
        className="h-full transition-colors pointer-events-auto"
        style={{ width: `${editorWidth}%` }}
      >
        <Editor value={markdown} onChange={setMarkdown} />
      </div>

      <div 
        className="w-1.5 h-full cursor-col-resize bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors z-20 flex-shrink-0 pointer-events-auto"
        onMouseDown={startResizing}
        title="Drag to resize"
      />

      <div className="flex-1 h-full min-w-[300px] relative pointer-events-auto">
        <Viewer content={markdown} />
      </div>

      {/* Floating Header Actions */}
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

      {isDragging && (
        <div 
          className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center border-[3px] border-dashed border-[#9B6A78] dark:border-[#C9A0AB] m-4 rounded-xl transition-all pointer-events-auto"
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="text-center pointer-events-none">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-wide">Drop your .md file here</h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Release to instantly render the markdown content.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;