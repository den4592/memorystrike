import "./index.scss";
import { useState, useEffect } from "react";
import CreateContent from "./components/CreateContent";
import axios from "axios";
import ContentCard from "../Memory/components/ContentCard";

const Memory = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [updateContents, setUpdateContents] = useState<boolean>(false);
  const [contents, setContents] = useState([]);

  let userId = window.localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/contents/user/${userId}`)
      .then((res) => {
        setContents(res.data[0].contents);
      });
  }, [updateContents, userId]);

  useEffect(() => {
    console.log(contents);
  }, [contents]);

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

      <div className="memory-contents">
        {contents?.map((content: any) => {
          return (
            <ContentCard
              id={content.id}
              key={content.id}
              topic={content.topic}
              description={content.description}
              time={content.createdAt}
              updateContents={updateContents}
              setUpdateContents={setUpdateContents}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Memory;
