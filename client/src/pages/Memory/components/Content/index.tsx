import { useState, useEffect } from "react";
import "./index.scss";
import { useLocation } from "react-router-dom";
import TopicForm from "../TopicForm";

interface stateType {
  [x: string]: any;
  from: { pathname: string };
}
const Content = () => {
  const [topics, setTopics] = useState<any>([]);
  const { state } = useLocation<stateType>();

  return (
    <div className="content">
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
