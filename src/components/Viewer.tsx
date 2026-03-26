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
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return extractText(props.children);
  }
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
    <div className="relative group my-8 rounded-xl overflow-hidden ring-1 ring-gray-800 bg-[#0d1117] shadow-lg">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-2 py-1.5 text-xs font-semibold text-gray-300 bg-gray-800/90 border border-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-gray-700 hover:text-white backdrop-blur-sm shadow-sm"
        aria-label="Copy code block"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <div className="overflow-x-auto p-5 text-sm leading-relaxed text-gray-300 font-mono scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <pre {...props} className="bg-transparent m-0 p-0">
          {children}
        </pre>
      </div>
    </div>
  );
};

/**
 * Custom renderer for markdown `<code>` tags.
 * Distinguishes between inline code and block code.
 */
const CustomCode: Components['code'] = ({ node, className, children, ...props }: any) => {
  // Block code usually receives hljs class from rehype-highlight
  const isInline = !className || !className.includes('hljs');

  if (isInline) {
    return (
      <code className="px-1.5 py-0.5 mx-0.5 rounded-md bg-gray-800/80 text-[#C9A0AB] text-[0.875em] font-mono whitespace-pre-wrap border border-gray-700 shadow-sm" {...props}>
        {children}
      </code>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export const Viewer: React.FC<ViewerProps> = ({ content }) => {
  return (
    <div className="w-full h-full p-8 md:p-12 overflow-y-auto bg-[#111827]">
      <div className="prose prose-invert max-w-none custom-prose-pink mx-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{ pre: CustomPre, code: CustomCode }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
