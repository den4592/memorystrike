import { useState, memo } from "react";
import "./index.scss";
import RemoveIcon from "../../../../assets/svgs/remove.svg";
import EditIcon from "../../../../assets/svgs/edit.svg";
import axios from "axios";
interface TopicCardProps {
  id: string;
  topic: string;
  description: string;
  updateTopics: boolean;
  setUpdateTopics: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopicCard = ({
  id,
  topic,
  description,
  updateTopics,
  setUpdateTopics,
}: TopicCardProps) => {
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [topicText, setTopicText] = useState<string>(topic);
  const [descriptionText, setDescriptionText] = useState<string>(description);
  const [prevText, setPrevText] = useState<string>("");
  const [prevDesc, setPrevDesc] = useState<string>("");

  const handleDelete = async (topicId: string) => {
    await axios.delete(`http://localhost:8080/api/topics/${topicId}`, {});
    setUpdateTopics(!updateTopics);
  };

  const handleEdit = () => {
    console.log(prevText, prevDesc);
    console.log(topicText, descriptionText);
    setPrevText(topicText);
    setPrevDesc(descriptionText);

    if (
      enableEdit === true &&
      (prevText !== topicText || prevDesc !== descriptionText)
    ) {
      axios
        .post(`http://localhost:8080/api/topics/${id}`, {
          topic: topicText,
          description: descriptionText,
        })
        .then(() => setUpdateTopics(!updateTopics));
    }
    setEnableEdit(!enableEdit);
  };

  return (
    <div key={id} className="topic-card">
      <div className="topic-card-container">
        <label
          htmlFor="topic-card-container-topic"
          className="topic-card-container-label"
        >
          주제 / 제목 / 질문
        </label>

        <div
          className="topic-card-container-topic"
          onClick={() => setEnableEdit(true)}
        >
          <p>
            {enableEdit ? (
              <textarea
                value={topicText}
                className="topic-card-container-input"
                onChange={(e) => setTopicText(e.target.value)}
              />
            ) : (
              topic
            )}
          </p>
        </div>
        <label
          htmlFor="topic-card-container-descritpion"
          className="topic-card-container-label"
        >
          설명 / 정답
        </label>

        <div
          className="topic-card-container-description"
          onClick={() => setEnableEdit(true)}
        >
          <p>
            {enableEdit ? (
              <textarea
                value={descriptionText}
                className="topic-card-container-input"
                onChange={(e) => setDescriptionText(e.target.value)}
              />
            ) : description ? (
              description
            ) : (
              "-"
            )}
          </p>
        </div>
        {enableEdit ? (
          <button className="topic-card-container-confirm" onClick={handleEdit}>
            확인
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="topic-card-sidebar">
        <div className="topic-card-sidebar-edit" onClick={handleEdit}>
          <EditIcon />
        </div>
        <div
          className="topic-card-sidebar-close"
          onClick={() => handleDelete(id)}
        >
          <RemoveIcon />
        </div>
      </div>
    </div>
  );
};

export default memo(TopicCard);
