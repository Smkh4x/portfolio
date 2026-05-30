import React, { useState } from 'react';
import VSCodeLayout from './components/layout/VSCodeLayout';
import CodeArea from './components/layout/CodeArea';
import { CODE_CONTENT, CODE_LINE_COUNTS } from './data/fileContents';
import { PREVIEW_CONTENT } from './data/previewContents';

const App = () => {
  const [activeFile, setActiveFile] = useState('Home.jsx');
  const [openFiles, setOpenFiles] = useState(['Home.jsx', 'About.jsx', 'Projects.jsx']);

  const handleFileSelect = (fileName) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles([...openFiles, fileName]);
    }
    setActiveFile(fileName);
  };

  const handleTabClose = (fileName) => {
    let newOpenFiles = openFiles.filter(f => f !== fileName);
    
    if (newOpenFiles.length === 0) {
      // Fallback to Home.jsx if last tab is closed
      newOpenFiles = ['Home.jsx'];
    }

    setOpenFiles(newOpenFiles);
    
    // If we closed the active file, switch to the last available file
    if (activeFile === fileName) {
      setActiveFile(newOpenFiles[newOpenFiles.length - 1]);
    }
  };

  return (
    <VSCodeLayout 
      activeFile={activeFile} 
      openFiles={openFiles}
      onTabSelect={handleFileSelect}
      onTabClose={handleTabClose}
    >
      {activeFile ? (
        <CodeArea 
          activeFile={activeFile} 
          codeContent={CODE_CONTENT[activeFile]} 
          previewContent={PREVIEW_CONTENT[activeFile]} 
          lineCount={CODE_LINE_COUNTS[activeFile] || 30}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-surface">
          <div className="text-center opacity-30 select-none">
            <div className="material-symbols-outlined text-[64px] mb-4">terminal</div>
            <h1 className="text-2xl font-bold font-headline-lg tracking-widest">VS CODE PORTFOLIO</h1>
          </div>
        </div>
      )}
    </VSCodeLayout>
  );
};

export default App;
