import React, { useState } from 'react';
import { FILE_META } from '../../data/fileContents';

const SIDEBAR_FILES = Object.keys(FILE_META);

const Sidebar = ({ activeFile, onFileSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="w-[260px] shrink-0 h-full bg-surface-container-low border-r border-outline-variant flex flex-col hidden md:flex z-40">
      <div className="px-4 h-9 flex justify-between items-center shrink-0">
        <h2 className="font-sidebar-title text-sidebar-title uppercase text-on-surface-variant tracking-wider">Explorer</h2>
        <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-pointer hover:text-on-surface">more_horiz</span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div 
          className="flex items-center px-4 py-1 gap-1 text-on-surface-variant cursor-pointer hover:bg-surface-variant/50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined text-[16px] transition-transform" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'}}>
            expand_more
          </span>
          <span className="font-sidebar-title text-sidebar-title uppercase text-on-surface">PORTFOLIO</span>
        </div>
        
        {isOpen && (
          <div className="flex flex-col">
            <div className="flex items-center px-8 py-1 gap-2 text-on-surface-variant hover:bg-surface-variant cursor-pointer">
              <span className="material-symbols-outlined text-sm text-[#e37933]">folder</span>
              <span className="font-file-name text-file-name">assets</span>
            </div>
            <div className="flex items-center px-8 py-1 gap-2 text-on-surface-variant hover:bg-surface-variant cursor-pointer">
              <span className="material-symbols-outlined text-sm text-[#007acc]">folder</span>
              <span className="font-file-name text-file-name">components</span>
            </div>
            
            {SIDEBAR_FILES.map((fileName) => {
              const meta = FILE_META[fileName];
              return (
                <div 
                  key={fileName}
                  onClick={() => onFileSelect && onFileSelect(fileName)}
                  className={`flex items-center px-8 py-1 gap-2 cursor-pointer ${
                    activeFile === fileName 
                      ? 'bg-secondary-container text-primary border-l-2 border-primary' 
                      : 'text-on-surface-variant hover:bg-surface-variant border-l-2 border-transparent'
                  }`}
                >
                  <span className={`material-symbols-outlined text-sm ${meta.color}`}>
                    {meta.icon}
                  </span>
                  <span className="font-file-name text-file-name">{fileName}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
