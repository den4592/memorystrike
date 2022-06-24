import { About } from "./About";
export const Header = () => {
  /*Dark Mode */
  let darkMode = localStorage.getItem("darkMode");

  const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", null);
  };

  if (darkMode === "enabled") {
    enableDarkMode();
  }

  const handleMode = () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  };
  return (
    <header>
      <div className="container">
        <div className="header-container">
          <i className="fa-solid fa-circle-half-stroke dark-mode-toggle" onClick={handleMode}>
            <span className="mode-text"> Change Mode</span>
          </i>
          <About />
        </div>
      </div>
    </header>
  );
};
