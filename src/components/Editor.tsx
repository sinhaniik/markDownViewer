import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <textarea
      className="w-full h-full p-8 bg-gray-900 text-gray-200 placeholder-gray-500 focus:outline-none resize-none font-mono text-sm leading-relaxed"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your markdown here..."
      spellCheck={false}
    />
  );
};
