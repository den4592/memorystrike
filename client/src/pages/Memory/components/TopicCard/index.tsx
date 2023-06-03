import { useState, memo, useContext, useCallback } from "react";
import "./index.scss";
import RemoveIcon from "../../../../assets/svgs/remove.svg";
import EditIcon from "../../../../assets/svgs/edit.svg";
import { editTopic } from "../../../../api/topic/editTopic";
import { AuthContext } from "../../../../shared/context/auth.context";
import { deleteTopic } from "../../../../api/topic/deleteTopic";
import ConfirmModal from "../../../../shared/components/ConfirmModal";
interface TopicCardProps {
  id: string;
  topic: string;
  description: string;
  updateTopics: boolean;
  setUpdateTopics: React.Dispatch<React.SetStateAction<boolean>>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopicCard = ({
  id,
  topic,
  description,
  updateTopics,
  setUpdateTopics,
  setLoader,
}: TopicCardProps) => {
  const auth = useContext(AuthContext);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [topicText, setTopicText] = useState<string>(topic);
  const [descriptionText, setDescriptionText] = useState<string>(description);
  const [prevText, setPrevText] = useState<string>("");
  const [prevDesc, setPrevDesc] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const handleDelete = useCallback(
    async (topicId: string) => {
      try {
        setLoader(true);
        const deleteTopicResponse = await deleteTopic(topicId, auth.token);
        if (deleteTopicResponse?.status === 200) {
          setUpdateTopics(!updateTopics);
        }
        setLoader(false);
      } catch (error) {}
    },
    [auth.token, setLoader, setUpdateTopics, updateTopics]
  );

  const handleEdit = async () => {
    setPrevText(topicText);
    setPrevDesc(descriptionText);
    if (
      enableEdit === true &&
      (prevText !== topicText || prevDesc !== descriptionText)
    ) {
      let params = {
        topic: topicText,
        description: descriptionText,
      };
      const editTopicResponse = await editTopic(params, id, auth.token);
      if (editTopicResponse?.status === 200) {
        setUpdateTopics(!updateTopics);
      }
    }
    setEnableEdit(!enableEdit);
  };

  return (
    <div key={id} className="topic-card">
      <div className="topic-card-container">
        <label
          htmlFor="topic-card-container-topic"
          className="topic-card-container-label"
        >
          주제 / 제목 / 질문
        </label>

        <div
          className="topic-card-container-topic"
          onClick={() => setEnableEdit(true)}
        >
          <p>
            {enableEdit ? (
              <textarea
                value={topicText}
                className="topic-card-container-input"
                onChange={(e) => setTopicText(e.target.value)}
              />
            ) : (
              topic
            )}
          </p>
        </div>
        <label
          htmlFor="topic-card-container-descritpion"
          className="topic-card-container-label"
        >
          설명 / 정답
        </label>

        <div
          className="topic-card-container-description"
          onClick={() => setEnableEdit(true)}
        >
          <p>
            {enableEdit ? (
              <textarea
                value={descriptionText}
                className="topic-card-container-input"
                onChange={(e) => setDescriptionText(e.target.value)}
              />
            ) : description ? (
              description
            ) : (
              "-"
            )}
          </p>
        </div>
        {enableEdit ? (
          <button className="topic-card-container-confirm" onClick={handleEdit}>
            확인
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="topic-card-sidebar">
        <div className="topic-card-sidebar-edit" onClick={handleEdit}>
          <EditIcon />
        </div>
        <div
          className="topic-card-sidebar-close"
          onClick={() => setShowConfirmModal(!showConfirmModal)}
        >
          <RemoveIcon />
        </div>
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

export default memo(TopicCard);
