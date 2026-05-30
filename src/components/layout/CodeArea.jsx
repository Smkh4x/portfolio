import React from 'react';

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

      {/* Content Area: Split-Pane */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Code Editor (Left Pane) */}
        <section className="w-1/2 flex bg-surface border-r border-outline-variant overflow-y-auto custom-scrollbar font-editor-code text-editor-code relative">
          {/* Line Numbers */}
          <div className="line-numbers bg-surface py-4 select-none opacity-50 border-r border-outline-variant/30 shrink-0">
            {lineNumbers.map(num => (
              <div key={num} className="leading-[20px]">{num}</div>
            ))}
          </div>
          
          {/* Syntax Highlighted Code */}
          <div className="flex-1 p-4 whitespace-pre text-on-surface-variant leading-[20px]">
            {codeContent}
          </div>
        </section>

        {/* Live Preview Pane (Right Pane) */}
        <section className="w-1/2 bg-surface-container-lowest overflow-y-auto custom-scrollbar p-8 lg:p-16 relative">
          <div className="flex items-center gap-2 mb-8 opacity-40">
            <span className="material-symbols-outlined text-[16px]">language</span>
            <span className="text-[12px] uppercase tracking-widest font-bold">Live Preview</span>
            <div className="h-px flex-1 bg-outline-variant ml-2"></div>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-12">
            {previewContent}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CodeArea;
