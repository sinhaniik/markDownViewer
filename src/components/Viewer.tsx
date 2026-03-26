import React, { useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface ViewerProps {
  content: string;
}

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

const CustomPre: Components['pre'] = ({ node, children, ...props }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = extractText(children);
    const cleanText = text.replace(/\n$/, '');

    navigator.clipboard.writeText(cleanText);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-8 rounded-xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-[#0d1117] shadow-lg transition-colors">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-2 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 rounded opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm shadow-sm"
        aria-label="Copy code block"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <div className="overflow-x-auto p-5 text-sm leading-relaxed text-gray-800 dark:text-gray-300 font-mono scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <pre {...props} className="bg-transparent m-0 p-0 text-inherit">
          {children}
        </pre>
      </div>
    </div>
  );
};

const CustomCode: Components['code'] = ({ node, className, children, ...props }: any) => {
  const isInline = !className || !className.includes('hljs');

  if (isInline) {
    return (
      <code className="px-1.5 py-0.5 mx-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[#9B6A78] dark:text-[#C9A0AB] text-[0.875em] font-mono whitespace-pre-wrap border border-gray-200 dark:border-gray-700 shadow-sm transition-colors" {...props}>
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
    <div className="w-full h-full p-8 md:p-12 overflow-y-auto bg-gray-50 dark:bg-[#111827] transition-colors relative">
      <div className="prose dark:prose-invert max-w-none custom-prose-pink mx-auto transition-colors">
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
