import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/memorystrike_logo.png";
import "./index.scss";
import { AuthContext } from "../../context/auth.context";
import HowToUseModal from "../HowToUseModal";
import { DarkModeSwitch } from "react-toggle-dark-mode";

interface SidebarProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidebarState {
  isActive: boolean;
}

const Sidebar = ({ isDarkMode, setIsDarkMode }: SidebarProps) => {
  const auth = useContext(AuthContext);
  const [isActive, setIsActive] = useState<SidebarState["isActive"]>(true);
  const toggleRef = useRef<HTMLDivElement>(null);
  const [showHowToUseModal, setShowHowToUseModal] = useState<boolean>(false);

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [setIsActive]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node) &&
        window.innerWidth < 768
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleRef]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div ref={toggleRef}>
      <div className={isActive ? "sidebar active" : "sidebar"}>
        <Link to="/memory" className="sidebar-link">
          <img src={Logo} alt="logo" className="sidebar-logo" />
        </Link>
        <Link to="/memory" className="sidebar-link ">
          메모리
        </Link>
        <Link to="/statistics" className="sidebar-link">
          통계
        </Link>
        <button
          className="sidebar-link sidebar-link-how-to-use"
          onClick={() => setShowHowToUseModal(!showHowToUseModal)}
        >
          ?
        </button>
        <DarkModeSwitch
          moonColor="white"
          sunColor="yellow"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={30}
        />
        <button className="sidebar-logout-btn" onClick={() => auth.logout()}>
          로그아웃
        </button>
      </div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {showHowToUseModal && (
        <HowToUseModal
          showModal={showHowToUseModal}
          setShowModal={setShowHowToUseModal}
        />
      )}
    </div>
  );
};

export default Sidebar;
