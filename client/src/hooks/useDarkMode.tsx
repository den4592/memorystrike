import { useState, useEffect } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
  };

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      setIsDarkMode(true);
    }
  }, []);

  return { isDarkMode, toggleDarkMode };
};
