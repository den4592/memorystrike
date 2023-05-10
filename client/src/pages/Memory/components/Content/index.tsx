import { useState, useEffect } from "react";
import "./index.scss";
import { useLocation } from "react-router-dom";
import TopicForm from "../TopicForm";
import BackIcon from "../../../../assets/svgs/back.svg";
import TopicCard from "../TopicCard";
import axios from "axios";

interface stateType {
  [x: string]: any;
  from: { pathname: string };
}
const Content = () => {
  const [topics, setTopics] = useState<any>([]);
  const [updateTopics, setUpdateTopics] = useState<boolean>(false);
  const { state } = useLocation<stateType>();

  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/topics/${state.contentId}`)
      .then((res) => {
        setTopics(res.data.topics);
      });
  }, [state.contentId, updateTopics]);

  return (
    <div className="content">
      <div className="content-header">
        <div className="content-header-back" onClick={handleBack}>
          <BackIcon />
        </div>
      </div>
      <p className="content-title">카테고리 : {state.content}</p>

      <TopicForm
        contentId={state.contentId}
        updateTopics={updateTopics}
        setUpdateTopics={setUpdateTopics}
      />
      {topics?.map((topic: any) => {
        return (
          <TopicCard
            key={topic.id}
            id={topic.id}
            topic={topic.topic}
            description={topic.description}
            updateTopics={updateTopics}
            setUpdateTopics={setUpdateTopics}
          />
        );
      })}
    </div>
  );
};

export default Content;
