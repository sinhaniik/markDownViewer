import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === 'string') {
          onChange(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Editor</span>
        <label className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border border-gray-700">
          Upload .md
          <input
            type="file"
            accept=".md"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
      <textarea
        className="flex-1 w-full p-8 bg-gray-900 text-gray-200 placeholder-gray-500 focus:outline-none resize-none font-mono text-sm leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your markdown here..."
        spellCheck={false}
      />
    </div>
  );
};
