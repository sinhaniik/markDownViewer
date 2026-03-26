import React, { useState } from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Parses a generic GitHub URL and returns the owner and repo if possible.
 */
export const parseGitHubUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') return null;
    
    // Split by '/' and remove empty strings
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
  } catch {
    return null;
  }
  return null;
};

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [githubUrl, setGithubUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleFetchReadme = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl.trim()) return;

    setError(null);
    const parsed = parseGitHubUrl(githubUrl.trim());

    if (!parsed) {
      setError('Invalid GitHub URL');
      return;
    }

    setIsLoading(true);
    const { owner, repo } = parsed;

    try {
      // Step 1: Attempt the `main` branch
      let res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`);
      
      // Step 2: Fallback to the `master` branch if `main` throws a 404
      if (!res.ok && res.status === 404) {
        res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`);
      }

      if (!res.ok) {
        setError('README not found');
        return;
      }

      const content = await res.text();
      onChange(content);
      setGithubUrl('');
    } catch {
      setError('Network error getting README');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="p-4 border-b border-gray-800 flex flex-col gap-3">
        <div className="flex items-center justify-between">
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

        <form onSubmit={handleFetchReadme} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Enter GitHub repo (https://github.com/user/repo)"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="flex-1 bg-[#0d1117] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-200 focus:outline-none focus:border-[#C9A0AB] transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !githubUrl.trim()}
            className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-gray-700 whitespace-nowrap"
          >
            {isLoading ? 'Loading...' : 'Fetch README'}
          </button>
        </form>
        {error && <span className="text-red-400 text-xs font-medium">{error}</span>}
      </div>

      <textarea
        className="flex-1 w-full p-8 bg-gray-900 text-gray-200 placeholder-gray-500 focus:outline-none resize-none font-mono text-sm leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your markdown here, upload a .md file, or fetch a GitHub repository's README!"
        spellCheck={false}
      />
    </div>
  );
};
