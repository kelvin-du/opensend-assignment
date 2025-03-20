import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useState } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((value) => {
      document.documentElement.classList.toggle("dark", !value);
      localStorage.theme = !value ? "dark" : "light";
      return !value;
    });
  }, []);

  const DarkModeIcon = isDarkMode ? SunIcon : MoonIcon;

  return { isDarkMode, toggleDarkMode, DarkModeIcon };
};
