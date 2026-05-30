import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeArea = ({ codeContent, previewContent, activeFile, lineCount = 30 }) => {
  // Simple line number generator based on code content roughly
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Breadcrumbs */}
      <div className="h-[22px] flex items-center px-4 bg-surface text-[11px] text-on-surface-variant gap-1 shrink-0 border-b border-outline-variant/30">
        <span>src</span>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span>components</span>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="text-on-surface">{activeFile}</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative bg-surface-container-lowest">
        {/* Live Preview Pane (Full Width) */}
        <section className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-16 relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFile}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              {previewContent}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default CodeArea;
