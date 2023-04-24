import "./index.scss";
import { useState } from "react";
import CreateContent from "./components/CreateContent";

const Memory = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="memory">
      <div className="memory-utils-container">
        <button
          onClick={() => setToggle(!toggle)}
          className="btn-toggle-create btn-hover-effect1"
        >
          콘텐츠 추가
        </button>
      </div>

      {toggle ? <CreateContent /> : ""}
    </div>
  );
};

export default Memory;
