import React, { useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface ViewerProps {
  content: string;
}

/**
 * Recursively extracts plain text from React nodes.
 * Used to get the raw textual code block content,
 * bypassing syntax highlighting `span` wrappers.
 */
const extractText = (node: React.ReactNode): string => {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return node.toString();
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node)) return extractText(node.props.children);
  return '';
};

/**
 * Custom renderer for markdown `<pre>` tags.
 * We intercept the `<pre>` tag code blocks to inject a copy button overlay.
 */
const CustomPre: Components['pre'] = ({ node, children, ...props }) => {
  // Local state for copy feedback
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Extract raw string content from the highlighted React children elements
    const text = extractText(children);
    // Remove up to one trailing newline if gracefully present, improving formatting
    const cleanText = text.replace(/\n$/, '');

    navigator.clipboard.writeText(cleanText);
    setCopied(true);

    // Feedback text reset
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-2 py-1 text-xs font-medium text-gray-300 bg-gray-800/90 border border-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-gray-700 hover:text-white"
        aria-label="Copy code block"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre {...props}>
        {children}
      </pre>
    </div>
  );
};

export const Viewer: React.FC<ViewerProps> = ({ content }) => {
  return (
    <div className="w-full h-full p-8 overflow-y-auto bg-[#111827]">
      <div className="prose prose-invert max-w-none custom-prose-pink">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{ pre: CustomPre }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
