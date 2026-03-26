import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface ViewerProps {
  content: string;
}

export const Viewer: React.FC<ViewerProps> = ({ content }) => {
  return (
    <div className="w-full h-full p-8 overflow-y-auto bg-[#111827]">
      <div className="prose prose-invert max-w-none custom-prose-pink">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
