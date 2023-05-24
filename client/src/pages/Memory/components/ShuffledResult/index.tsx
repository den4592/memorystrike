import { useEffect } from "react";
import { CardStatusCount, CardStatuses } from "../ShuffledTopics";

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
      <p>소요 시간 : {shuffledDuration}</p>
      <span>correct : {cardStatusCount.correct}</span>
      <span>uncertation : {cardStatusCount.uncertation}</span>
      <span>incorrect : {cardStatusCount.incorrect}</span>
      <button className="btn" onClick={handleDoAgain}>
        다시하기
      </button>
      <button className="btn">통계</button>
    </div>
  );
};

export default ShuffledResult;
