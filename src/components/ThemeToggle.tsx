import { useEffect, useState } from 'react';
import { MdDarkMode , MdLightMode } from "react-icons/md";
function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-pointer"
    >
      {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
}

export default ThemeToggle;
