import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FILE_META } from '../../data/fileContents';

const SIDEBAR_FILES = Object.keys(FILE_META);

const Sidebar = ({ activeFile, onFileSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="w-[260px] shrink-0 h-full bg-surface-container-low border-r border-outline-variant flex flex-col hidden md:flex z-40 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      <div className="px-4 h-9 flex justify-between items-center shrink-0">
        <h2 className="font-sidebar-title text-sidebar-title uppercase text-on-surface-variant tracking-wider">Explorer</h2>
        <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors">more_horiz</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div
          className="flex items-center px-4 py-1 gap-1 text-on-surface-variant cursor-pointer hover:bg-surface-variant/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined text-[16px] transition-transform duration-300" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
            expand_more
          </span>
          <span className="font-sidebar-title text-sidebar-title uppercase text-on-surface font-bold tracking-wide">PORTFOLIO</span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col overflow-hidden"
            >
              <motion.div whileHover={{ x: 4 }} className="flex items-center px-8 py-1 gap-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-sm text-[#e37933]">folder</span>
                <span className="font-file-name text-file-name">assets</span>
              </motion.div>
              <motion.div whileHover={{ x: 4 }} className="flex items-center px-8 py-1 gap-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-sm text-[#007acc]">folder</span>
                <span className="font-file-name text-file-name">components</span>
              </motion.div>

              {SIDEBAR_FILES.map((fileName) => {
                const meta = FILE_META[fileName];
                const isActive = activeFile === fileName;

                return (
                  <motion.div
                    key={fileName}
                    onClick={() => onFileSelect && onFileSelect(fileName)}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    className={`flex items-center px-8 py-1 gap-2 cursor-pointer transition-all duration-300 relative ${isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFileBorder"
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary shadow-[0_0_8px_var(--tw-shadow-color)] shadow-primary"
                      />
                    )}
                    <span className={`material-symbols-outlined text-sm ${meta.color} ${isActive ? 'drop-shadow-[0_0_5px_currentColor]' : ''}`}>
                      {meta.icon}
                    </span>
                    <span className={`font-file-name text-file-name ${isActive ? 'font-bold' : ''}`}>{fileName}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};

export default Sidebar;
