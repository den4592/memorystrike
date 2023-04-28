import { useState, memo, useEffect } from "react";
import axios from "axios";
import "./index.scss";
import Calendar from "../../../../assets/svgs/calendar.svg";

interface ContentCardProps {
  topic: "string";
  description: "string";
  time: "string;";
}

const ContentCard = ({ topic, description, time }: ContentCardProps) => {
  let userId = window.localStorage.getItem("token");

  const date = new Date(time).toLocaleString("ko-KR");

  return (
    <div className="content-card">
      <p className="content-card-topic-label content-card-text">토픽</p>
      <p className="content-card-topic-text ">{topic}</p>
      <p className="content-card-description-label content-card-text">설명</p>
      <p className="content-card-description-text ">{description}</p>
      <div className="content-card-date">
        <Calendar />
        <p>{date}</p>
      </div>
    </div>
  );
};

export default memo(ContentCard);
