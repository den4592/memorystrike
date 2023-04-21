import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Router, Link } from "react-router-dom";
import "./index.scss";

interface SidebarProps {}

interface SidebarState {
  isActive: boolean;
}

const Sidebar = () => {
  const [isActive, setIsActive] = useState<SidebarState["isActive"]>(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

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
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={isActive ? "sidebar active" : "sidebar"}>
        {/*Should change to Link to*/}
        <Link to="/Memory">메모리</Link>
        <Link to="/Statistics">통계</Link>
        <Link to="/Ask">물어보기</Link>
      </div>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        ref={toggleRef}
      >
        <FaBars />
      </button>
    </>
  );
};

export default Sidebar;
