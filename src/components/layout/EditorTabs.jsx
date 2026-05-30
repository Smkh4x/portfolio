import React from 'react';
import { FILE_META } from '../../data/fileContents';

const EditorTabs = ({ activeFile, openFiles, onTabSelect, onTabClose }) => {
  return (
    <header className="flex flex-col w-full bg-surface border-b border-outline-variant shrink-0 z-10">
      {/* Title Bar (Mac/Windows style) */}
      <div className="flex h-[35px] items-center px-4 bg-surface-container-low justify-between text-[11px] text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">menu</span>
          <span className="font-tab-active text-tab-active opacity-80">portfolio.js — MyProject</span>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-white">remove</span>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-white">check_box_outline_blank</span>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-white">close</span>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex h-[35px] bg-surface-container-high overflow-x-auto no-scrollbar">
        {openFiles.map((fileName) => {
          const isActive = activeFile === fileName;
          const meta = FILE_META[fileName] || { icon: 'description', color: 'text-primary' };
          return (
            <div 
              key={fileName}
              onClick={() => onTabSelect && onTabSelect(fileName)}
              className={`flex items-center px-3 gap-2 font-tab-active text-tab-active cursor-pointer min-w-[120px] group border-r border-outline-variant ${
                isActive 
                  ? 'border-t-2 border-primary text-on-surface bg-surface' 
                  : 'text-on-surface-variant hover:text-on-surface bg-surface-container-high'
              }`}
            >
              <span className={`material-symbols-outlined text-sm ${isActive ? meta.color : 'text-on-surface-variant'}`}>
                {meta.icon}
              </span>
              <span>{fileName}</span>
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose && onTabClose(fileName);
                }}
                className={`material-symbols-outlined text-[12px] ml-auto hover:bg-surface-variant rounded ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              >
                close
              </span>
            </div>
          );
        })}
      </div>
    </header>
  );
};

export default EditorTabs;
