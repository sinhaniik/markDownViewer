import { useState } from 'react';
import { Editor } from './components/Editor';
import { Viewer } from './components/Viewer';

function App() {
  const [markdown, setMarkdown] = useState<string>('# Markdown Viewer\n\nWelcome to the clean, minimal markdown viewer.\n\n## Features\n- **Live Preview:** See changes instantly on the right.\n- **Syntax Highlighting:** Full support for code blocks.\n- **GitHub Flavored Markdown:** Tables, strikethrough, and more.\n\n### Code Example\n```tsx\nfunction sayHello() {\n  console.log("Hello World!");\n}\n```\n\n### Tables\n| Feature | Status |\n|---------|--------|\n| Redux | Removed |\n| Router | Removed |\n| Markdown | Added |');

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-gray-900 text-gray-100 font-sans">
      <div className="w-1/2 h-full border-r border-gray-800">
        <Editor value={markdown} onChange={setMarkdown} />
      </div>
      <div className="w-1/2 h-full">
        <Viewer content={markdown} />
      </div>
    </div>
  );
}

export default App;