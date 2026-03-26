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
  
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    localStorage.setItem('markdown', markdown);
  }, [markdown]);

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
    // Leaving the overlay itself hides it seamlessly without flickering
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
        // Will reject if file is not .md, aligning smoothly with "Handle Invalid file type"
        console.warn((err as Error).message);
      }
    }
  };

  return (
    <div 
      className="flex w-screen h-screen overflow-hidden bg-gray-900 text-gray-100 font-sans relative"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="w-1/2 h-full border-r border-gray-800">
        <Editor value={markdown} onChange={setMarkdown} />
      </div>
      <div className="w-1/2 h-full">
        <Viewer content={markdown} />
      </div>

      {isDragging && (
        <div 
          className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center border-[3px] border-dashed border-[#C9A0AB] m-4 rounded-xl transition-all"
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="text-center pointer-events-none">
            <h2 className="text-3xl font-bold text-gray-100 mb-3 tracking-wide">Drop your .md file here</h2>
            <p className="text-gray-400 font-medium">Release to instantly render the markdown content.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;