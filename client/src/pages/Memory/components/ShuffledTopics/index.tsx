import "./index.scss";
import BackIcon from "../../../../assets/svgs/back.svg";
import { useLocation } from "react-router";
import { stateType } from "../Content";
import { useEffect } from "react";

const ShuffledTopics = () => {
  const { state } = useLocation<stateType>();

  function shuffle(array: any) {
    for (let index = array.length - 1; index > 0; index--) {
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index + 1));

      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] = temporary;
    }
  }

  useEffect(() => {
    console.log(state.topics);
  }, [state]);

  console.log(shuffle(state.topics));

  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="shuffled-topics">
      <div className="shuffled-topics-header">
        <div className="shuffled-topics-header-back" onClick={handleBack}>
          <BackIcon />
        </div>
      </div>
      {state.topics.map((topic: any) => {
        return (
          <div key={topic.id}>
            <p>{topic.topic}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ShuffledTopics;
