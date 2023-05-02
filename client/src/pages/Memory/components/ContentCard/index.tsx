import { memo } from "react";
import axios from "axios";
import "./index.scss";
import { Link } from "react-router-dom";
import Calendar from "../../../../assets/svgs/calendar.svg";
import DeleteContent from "../../../../assets/svgs/remove.svg";
import ArrowToBracket from "../../../../assets/svgs/arrow-right-to-bracket-solid.svg";

interface ContentCardProps {
  id: string;
  topic: string;
  description: string;
  time: string;
  updateContents: boolean;
  setUpdateContents: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentCard = ({
  id,
  topic,
  description,
  time,
  updateContents,
  setUpdateContents,
}: ContentCardProps) => {
  let userId = window.localStorage.getItem("token");

  const date = new Date(time).toLocaleString("ko-KR");

  const handleDelete = async (contentId: string) => {
    await axios.delete(`http://localhost:8080/api/contents/${contentId}`, {
      data: {
        contentId,
        userId,
      },
    });
    setUpdateContents(!updateContents);
  };

  return (
    <div className="content-card">
      <p className="content-card-topic-label content-card-text">토픽</p>
      <p className="content-card-topic-text ">{topic}</p>
      <p className="content-card-description-label content-card-text">설명</p>
      <p className="content-card-description-text ">
        {description ? description : "-"}
      </p>
      <div className="content-card-date">
        <div className="content-card-date-calendar">
          <Calendar />
        </div>
        <p className="content-card-date-text">{date}</p>
      </div>
      <div className="content-card-options">
        <div
          className="content-card-options-delete"
          onClick={() => handleDelete(id)}
        >
          <DeleteContent />
        </div>
        <Link to={{ pathname: `/memory/content/${id}`, state: { topic } }}>
          <div className="content-card-options-arrow">
            <ArrowToBracket />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default memo(ContentCard);
