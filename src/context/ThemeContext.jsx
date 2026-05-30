import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const THEMES = [
  { id: 'default', label: 'Dark Default (VSCode)' },
  { id: 'light', label: 'Light Theme' },
  { id: 'midnight-blue', label: 'Midnight Blue' },
  { id: 'neon-cyberpunk', label: 'Neon Cyberpunk' },
  { id: 'green-terminal', label: 'Green Terminal' },
  { id: 'purple-gradient', label: 'Purple Gradient' },
  { id: 'glassmorphism-soft', label: 'Glassmorphism Soft' },
];

export const ThemeProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState(() => {
    // Check localStorage on initial load
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme && THEMES.some(t => t.id === savedTheme)) {
        return savedTheme;
      }
    }
    return 'default';
  });

  useEffect(() => {
    // Apply the theme to the body via data attribute
    document.body.setAttribute('data-theme', activeTheme);
    // Persist in localStorage
    localStorage.setItem('portfolio-theme', activeTheme);
  }, [activeTheme]);

  const setTheme = (themeId) => {
    if (THEMES.some(t => t.id === themeId)) {
      setActiveTheme(themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
