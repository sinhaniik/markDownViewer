import React, { DragEvent } from 'react';

interface DropZoneOverlayProps {
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
}

export const DropZoneOverlay: React.FC<DropZoneOverlayProps> = ({ onDragLeave, onDrop, onDragOver }) => {
  return (
    <div 
      className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center border-[3px] border-dashed border-[#9B6A78] dark:border-[#C9A0AB] m-4 rounded-xl transition-all pointer-events-auto"
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div className="text-center pointer-events-none">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-wide">Drop your .md file here</h2>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Release to instantly render the markdown content.</p>
      </div>
    </div>
  );
};
