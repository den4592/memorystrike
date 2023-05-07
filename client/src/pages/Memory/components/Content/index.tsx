import { useState, useEffect } from "react";
import "./index.scss";
import { useLocation } from "react-router-dom";
import TopicForm from "../TopicForm";
import BackIcon from "../../../../assets/svgs/back.svg";

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
      <TopicForm
        userId={state.userId}
        contentId={state.contentId}
        setTopics={setTopics}
      />
      {topics?.map((topic: any) => {
        return (
          <div key={topic._id}>
            <p>{topic._id}</p>
            <p>{topic.topic}</p>
            <p>{topic.description}</p>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Content;
