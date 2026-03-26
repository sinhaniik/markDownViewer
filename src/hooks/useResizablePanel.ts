import { useState } from 'react';

export function useResizablePanel(initialWidthPercentage: number = 50) {
  const [editorWidth, setEditorWidth] = useState(initialWidthPercentage);
  const [isDraggingDivider, setIsDraggingDivider] = useState(false);

  const startResizing = (mouseDownEvent: React.MouseEvent<HTMLDivElement>) => {
    mouseDownEvent.preventDefault();
    setIsDraggingDivider(true);

    const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
      const newWidthPercentage = (mouseMoveEvent.clientX / window.innerWidth) * 100;
      
      const minWidthPx = 300;
      const minWidthPct = (minWidthPx / window.innerWidth) * 100;
      const maxWidthPct = 80;

      const constrainedWidth = Math.max(minWidthPct, Math.min(newWidthPercentage, maxWidthPct));
      setEditorWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsDraggingDivider(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return { editorWidth, isDraggingDivider, startResizing };
}
