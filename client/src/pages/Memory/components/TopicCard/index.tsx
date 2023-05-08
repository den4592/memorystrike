import "./index.scss";
import CloseIcon from "../../../../assets/svgs/close.svg";
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
  const handleDelete = async (topicId: string) => {
    await axios.delete(`http://localhost:8080/api/topics/${topicId}`, {});
    setUpdateTopics(!updateTopics);
  };

  return (
    <div key={id} className="topic-card">
      <div className="topic-card-close" onClick={() => handleDelete(id)}>
        <CloseIcon />
      </div>
      <label htmlFor="topic-card-topic" className="topic-card-label">
        주제 / 제목 / 질문
      </label>
      <p className="topic-card-topic">{topic}</p>
      <label htmlFor="topic-card-descritpion" className="topic-card-label">
        설명 / 정답
      </label>
      <p className="topic-card-description">{description}</p>
    </div>
  );
};

export default TopicCard;
