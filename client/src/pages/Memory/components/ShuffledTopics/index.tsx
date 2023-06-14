import "./index.scss";
import BackIcon from "../../../../assets/svgs/back.svg";
import { useLocation } from "react-router";
import { stateType } from "../Content";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import ShuffledTopicCard from "../ShuffledTopicCard";
import Timer from "../../../../shared/components/Timer";
import CorrecIcon from "@/assets/svgs/check.svg";
import ExclamationIcon from "@/assets/svgs/exclamation.svg";
import IncorrectIcon from "@/assets/svgs/xmark.svg";
import ShuffledResult from "../ShuffledResult";
import { createStatistic } from "../../../../api/statistic/createStatistic";
import { AuthContext } from "../../../../shared/context/auth.context";
import Modal from "../../../../shared/components/Modal";

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
  const auth = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem("userData")!);
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
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [changeView]);

  const shuffle = useMemo(() => {
    for (let index = state.topics?.length - 1; index > 0; index--) {
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index + 1));

      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = state.topics[index];
      state.topics[index] = state.topics[randomPosition];
      state.topics[randomPosition] = temporary;
    }

    state.topics?.map((value: any) => {
      setCardStatuses((prev) => {
        return [
          ...prev,
          { correct: false, uncertation: false, incorrect: false },
        ];
      });
    });
  }, [state.topics, changeView]);

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
  }, [cardStatuses]);

  function getCurrentDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let today = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return new Date(
      Date.UTC(year, month, today, hours, minutes, seconds)
    ).toISOString();
  }

  const handleSubmit = useCallback(async () => {
    try {
      const arr = [];

      //상태에 대한 부여가 이루어 지지 않았을 경우 return
      for (let i = 0; i < cardStatuses.length; i++) {
        if (
          cardStatuses[i].correct === false &&
          cardStatuses[i].uncertation === false &&
          cardStatuses[i].incorrect === false
        ) {
          setShowModal(!showModal);
          return;
        }
      }

      //토픽 카드와 해당 카드의 상태를 객체로 합친다
      for (let i = 0; i < state.topics?.length; i++) {
        let newArr = [...state.topics];
        newArr[i].statuses = cardStatuses[i];
        newArr[i].timestamp = getCurrentDate();
        arr.push(newArr[i]);
      }

      let time = shuffledDuration.split(":");
      let seconds = +time[0] * 60 * 60 + +time[1] * 60 + +time[2];

      let params = {
        creator: userData.userId,
        shuffled: arr,
        duration: seconds,
        date: getCurrentDate().split("T")[0],
      };

      const res = await createStatistic(params, auth.token);
      if (res?.status === 200) {
        setChangeView(!changeView);
      }
    } catch (err) {
      console.log(err);
    }
  }, [
    auth.token,
    cardStatuses,
    changeView,
    showModal,
    shuffledDuration,
    state.topics,
    userData.userId,
  ]);

  return (
    <div className="shuffled-topics">
      {changeView ? (
        <ShuffledResult
          shuffledDuration={shuffledDuration}
          cardStatusCount={cardStatusCount}
          setCardStatusCount={setCardStatusCount}
          changeView={changeView}
          setChangeView={setChangeView}
          setCardStatuses={setCardStatuses}
          setOpenedCardsCount={setOpenedCardsCount}
          setPlayTimer={setPlayTimer}
        />
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
            <ul className="shuffled-topics-header-statuses">
              <li className="shuffled-topics-header-statuses-correct">
                <CorrecIcon />: {cardStatusCount.correct}
              </li>
              <li className="shuffled-topics-header-statuses-uncertation">
                <ExclamationIcon />: {cardStatusCount.uncertation}
              </li>
              <li className="shuffled-topics-header-statuses-incorrect">
                <IncorrectIcon /> : {cardStatusCount.incorrect}
              </li>
            </ul>
          </div>
          <div className="shuffled-topics-container">
            {state.topics?.map((topic: any, idx: number) => {
              return (
                <ShuffledTopicCard
                  key={topic._id}
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
              disabled={openedCardsCount !== state.topics?.length}
              onClick={handleSubmit}
            >
              마무리하기
            </button>
          </div>
        </>
      )}
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          message="모든 항목에 대한 상태를 부여해 주세요."
        />
      )}
    </div>
  );
};

export default ShuffledTopics;
