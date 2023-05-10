import "./index.scss";
import { useState } from "react";
import axios from "axios";

interface CreateContentProps {
  updateContents: boolean;
  setUpdateContents: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateContent = ({
  updateContents,
  setUpdateContents,
}: CreateContentProps) => {
  const [contentText, setContentText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/contents", {
        content: contentText,
        description: descriptionText,
        creator: window.localStorage.getItem("token"),
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setContentText("");
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
        "카테고리를 생성해주세요. 해당 카테고리는 추후 공부/복습하고자 하는
        토픽의 목차로 사용이 됩니다."
      </p>
      <form onSubmit={handleSubmit} className="create-content-form">
        <div className="create-content-form__inner">
          <input
            type="text"
            className="create-content-form__inner-input"
            placeholder="카테고리"
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
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
          <button className="btn" disabled={contentText ? false : true}>
            확인
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContent;
