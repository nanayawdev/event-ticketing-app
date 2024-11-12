import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-7 w-12 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 ease-in-out"
      aria-label="Toggle theme"
    >
      <span
        className={`
          ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
          pointer-events-none inline-block h-5 w-5 rounded-full
          bg-gray-50 dark:bg-gray-800 shadow-lg ring-0 transition-all
          duration-300 ease-in-out
        `}
      >
        <span
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            transition-opacity duration-300 ease-in-out
            ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}
          `}
        >
          <Sun className="h-3.5 w-3.5 text-gray-500 dark:text-gray-200" />
        </span>
        <span
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            transition-opacity duration-300 ease-in-out
            ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <Moon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-200" />
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle; 