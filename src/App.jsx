import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ContextMenu from './components/ContextMenu';

// Inside return, wrap the outer fragment with ThemeProvider and include ContextMenu

import { motion, AnimatePresence } from 'framer-motion';
import VSCodeLayout from './components/layout/VSCodeLayout';
import CodeArea from './components/layout/CodeArea';
import { CODE_CONTENT, CODE_LINE_COUNTS } from './data/fileContents';
import { PREVIEW_CONTENT } from './data/previewContents';

const App = () => {
  const [activeFile, setActiveFile] = useState('Home.jsx');
  const [openFiles, setOpenFiles] = useState(['Home.jsx', 'About.jsx', 'Projects.jsx']);
  const [isLoading, setIsLoading] = useState(true);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    // Simulate VSCode startup sequence
    const timer1 = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Slight delay after loading finishes before showing main to allow fade out
    const timer2 = setTimeout(() => {
      setShowMain(true);
    }, 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

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

    <ThemeProvider>
      <ContextMenu />
      {/* Loading Screen */}
      <AnimatePresence>
        {!showMain && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1e1e1e]"
          >
            <div className="flex flex-col items-center relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="material-symbols-outlined text-[80px] text-[#007acc] mb-8 drop-shadow-[0_0_15px_rgba(0,122,204,0.5)]">terminal</span>
              </motion.div>

              <div className="w-64 h-1 bg-[#252526] rounded overflow-hidden relative">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#007acc] to-transparent shadow-[0_0_10px_#007acc]"
                />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-6 text-[#d4d4d4] font-editor-code text-sm tracking-[0.2em]"
              >
                STARTING WORKSPACE...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout */}
      <div className={`transition-opacity duration-500 ${showMain ? 'opacity-100' : 'opacity-0'} h-screen w-full`}>
        {showMain && (
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
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
