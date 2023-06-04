import { useState, memo, useContext, useCallback } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import EditContent from "../../../../assets/svgs/edit.svg";
import Calendar from "../../../../assets/svgs/calendar.svg";
import DeleteContent from "../../../../assets/svgs/remove.svg";
import ArrowLink from "../../../../assets/svgs/arrow-link.svg";
import { AuthContext } from "../../../../shared/context/auth.context";
import { editContent } from "../../../../api/content/editContent";
import { deleteContent } from "../../../../api/content/deleteContent";
import ConfirmModal from "../../../../shared/components/ConfirmModal";

interface ContentCardProps {
  id: string;
  content: string;
  description: string;
  time: string;
  updateContents: boolean;
  setUpdateContents: React.Dispatch<React.SetStateAction<boolean>>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentCard = ({
  id,
  content,
  description,
  time,
  updateContents,
  setUpdateContents,
  setLoader,
}: ContentCardProps) => {
  const userData = JSON.parse(localStorage.getItem("userData")!);
  const auth = useContext(AuthContext);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [contentText, setContentText] = useState<string>(content);
  const [descriptionText, setDescriptionText] = useState<string>(description);
  const [prevText, setPrevText] = useState<string>("");
  const [prevDesc, setPrevDesc] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const date = new Date(time).toLocaleString("ko-KR");

  const handleDelete = useCallback(
    async (contentId: string) => {
      try {
        setLoader(true);
        const res = await deleteContent(contentId, auth.token);
        if (res?.status === 200) {
          setUpdateContents(!updateContents);
        }
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    },
    [auth.token, setLoader, setUpdateContents, updateContents]
  );

  const handleEdit = useCallback(async () => {
    try {
      setPrevText(contentText);
      setPrevDesc(descriptionText);
      if (
        enableEdit === true &&
        (prevText !== contentText || prevDesc !== descriptionText)
      ) {
        let params = {
          content: contentText,
          description: descriptionText,
          creator: userData.userId,
        };

        const res = await editContent(params, id, auth.token);
        if (res?.status === 200) {
          setUpdateContents(!updateContents);
        }
      }
    } catch (err) {
      console.log(err);
    }

    setEnableEdit(!enableEdit);
  }, [
    auth.token,
    contentText,
    descriptionText,
    enableEdit,
    id,
    prevDesc,
    prevText,
    setUpdateContents,
    updateContents,
    userData.userId,
  ]);

  return (
    <div className="content-card">
      <p className="content-card-label">카테고리</p>
      <div className="content-card-text" onClick={() => setEnableEdit(true)}>
        <p className="content-card-text-inner">
          {enableEdit ? (
            <textarea
              value={contentText}
              className="content-card-text-input"
              onChange={(e) => setContentText(e.target.value)}
            />
          ) : (
            content
          )}
        </p>
      </div>
      <p className="content-card-label">설명</p>
      <div
        className="content-card-description-text  content-card-text"
        onClick={() => setEnableEdit(true)}
      >
        <p className="content-card-text-inner">
          {enableEdit ? (
            <textarea
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
          onClick={() => setShowConfirmModal(!showConfirmModal)}
        >
          <DeleteContent />
        </div>
        <div className="content-card-options-edit" onClick={handleEdit}>
          <EditContent />
        </div>
        <Link
          to={{
            pathname: `/memory/content/${id}`,
            state: { content: content, userId: userData.userId, contentId: id },
          }}
        >
          <div className="content-card-options-arrow">
            <ArrowLink />
          </div>
        </Link>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          showModal={showConfirmModal}
          setShowModal={setShowConfirmModal}
          handleDelete={handleDelete}
          id={id}
        />
      )}
    </div>
  );
};

export default memo(ContentCard);
