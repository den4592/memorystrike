import { useState } from "react";

export const useDarkMode = () => {
  const [dark, setDark] = useState(false);
  //Local Storage darkmode 값을 저장
  let darkMode = localStorage.getItem("darkMode");

  const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", null);
  };

  //초기 렌더링 시 darkmode의 값이 enabled이면 darkMode 활성화
  if (darkMode === "enabled") {
    enableDarkMode();
  }

  const changeMode = () => {
    setDark(!dark);
    if (dark === true) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  };

  return { changeMode };
};
