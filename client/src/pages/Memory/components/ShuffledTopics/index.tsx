import "./index.scss";
import BackIcon from "../../../../assets/svgs/back.svg";
import { useLocation } from "react-router";
import { stateType } from "../Content";
import { useCallback, useEffect, useMemo, useState } from "react";
import ShuffledTopicCard from "../ShuffledTopicCard";
import Timer from "../../../../shared/components/Timer";

export interface CardStatusCount {
  correct: number;
  uncertation: number;
  incorrect: number;
}

export interface CardStatuses {
  correct: boolean;
  uncertation: boolean;
  incorrect: boolean;
}

const ShuffledTopics = () => {
  const { state } = useLocation<stateType>();
  const [playTimer, setPlayTimer] = useState<boolean>(false);
  const [pauseTimer, setPauseTimer] = useState<boolean>(true);
  const [cardStatusCount, setCardStatusCount] = useState({
    correct: 0,
    uncertation: 0,
    incorrect: 0,
  });
  const [cardStatuses, setCardStatuses] = useState<CardStatuses[]>([]);
  const [openedCardsCount, setOpenedCardsCount] = useState<number>(0);

  const shuffle = useMemo(() => {
    for (let index = state.topics.length - 1; index > 0; index--) {
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index + 1));

      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = state.topics[index];
      state.topics[index] = state.topics[randomPosition];
      state.topics[randomPosition] = temporary;
    }

    state.topics.map((value: any) => {
      setCardStatuses((prev) => {
        return [
          ...prev,
          { correct: false, uncertation: false, incorrect: false },
        ];
      });
    });
  }, [state.topics]);

  const handleBack = () => {
    window.history.back();
  };

  const handleCheckStatusCount = useCallback(() => {
    let correctCount = 0;
    let uncertationCount = 0;
    let incorrectCount = 0;

    cardStatuses.forEach((status) => {
      if (status.correct) {
        correctCount += 1;
      }
      if (status.uncertation) {
        uncertationCount += 1;
      }
      if (status.incorrect) {
        incorrectCount += 1;
      }
    });

    setCardStatusCount((prev) => {
      return {
        ...prev,
        correct: correctCount,
        uncertation: uncertationCount,
        incorrect: incorrectCount,
      };
    });
  }, [cardStatuses]);

  useEffect(() => {
    console.log(openedCardsCount);
  }, [openedCardsCount]);

  useEffect(() => {
    handleCheckStatusCount();
  }, [cardStatuses]);

  return (
    <div className="shuffled-topics">
      <div className="shuffled-topics-header">
        <div className="shuffled-topics-header-back" onClick={handleBack}>
          <BackIcon />
        </div>
        <Timer
          playTimer={playTimer}
          setPlayTimer={setPlayTimer}
          pauseTimer={pauseTimer}
          setPauseTimer={setPauseTimer}
        />
        <div>
          <span style={{ color: "green" }}>
            correct : {cardStatusCount.correct}
          </span>{" "}
          <span style={{ color: "orange" }}>
            uncertation: {cardStatusCount.uncertation}
          </span>{" "}
          <span style={{ color: "red" }}>
            incorrect : {cardStatusCount.incorrect}
          </span>
        </div>
      </div>
      <div className="shuffled-topics-container">
        {state.topics.map((topic: any, idx: number) => {
          return (
            <ShuffledTopicCard
              key={topic.id}
              idx={idx}
              topic={topic.topic}
              description={topic.description}
              setPlayTimer={setPlayTimer}
              setPauseTimer={setPauseTimer}
              cardStatuses={cardStatuses}
              setCardStatuses={setCardStatuses}
              openedCardsCount={openedCardsCount}
              setOpenedCardsCount={setOpenedCardsCount}
            />
          );
        })}
      </div>

      <div className="shuffled-topics-btn">
        <button
          className="btn"
          disabled={openedCardsCount !== state.topics.length}
        >
          마무리하기
        </button>
      </div>
    </div>
  );
};

export default ShuffledTopics;
