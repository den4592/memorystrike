import "./index.scss";
import BackIcon from "../../../../assets/svgs/back.svg";
import { useLocation } from "react-router";
import { stateType } from "../Content";
import { useMemo, useState } from "react";
import ShuffledTopicCard from "../ShuffledTopicCard";
import Timer from "../../../../shared/components/Timer";

const ShuffledTopics = () => {
  const { state } = useLocation<stateType>();
  const [playTimer, setPlayTimer] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(true);

  const shuffle = useMemo(() => {
    for (let index = state.topics.length - 1; index > 0; index--) {
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index + 1));

      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = state.topics[index];
      state.topics[index] = state.topics[randomPosition];
      state.topics[randomPosition] = temporary;
    }
  }, [state.topics]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="shuffled-topics">
      <Timer
        playTimer={playTimer}
        setPlayTimer={setPlayTimer}
        pauseTimer={pauseTimer}
        setPauseTimer={setPauseTimer}
      />
      <div className="shuffled-topics-header">
        <div className="shuffled-topics-header-back" onClick={handleBack}>
          <BackIcon />
        </div>
      </div>
      <div className="shuffled-topics-container">
        {state.topics.map((topic: any) => {
          return (
            <ShuffledTopicCard
              key={topic.id}
              topic={topic.topic}
              description={topic.description}
              setPlayTimer={setPlayTimer}
              setPauseTimer={setPauseTimer}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShuffledTopics;
