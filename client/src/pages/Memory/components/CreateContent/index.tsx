import "./index.scss";
import { useState, useCallback, useEffect, memo, useContext } from "react";
import axios from "axios";
import ContentCard from "../ContentCard";

interface CreateContentProps {
  updateContents: boolean;
  setUpdateContents: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateContent = ({
  updateContents,
  setUpdateContents,
}: CreateContentProps) => {
  const [topicText, setTopicText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/contents", {
        topic: topicText,
        description: descriptionText,
        creator: window.localStorage.getItem("token"),
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setTopicText("");
          setDescriptionText("");
          setUpdateContents(!updateContents);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="create-content">
      <p className="create-content-description">
        "콘텐츠를 생성해주세요. 해당 콘텐츠는 이후 공부/복습 하고자 하는 토픽의
        제목으로 사용이 됩니다."
      </p>
      <form onSubmit={handleSubmit} className="create-content-form">
        <div className="create-content-form__inner">
          <input
            type="text"
            className="create-content-form__inner-input"
            placeholder="토픽"
            value={topicText}
            onChange={(e) => setTopicText(e.target.value)}
          />
        </div>
        <div className="create-content-form__inner">
          <input
            type="text"
            className="create-content-form__inner-input"
            placeholder="설명(선택)"
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
          />
        </div>
        <div className="create-content-form-btn-container">
          <button
            className="btn-toggle-create btn-hover-effect2"
            disabled={topicText ? false : true}
          >
            확인
          </button>
        </div>
      </form>
      <ContentCard />
    </div>
  );
};

export default memo(CreateContent);
