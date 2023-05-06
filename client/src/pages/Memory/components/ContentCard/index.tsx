import { useState, useRef, memo } from "react";
import axios from "axios";
import "./index.scss";
import { Link } from "react-router-dom";
import EditContent from "../../../../assets/svgs/edit.svg";
import Calendar from "../../../../assets/svgs/calendar.svg";
import DeleteContent from "../../../../assets/svgs/remove.svg";
import ArrowToBracket from "../../../../assets/svgs/arrow-right-to-bracket-solid.svg";

interface ContentCardProps {
  id: string;
  content: string;
  description: string;
  time: string;
  updateContents: boolean;
  setUpdateContents: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentCard = ({
  id,
  content,
  description,
  time,
  updateContents,
  setUpdateContents,
}: ContentCardProps) => {
  let userId = window.localStorage.getItem("token");
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [contentText, setContentText] = useState<string>(content);
  const [descriptionText, setDescriptionText] = useState<string>(description);

  const date = new Date(time).toLocaleString("ko-KR");

  const handleDelete = async (contentId: string) => {
    await axios.delete(`http://localhost:8080/api/contents/${contentId}`, {
      data: {
        id,
        userId,
      },
    });
    setUpdateContents(!updateContents);
  };

  const handleEdit = () => {
    if (enableEdit === true) {
      axios
        .put(`http://localhost:8080/api/contents/${id}`, {
          content: contentText,
          description: descriptionText,
          creator: userId,
        })
        .then((res) => console.log(res));
    }
    setEnableEdit(!enableEdit);
    setUpdateContents(!updateContents);
  };

  return (
    <div className="content-card">
      <p className="content-card-label">토픽</p>
      <div className="content-card-text">
        <p>
          {enableEdit ? (
            <input
              type="text"
              value={contentText}
              className="content-card-text-input"
              onChange={(e) => setContentText(e.target.value)}
            />
          ) : (
            content
          )}
        </p>
      </div>
      <p className="content-card-description-label">설명</p>
      <div className="content-card-description-text  content-card-text">
        <p>
          {enableEdit ? (
            <input
              type="text"
              value={descriptionText}
              className="content-card-text-input"
              onChange={(e) => setDescriptionText(e.target.value)}
            />
          ) : description ? (
            description
          ) : (
            "-"
          )}
        </p>
      </div>
      <div className="content-card-date">
        <div className="content-card-date-calendar">
          <Calendar />
        </div>
        <p className="content-card-date-text">{date}</p>
      </div>
      <div className="content-card-options">
        {enableEdit ? (
          <button className="content-card-options-confirm" onClick={handleEdit}>
            확인
          </button>
        ) : (
          ""
        )}

        <div
          className="content-card-options-delete"
          onClick={() => handleDelete(id)}
        >
          <DeleteContent />
        </div>
        <div className="content-card-options-edit" onClick={handleEdit}>
          <EditContent />
        </div>
        <Link
          to={{
            pathname: `/memory/content/${id}`,
            state: { content: content, userId: userId, contentId: id },
          }}
        >
          <div className="content-card-options-arrow">
            <ArrowToBracket />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default memo(ContentCard);
