import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/memorystrike_logo.png";
import "./index.scss";
import { AuthContext } from "../../context/auth.context";
import HowToUseModal from "../HowToUseModal";

interface SidebarState {
  isActive: boolean;
}

const Sidebar = () => {
  const auth = useContext(AuthContext);
  const [isActive, setIsActive] = useState<SidebarState["isActive"]>(true);
  const toggleRef = useRef<HTMLDivElement>(null);
  const [showHowToUseModal, setShowHowToUseModal] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const handleResize = useCallback(() => {
    setIsActive(false);
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
    <>
      <div className={isActive ? "sidebar active" : "sidebar"} ref={toggleRef}>
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
    </>
  );
};

export default Sidebar;
