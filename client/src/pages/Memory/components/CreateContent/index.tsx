import "./index.scss";
import { useState, useContext } from "react";
import { AuthContext } from "../../../../shared/context/auth.context";
import { createContent } from "../../../../api/content/createContent";

interface CreateContentProps {
  updateContents: boolean;
  setUpdateContents: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateContent = ({
  updateContents,
  setUpdateContents,
}: CreateContentProps) => {
  const auth = useContext(AuthContext);
  const [contentText, setContentText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const userData = JSON.parse(localStorage.getItem("userData")!);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let params = {
      content: contentText,
      description: descriptionText,
      creator: userData.userId,
    };
    const res = await createContent(params, auth.token);
    if (res?.status === 200) {
      setContentText("");
      setDescriptionText("");
      setUpdateContents(!updateContents);
    } else {
      setError(res);
    }
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
