import React from 'react';
import ActivityBar from './ActivityBar';
import Sidebar from './Sidebar';
import EditorTabs from './EditorTabs';
import StatusBar from './StatusBar';

const VSCodeLayout = ({ children, activeFile, openFiles, onTabSelect, onTabClose }) => {
  return (
    <div className="flex flex-col h-screen text-on-surface select-none overflow-hidden bg-background">
      {/* Top AppBar / EditorTabs */}
      <EditorTabs 
        activeFile={activeFile} 
        openFiles={openFiles}
        onTabSelect={onTabSelect} 
        onTabClose={onTabClose}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar (Persistent) */}
        <ActivityBar />
        
        {/* Explorer Sidebar (Persistent) */}
        <Sidebar activeFile={activeFile} onFileSelect={onTabSelect} />
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-row overflow-hidden bg-surface">
          {children}
        </main>
      </div>
      
      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};

export default VSCodeLayout;
