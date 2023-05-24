import "./index.scss";
import { useEffect } from "react";
import { CardStatusCount, CardStatuses } from "../ShuffledTopics";
import CheckIcon from "@/assets/svgs/check.svg";
import ExclamationIcon from "@/assets/svgs/exclamation.svg";
import IncorrectIcon from "@/assets/svgs/xmark.svg";

interface ShuffledResultProps {
  shuffledDuration: string;
  cardStatusCount: CardStatusCount;
  changeView: boolean;
  setChangeView: React.Dispatch<React.SetStateAction<boolean>>;
  setCardStatusCount: React.Dispatch<
    React.SetStateAction<{
      correct: number;
      uncertation: number;
      incorrect: number;
    }>
  >;
  setCardStatuses: React.Dispatch<React.SetStateAction<CardStatuses[]>>;
  setOpenedCardsCount: React.Dispatch<React.SetStateAction<number>>;
}

const ShuffledResult = ({
  shuffledDuration,
  cardStatusCount,
  changeView,
  setChangeView,
  setCardStatusCount,
  setCardStatuses,

  setOpenedCardsCount,
}: ShuffledResultProps) => {
  const handleDoAgain = () => {
    setCardStatusCount({ correct: 0, uncertation: 0, incorrect: 0 });
    setCardStatuses([]);
    setOpenedCardsCount(0);
    setChangeView(!changeView);
  };

  return (
    <div className="shuffled-result">
      <div className="shuffled-result-container">
        <p className="shuffled-result-container-time">
          소요 시간 : {shuffledDuration}
        </p>
        <div className="shuffled-result-container-statuses">
          <div className="shuffled-result-container-statuses-correct">
            <CheckIcon />
            <span>: {cardStatusCount.correct}</span>
          </div>
          <div className="shuffled-result-container-statuses-uncertation">
            <ExclamationIcon />
            <span>: {cardStatusCount.uncertation}</span>
          </div>
          <div className="shuffled-result-container-statuses-incorrect">
            <IncorrectIcon />
            <span>: {cardStatusCount.incorrect}</span>
          </div>
        </div>
        <div className="shuffled-result-container-btn-container">
          <button className="btn" onClick={handleDoAgain}>
            다시하기
          </button>
          <button className="btn">통계</button>
        </div>
      </div>
    </div>
  );
};

export default ShuffledResult;