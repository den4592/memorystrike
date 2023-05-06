import { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";

interface TopicFormProps {
  userId: string;
  contentId: string;
  setTopics: React.Dispatch<any>;
}

const TopicForm = ({ userId, contentId, setTopics }: TopicFormProps) => {
  const [topicText, setTopicText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [updateTopics, setUpdateTopics] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (topicText === "" || descriptionText === "") {
      alert("필수 항목들을 입력해 주세요.");
      return;
    }
    axios
      .post(`http://localhost:8080/api/topics`, {
        topic: topicText,
        description: descriptionText,
        id: contentId,
        creator: userId,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setTopicText("");
          setDescriptionText("");
          setUpdateTopics(!updateTopics);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/topics/${userId}/${contentId}`)
      .then((res) => {
        setTopics(res.data[0].contents[0].topics);
      });
  }, [contentId, userId, updateTopics, setTopics]);

  return (
    <div className="topic-form">
      <form onSubmit={handleSubmit} className="topic-form-container">
        <label htmlFor="topic" className="topic-form-container-label">
          주제 / 제목 / 질문
        </label>
        <textarea
          id="topic"
          className="topic-form-container-input"
          value={topicText}
          onChange={(e) => setTopicText(e.target.value)}
        />
        <label htmlFor="description" className="topic-form-container-label">
          설명 / 정답
        </label>
        <textarea
          id="description"
          className="topic-form-container-input"
          value={descriptionText}
          onChange={(e) => setDescriptionText(e.target.value)}
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
