import "./index.scss";
import { useState, useEffect, useCallback } from "react";

export interface ShuffledTopicCardProps {
  topic: string;
  description: string;
  setPlayTimer: React.Dispatch<React.SetStateAction<boolean>>;
  setPauseTimer: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShuffledTopicCard = ({
  topic,
  description,
  setPlayTimer,
  setPauseTimer,
}: ShuffledTopicCardProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardCover, setCardCover] = useState<boolean>(true);

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
    setPauseTimer(true);
    setPlayTimer(false);
  };

  const handleFlipCard = () => {
    setCardCover(false);
    setPlayTimer(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`shuffled-topic-card ${
        cardCover ? "shuffled-topic-card-cover" : ""
      }`}
      onClick={cardCover ? handleFlipCard : () => {}}
    >
      <p className="shuffled-topic-card-label">주제 / 제목 / 질문</p>
      <p className="shuffled-topic-card-topic">{topic}</p>
      <p className="shuffled-topic-card-label">설명 / 정답</p>
      <textarea className="shuffled-topic-card-topic-input" />

      <p className="shuffled-topic-card-btn" onClick={handleShowAnswer}>
        정답 확인
      </p>
      {showAnswer && (
        <div className="shuffled-topic-card-answer">
          <p className="shuffled-topic-card-answer">{description}</p>
        </div>
      )}
    </div>
  );
};

export default ShuffledTopicCard;
