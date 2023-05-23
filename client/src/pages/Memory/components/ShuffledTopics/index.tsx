import "./index.scss";
import { v4 as uuidv4 } from "uuid";
import BackIcon from "../../../../assets/svgs/back.svg";
import { useLocation } from "react-router";
import { stateType } from "../Content";
import { useCallback, useEffect, useMemo, useState } from "react";
import ShuffledTopicCard from "../ShuffledTopicCard";
import Timer from "../../../../shared/components/Timer";
import axios from "axios";

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
  let userId = window.localStorage.getItem("token");
  const [changeView, setChangeView] = useState<boolean>(false);
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
  const [shuffledDuration, setShuffledDuration] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString());

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
    handleCheckStatusCount();
  }, []);

  const handleSubmit = useCallback(async () => {
    const arr = [];

    //상태에 대한 부여가 이루어 지지 않았을 경우 return
    for (let i = 0; i < cardStatuses.length; i++) {
      if (
        cardStatuses[i].correct === false &&
        cardStatuses[i].uncertation === false &&
        cardStatuses[i].incorrect === false
      ) {
        alert("모든 항목에 대해 상태를 부여해주세요.");
        return;
      }
    }

    //토픽 카드와 해당 카드의 상태를 객체로 합친다
    for (let i = 0; i < state.topics.length; i++) {
      let newArr = [...state.topics];
      newArr[i].statuses = cardStatuses[i];
      arr.push(newArr[i]);
    }

    await axios.post("http://localhost:8080/api/statistics", {
      creator: userId,
      shuffled: arr,
      duration: shuffledDuration,
      date: new Date().toDateString(),
    });

    const data = await axios.get(
      `http://localhost:8080/api/statistics/${userId}`
    );

    console.log(data.data);

    setChangeView(!changeView);
  }, [cardStatuses, changeView, shuffledDuration, state.topics, userId]);

  return (
    <div className="shuffled-topics">
      {changeView ? (
        ""
      ) : (
        <>
          <div className="shuffled-topics-header">
            <div className="shuffled-topics-header-back" onClick={handleBack}>
              <BackIcon />
            </div>
            <Timer
              playTimer={playTimer}
              setPlayTimer={setPlayTimer}
              pauseTimer={pauseTimer}
              setPauseTimer={setPauseTimer}
              setShuffledDuration={setShuffledDuration}
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
              onClick={handleSubmit}
            >
              마무리하기
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShuffledTopics;
