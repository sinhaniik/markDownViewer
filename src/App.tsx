import { useState, useEffect, DragEvent } from 'react';
import { Editor } from './components/Editor';
import { Viewer } from './components/Viewer';
import { readMarkdownFile } from './utils/fileReader';

const DEFAULT_MARKDOWN = '# Markdown Viewer\n\nWelcome to the clean, minimal markdown viewer.\n\n## Features\n- **Live Preview:** See changes instantly on the right.\n- **Syntax Highlighting:** Full support for code blocks.\n- **GitHub Flavored Markdown:** Tables, strikethrough, and more.\n\n### Code Example\n```tsx\nfunction sayHello() {\n  console.log("Hello World!");\n}\n```\n\n### Tables\n| Feature | Status |\n|---------|--------|\n| Redux | Removed |\n| Router | Removed |\n| Markdown | Added |';

function App() {
  const [markdown, setMarkdown] = useState<string>(() => {
    const saved = localStorage.getItem('markdown');
    return saved !== null ? saved : DEFAULT_MARKDOWN;
  });
  
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'dark';
  });

  const [isDragging, setIsDragging] = useState(false);

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
      className="flex w-screen h-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans relative transition-colors"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="w-1/2 h-full border-r border-gray-200 dark:border-gray-800 transition-colors">
        <Editor value={markdown} onChange={setMarkdown} />
      </div>
      <div className="w-1/2 h-full relative">
        <Viewer content={markdown} />
      </div>

      {/* Floating Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-[60] p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center cursor-pointer"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      {isDragging && (
        <div 
          className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center border-[3px] border-dashed border-[#9B6A78] dark:border-[#C9A0AB] m-4 rounded-xl transition-all"
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