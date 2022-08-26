import { About } from "./About";
import logo from "./img/logo.png";
import { useDarkMode } from "./useDarkMode";

export const Header = () => {
  const { changeMode } = useDarkMode();

  return (
    <header>
      <div className="container">
        <div className="header-container">
          <img src={logo} alt="" className="logo" />
          <div className="header-content-container">
            <i
              className="fa-solid fa-circle-half-stroke dark-mode-toggle"
              onClick={changeMode}
            >
              <span className="mode-text"> Change Mode</span>
            </i>
            <About />
          </div>
        </div>
      </div>
    </header>
  );
};
