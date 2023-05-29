import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/memorystrike_logo.png";
import "./index.scss";
import { AuthContext } from "../../context/auth.context";

interface SidebarState {
  isActive: boolean;
}

const Sidebar = () => {
  const auth = useContext(AuthContext);
  const [isActive, setIsActive] = useState<SidebarState["isActive"]>(true);
  const toggleRef = useRef<HTMLDivElement>(null);

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
        <Link to="/memory">
          <img src={Logo} alt="logo" className="sidebar-logo" />
        </Link>
        <Link to="/memory">메모리</Link>
        <Link to="/statistics">통계</Link>
        <Link to="/ask">물어보기</Link>
        <button className="sidebar-logout-btn" onClick={() => auth.logout()}>
          로그아웃
        </button>
      </div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>
    </>
  );
};

export default Sidebar;
