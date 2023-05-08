import { useState, useEffect } from "react";
import "./index.scss";
import { useLocation } from "react-router-dom";
import TopicForm from "../TopicForm";
import BackIcon from "../../../../assets/svgs/back.svg";
import TopicCard from "../TopicCard";

interface stateType {
  [x: string]: any;
  from: { pathname: string };
}
const Content = () => {
  const [topics, setTopics] = useState<any>([]);
  const { state } = useLocation<stateType>();

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="content">
      <div className="content-back" onClick={handleBack}>
        <BackIcon />
      </div>

      <h1 className="content-title">{state.content}</h1>
      <TopicForm contentId={state.contentId} setTopics={setTopics} />
      {topics?.map((topic: any) => {
        return (
          <TopicCard
            key={topic._id}
            id={topic._id}
            topic={topic.topic}
            description={topic.description}
          />
        );
      })}
    </div>
  );
};

export default Content;
