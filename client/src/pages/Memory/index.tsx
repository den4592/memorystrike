import "./index.scss";
import { useState, useEffect, useCallback, useRef, useContext } from "react";
import CreateContent from "./components/CreateContent";
import ContentCard from "../Memory/components/ContentCard";
import { getContents } from "../../api/content/getContents";
import { Content } from "../../types/contents";
import { getUser } from "../../api/user/getUser";
import { changeFirstLoginStatus } from "../../api/user/changeFirstLoginStatus";
import { AuthContext } from "../../shared/context/auth.context";

const Memory = () => {
  const userData = JSON.parse(localStorage.getItem("userData")!);
  const auth = useContext(AuthContext);
  const [toggle, setToggle] = useState<boolean>(false);
  const [updateContents, setUpdateContents] = useState<boolean>(false);
  const [contents, setContents] = useState([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<any>(null);

  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(
    `MemoryStrike에 오신것을 환영합니다.\n
    MemoryStrike는 학습자가 공부한 내용을 복습 및 셀프 테스팅을 할 수 있는 서비스를 제공합니다.\n 
    복습을 직접 종이에 쓰면서 하는것보다 비교적 쉽게 할 수 있다는 부분이 MemoryStrike의 큰 메리트입니다.\n
    본인이 복습을 하고자 하는 주제와 해당 주제에 대한 설명만 기재하면 MemoryStrike는 이를 기억하여 계속해서 제공해줄 것입니다.\n
    MemoryStrike는 메타인지 능력을 향상 시킬 수 있습니다.\n
    이때까지 복습을 진행하면서 본인이 이해를 했다고 생각한 부분이 기억이 나지 않았던 경험이 있으신가요? 그렇다면 MemoryStrike는 당신을 위한 솔루션입니다.\n
    MemoryStrike에서는 본인이 학습한 내용을 바탕으로 통계 데이터를 제공하여, 본인이 어떤 부분을 제대로 이해를 하고 넘어갔는지, 또는 잘 모르는지에 대해서 확인할 수 있습니다.\n
    그러면 바로 시작해볼까요?\n
    좌측의 물음표(?) 버튼을 눌러주세요\n
    서비스 이용 방법에 대해 알려드릴게요.\n
    그러면 행운을 빌게요!
    `
  );
  const [index, setIndex] = useState(0);

  const handleGetUser = useCallback(async () => {
    try {
      const res = await getUser(userData.userId);
      if (res.data.user.isFirstLogin === true) {
        setShowWelcomeMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    handleGetUser();
  }, [userData?.userId]);

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 1);
    }
    if (buttonRef.current && index >= fullText.length) {
      buttonRef.current.style.display = "block";
    }
  }, [index]);

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
  }, [updateContents, userData.userId]);

  const handleCloseWelcomeMessage = async () => {
    await changeFirstLoginStatus(userData?.userId, auth.token);
    setShowWelcomeMessage(false);
  };

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
          <div className="welcome-message-container">
            <p className="welcome-message-container-text">{text}</p>
            <button
              onClick={() => handleCloseWelcomeMessage()}
              ref={buttonRef}
              className="welcome-message-container-btn btn"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Memory;
