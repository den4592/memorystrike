import { useContext, useState } from "react";
import "./index.scss";
import axios from "axios";
import { createTopic } from "../../../../api/topic/createTopic";
import { AuthContext } from "../../../../shared/context/auth.context";

interface TopicFormProps {
  contentId: string;
  updateTopics: boolean;
  setUpdateTopics: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopicForm = ({
  contentId,
  updateTopics,
  setUpdateTopics,
}: TopicFormProps) => {
  const auth = useContext(AuthContext);
  const [topicText, setTopicText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");
  const storedData = JSON.parse(localStorage.getItem("userData")!);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (topicText === "" || descriptionText === "") {
        alert("필수 항목들을 입력해 주세요.");
        return;
      }

      let params = {
        topic: topicText,
        description: descriptionText,
        contentId: contentId,
      };

      const res = await createTopic(params, storedData?.token);
      if (res?.status === 200) {
        setTopicText("");
        setDescriptionText("");
        setUpdateTopics(!updateTopics);
      }
    } catch (err) {
      console.log(err);
    }
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
          <button className="btn">추가하기</button>
        </div>
      </form>
    </div>
  );
};

export default TopicForm;
