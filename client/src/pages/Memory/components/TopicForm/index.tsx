import { useState } from "react";
import "./index.scss";

const TopicForm = () => {
  const [topic, setTopic] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (topic === "" || description === "") {
      alert("필수 항목들을 입력해 주세요.");
      return;
    }

    //TODO : createTopic API
  };

  return (
    <div className="topic-form">
      <form onSubmit={handleSubmit} className="topic-form-container">
        <label htmlFor="topic" className="topic-form-container-label">
          주제 / 제목 / 질문
        </label>
        <textarea
          id="topic"
          className="topic-form-container-input"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <label htmlFor="description" className="topic-form-container-label">
          설명 / 정답
        </label>
        <textarea
          id="description"
          className="topic-form-container-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="topic-form-container-btn">
          <button className="btn-toggle-create btn-hover-effect3">
            추가하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default TopicForm;
