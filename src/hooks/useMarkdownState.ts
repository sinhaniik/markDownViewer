import { useState, useEffect } from 'react';

const DEFAULT_MARKDOWN = '# Markdown Viewer\n\nWelcome to the clean, minimal markdown viewer.\n\n## Features\n- **Live Preview:** See changes instantly on the right.\n- **Syntax Highlighting:** Full support for code blocks.\n- **GitHub Flavored Markdown:** Tables, strikethrough, and more.\n\n### Code Example\n```tsx\nfunction sayHello() {\n  console.log("Hello World!");\n}\n```\n\n### Tables\n| Feature | Status |\n|---------|--------|\n| Redux | Removed |\n| Router | Removed |\n| Markdown | Added |';

export function useMarkdownState() {
  const [markdown, setMarkdown] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const dataParam = params.get('data');
      if (dataParam) {
        return decodeURIComponent(dataParam);
      }
    } catch (err) {
      console.warn('Failed to decode markdown from URL', err);
    }
    const saved = localStorage.getItem('markdown');
    return saved !== null ? saved : DEFAULT_MARKDOWN;
  });

  useEffect(() => {
    localStorage.setItem('markdown', markdown);
  }, [markdown]);

  return { markdown, setMarkdown };
}
