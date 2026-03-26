import { Editor } from './components/Editor';
import { Viewer } from './components/Viewer';
import { HeaderActions } from './components/HeaderActions';
import { DropZoneOverlay } from './components/DropZoneOverlay';
import { useMarkdownState } from './hooks/useMarkdownState';
import { useTheme } from './hooks/useTheme';
import { useResizablePanel } from './hooks/useResizablePanel';
import { useFileDrop } from './hooks/useFileDrop';

function App() {
  const { markdown, setMarkdown } = useMarkdownState();
  const { theme, toggleTheme } = useTheme();
  const { editorWidth, isDraggingDivider, startResizing } = useResizablePanel();
  const { isDragging, handleDragOver, handleDragEnter, handleDragLeave, handleDrop } = useFileDrop(setMarkdown);

  return (
    <div
      className={`flex w-screen h-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans relative transition-colors ${isDraggingDivider ? 'select-none pointer-events-none' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className="h-full transition-colors pointer-events-auto"
        style={{ width: `${editorWidth}%` }}
      >
        <Editor value={markdown} onChange={setMarkdown} />
      </div>

      <div
        className="w-1.5 h-full cursor-col-resize bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors z-20 flex-shrink-0 pointer-events-auto"
        onMouseDown={startResizing}
        title="Drag to resize"
      />

      <div className="flex-1 h-full min-w-[300px] relative pointer-events-auto">
        <Viewer content={markdown} />
      </div>

      <HeaderActions theme={theme} toggleTheme={toggleTheme} markdown={markdown} />

      {isDragging && (
        <DropZoneOverlay
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      )}
    </div>
  );
}

export default App;