/**
 * Reads a File object and returns its text content as a Promise.
 * Validates that the file has a .md extension.
 */
export const readMarkdownFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.name.endsWith('.md')) {
      return reject(new Error('Only .md files are allowed'));
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        resolve(content);
      } else {
        reject(new Error('Failed to read file as text'));
      }
    };
    
    reader.onerror = () => reject(new Error('File reading error encountered'));
    
    reader.readAsText(file);
  });
};
