import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    if (theme === "dark") {
      setTheme("light");
    } else setTheme("dark");
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
}
