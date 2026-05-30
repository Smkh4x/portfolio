import React from 'react';

const StatusBar = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-between h-[22px] px-3 bg-primary-container text-on-primary-container font-status-label text-status-label cursor-default select-none">
      <div className="flex items-center gap-4 h-full">
        <div className="flex items-center gap-1.5 hover:bg-on-primary-fixed-variant px-2 h-full transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[14px]">sync</span>
          <span className="font-bold">main*</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-on-primary-fixed-variant px-2 h-full transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[14px]">error</span>
          <span>0</span>
          <span className="material-symbols-outlined text-[14px] ml-1">warning</span>
          <span>0</span>
        </div>
      </div>
      <div className="flex items-center gap-2 h-full">
        <div className="hover:bg-on-primary-fixed-variant px-2 h-full flex items-center transition-colors cursor-pointer">Spaces: 2</div>
        <div className="hover:bg-on-primary-fixed-variant px-2 h-full flex items-center transition-colors cursor-pointer">UTF-8</div>
        <div className="flex items-center gap-1 hover:bg-on-primary-fixed-variant px-2 h-full transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[14px]">code</span>
          <span>JavaScript React</span>
        </div>
        <div className="hover:bg-on-primary-fixed-variant px-2 h-full flex items-center transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[14px]">notifications</span>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
