import * as React from "react";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme("light");
  const [isDarkMode, setDarkMode] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  const toggleDarkMode = (checked) => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  if (!mounted) {
    return null;
  }
  return (
    <DarkModeToggle
      onChange={toggleDarkMode}
      checked={theme === "dark"}
      size={80}
    />
  );
};

export default ThemeToggle;
