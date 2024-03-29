import "./index.scss";
import { useState, useRef, useCallback } from "react";
import CheckIcon from "@/assets/svgs/check.svg";
import ExclamationIcon from "@/assets/svgs/exclamation.svg";
import IncorrectIcon from "@/assets/svgs/xmark.svg";
import { CardStatuses } from "../ShuffledTopics";

export interface ShuffledTopicCardProps {
  topic: string;
  description: string;
  setPlayTimer: React.Dispatch<React.SetStateAction<boolean>>;
  setPauseTimer: React.Dispatch<React.SetStateAction<boolean>>;
  cardStatuses: CardStatuses[];

  setCardStatuses: React.Dispatch<React.SetStateAction<CardStatuses[]>>;
  idx: number;
  openedCardsCount: number;
  setOpenedCardsCount: React.Dispatch<React.SetStateAction<number>>;
}

const ShuffledTopicCard = ({
  topic,
  description,
  setPlayTimer,
  setPauseTimer,
  cardStatuses,
  setCardStatuses,
  idx,
  openedCardsCount,
  setOpenedCardsCount,
}: ShuffledTopicCardProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardCover, setCardCover] = useState<boolean>(true);
  const [cardStatus, setCardStatus] = useState<string>("");
  const card = useRef<HTMLDivElement>(null);

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
    setPauseTimer(true);
    setPlayTimer(false);
  };

  const handleFlipCard = () => {
    setCardCover(false);
    setPlayTimer(true);
    setOpenedCardsCount(openedCardsCount + 1);
  };

  const handleChange = useCallback(
    (cardStatuses: CardStatuses[], status: string) => {
      let items = [...cardStatuses];
      console.log(cardStatuses);
      let item = items[idx];

      if (status === "correct") {
        item.correct = true;
        item.uncertation = false;
        item.incorrect = false;
      }
      if (status === "uncertation") {
        item.correct = false;
        item.uncertation = true;
        item.incorrect = false;
      }
      if (status === "incorrect") {
        item.correct = false;
        item.uncertation = false;
        item.incorrect = true;
      }

      items[idx] = item;

      setCardStatuses(items);
    },
    [idx, setCardStatuses]
  );

  const handleCardStatus = (status: string) => {
    switch (status) {
      case "correct":
        setCardStatus("correct");
        card.current?.classList.add("correct");
        handleChange(cardStatuses, "correct");
        break;
      case "uncertation":
        setCardStatus("uncertation");
        card.current?.classList.add("unceration");
        handleChange(cardStatuses, "uncertation");
        break;
      case "incorrect":
        setCardStatus("incorrect");
        card.current?.classList.add("incorrect");
        handleChange(cardStatuses, "incorrect");
        break;
    }
  };

  return (
    <div
      ref={card}
      className={`shuffled-topic-card ${
        cardCover && "shuffled-topic-card-cover"
      } ${cardStatus}`}
      onClick={cardCover ? handleFlipCard : () => {}}
    >
      {" "}
      {!cardCover && (
        <div className="shuffled-topic-card-check">
          <div
            className="shuffled-topic-card-check-correct"
            onClick={() => handleCardStatus("correct")}
          >
            <CheckIcon />
          </div>
          <div
            className="shuffled-topic-card-check-uncertation"
            onClick={() => handleCardStatus("uncertation")}
          >
            <ExclamationIcon />
          </div>
          <div
            className="shuffled-topic-card-check-incorrect"
            onClick={() => handleCardStatus("incorrect")}
          >
            <IncorrectIcon />
          </div>
        </div>
      )}
      <div className={`${!cardCover && "shuffled-topic-card-inner"}`}>
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
    </div>
  );
};

export default ShuffledTopicCard;
