import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ContextMenu = () => {
  const [menuData, setMenuData] = useState({ isOpen: false, x: 0, y: 0 });
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const menuRef = useRef(null);
  const { themes, activeTheme, setTheme } = useTheme();

  useEffect(() => {
    // Only enable on desktop-ish environments
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleContextMenu = (e) => {
      e.preventDefault();
      
      // Calculate position to ensure it doesn't run off screen
      let x = e.clientX;
      let y = e.clientY;
      
      // Estimated menu width and height
      const menuWidth = 240;
      const menuHeight = 150;
      
      if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 10;
      if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 10;

      setMenuData({ isOpen: true, x, y });
      setActiveSubMenu(null);
    };

    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuData(prev => ({ ...prev, isOpen: false }));
        setActiveSubMenu(null);
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);
    
    // Also close on scroll
    window.addEventListener('scroll', () => setMenuData(prev => ({ ...prev, isOpen: false })), { passive: true });

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', () => setMenuData(prev => ({ ...prev, isOpen: false })));
    };
  }, []);

  const handleThemeSelect = (themeId) => {
    setTheme(themeId);
    setMenuData(prev => ({ ...prev, isOpen: false }));
    setActiveSubMenu(null);
  };

  return (
    <AnimatePresence>
      {menuData.isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ top: menuData.y, left: menuData.x }}
          className="fixed z-[9999] w-60 bg-surface-container-highest border border-outline-variant shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-md py-1 flex flex-col font-editor-code text-sm backdrop-blur-md text-on-surface"
        >
          {/* Menu Item: Change Theme */}
          <div 
            className="relative px-3 py-1.5 hover:bg-primary hover:text-on-primary cursor-pointer flex justify-between items-center group transition-colors"
            onMouseEnter={() => setActiveSubMenu('themes')}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">palette</span>
              Change Theme
            </span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>

            {/* Submenu for Themes */}
            <AnimatePresence>
              {activeSubMenu === 'themes' && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-full top-0 ml-1 w-56 bg-surface-container-highest border border-outline-variant shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-md py-1 backdrop-blur-md text-on-surface"
                >
                  {themes.map(t => (
                    <div 
                      key={t.id}
                      onClick={(e) => { e.stopPropagation(); handleThemeSelect(t.id); }}
                      className="px-3 py-1.5 hover:bg-primary hover:text-on-primary cursor-pointer flex items-center justify-between transition-colors"
                    >
                      {t.label}
                      {activeTheme === t.id && (
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-px bg-outline-variant/50 my-1 mx-3" />
          
          <div 
            className="px-3 py-1.5 hover:bg-surface-variant cursor-not-allowed opacity-50 flex items-center gap-2 transition-colors"
            onMouseEnter={() => setActiveSubMenu(null)}
          >
            <span className="material-symbols-outlined text-[16px]">settings</span>
            Settings (Coming Soon)
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
