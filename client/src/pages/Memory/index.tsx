import "./index.scss";
import { useState, useEffect, useCallback, useRef } from "react";
import CreateContent from "./components/CreateContent";
import ContentCard from "../Memory/components/ContentCard";
import { getContents } from "../../api/content/getContents";
import { Content } from "../../types/contents";
import { getStatistics } from "../../api/statistic/getStatistics";

const Memory = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [updateContents, setUpdateContents] = useState<boolean>(false);
  const [contents, setContents] = useState([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!toggleRef.current?.contains(event.target as Node)) {
        setShowWelcomeMessage(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleRef]);

  const createContentFromDefault = () => {
    window.scrollTo(0, 0);
    setToggle(true);
  };

  const userData = JSON.parse(localStorage.getItem("userData")!);

  const fetchStatistics = useCallback(async () => {
    const res = await getStatistics(userData?.userId);
    if (res.data.dates.length === 0 && contents.length === 0) {
      setShowWelcomeMessage(true);
    }
  }, [userData?.userId]);

  const fetchContents = async () => {
    try {
      setLoader(true);
      const res = await getContents(userData.userId);
      if (res?.status === 200) {
        setContents(res.data.contents);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContents();
    fetchStatistics();
  }, [updateContents, userData.userId]);

  return (
    <div className="memory">
      {loader ? (
        <span className="loader"></span>
      ) : (
        <>
          <div className="memory-utils">
            <p className="memory-utils-category-length">
              총 카테고리 : {contents.length}
            </p>
            <button onClick={() => setToggle(!toggle)} className="btn">
              카테고리 추가
            </button>
          </div>

          {toggle && (
            <CreateContent
              updateContents={updateContents}
              setUpdateContents={setUpdateContents}
            />
          )}

          <div className="memory-contents">
            {contents?.map((content: Content) => {
              return (
                <ContentCard
                  id={content.id}
                  key={content.id}
                  content={content.content}
                  description={content.description}
                  time={content.updatedAt}
                  updateContents={updateContents}
                  setUpdateContents={setUpdateContents}
                  setLoader={setLoader}
                />
              );
            })}
            <div
              className="memory-contents-default"
              onClick={createContentFromDefault}
            >
              <p className="memory-contents-default-title">카테고리 추가하기</p>
            </div>
          </div>
        </>
      )}
      {showWelcomeMessage && (
        <div ref={toggleRef} className="welcome-message">
          This is welcome message.
        </div>
      )}
    </div>
  );
};

export default Memory;
