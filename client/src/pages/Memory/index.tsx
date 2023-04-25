import "./index.scss";
import { useState, useEffect } from "react";
import CreateContent from "./components/CreateContent";
import axios from "axios";

const Memory = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [updateContents, setUpdateContents] = useState<boolean>(false);
  let userId = window.localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/contents/user/${userId}`)
      .then((res) => console.log(res.data));
  }, [updateContents]);

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

      {toggle ? (
        <CreateContent
          updateContents={updateContents}
          setUpdateContents={setUpdateContents}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Memory;
