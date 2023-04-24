import "./index.scss";
import { useState } from "react";

const CreateContent = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          />
        </div>
        <div className="create-content-form__inner">
          <input
            type="text"
            className="create-content-form__inner-input"
            placeholder="설명"
          />
        </div>
        <div className="create-content-form-btn-container">
          <button className="btn-toggle-create btn-hover-effect2">확인</button>
        </div>
      </form>
    </div>
  );
};

export default CreateContent;
