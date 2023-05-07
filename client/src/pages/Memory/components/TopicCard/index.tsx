import "./index.scss";

interface TopicCardProps {
  id: string;
  topic: string;
  description: string;
}

const TopicCard = ({ id, topic, description }: TopicCardProps) => {
  return (
    <div key={id} className="topic-card">
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
