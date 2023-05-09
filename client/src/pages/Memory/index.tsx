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

  const createFromDefaultContent = () => {
    window.scrollTo(0, 0);
    setToggle(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/contents/user/${userId}`)
      .then((res) => {
        console.log(res.data.contents);
        setContents(res.data.contents);
      });
  }, [updateContents, userId]);

  useEffect(() => {
    console.log(contents);
  }, [contents]);

  return (
    <div className="memory">
      <div className="memory-utils-container">
        <button onClick={() => setToggle(!toggle)} className="btn">
          카테고리 추가
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
              id={content._id}
              key={content._id}
              content={content.content}
              description={content.description}
              time={content.updatedAt}
              updateContents={updateContents}
              setUpdateContents={setUpdateContents}
            />
          );
        })}
        <div
          className="memory-contents-default"
          onClick={createFromDefaultContent}
        >
          <p className="memory-contents-default-title">카테고리 추가하기</p>
        </div>
      </div>
    </div>
  );
};

export default Memory;
