import { useState, DragEvent } from 'react';
import { readMarkdownFile } from '../utils/fileReader';

export function useFileDrop(onFileLoad: (content: string) => void) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      try {
        const content = await readMarkdownFile(file);
        onFileLoad(content);
      } catch (err) {
        console.warn((err as Error).message);
      }
    }
  };

  return { isDragging, handleDragOver, handleDragEnter, handleDragLeave, handleDrop };
}
