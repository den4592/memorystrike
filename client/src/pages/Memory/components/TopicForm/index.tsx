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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (topicText === "" || descriptionText === "") {
      alert("필수 항목들을 입력해 주세요.");
      return;
    }

    let params = {
      topic: topicText,
      description: descriptionText,
      contentId: contentId,
    };

    const createTopicResponse = await createTopic(params, auth.token);
    if (createTopicResponse?.status === 200) {
      setTopicText("");
      setDescriptionText("");
      setUpdateTopics(!updateTopics);
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
