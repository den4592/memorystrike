import "./index.scss";
import { useEffect, useRef, memo } from "react";
import "./index.scss";
import { ConfirmModalPortal } from "../ConfirmModalPortal";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (contentId: string) => Promise<void>;
  id: string;
}

const ConfirmModal = ({
  showModal,
  setShowModal,
  handleDelete,
  id,
}: ModalProps) => {
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toggleRef.current?.contains(event.target as Node)) {
        setShowModal(!showModal);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleRef]);

  return (
    <>
      <ConfirmModalPortal>
        {showModal && (
          <div className="confirm-modal">
            <div className="confirm-modal-mask " ref={toggleRef}></div>
            <div className="confirm-modal-body">
              <p className="confirm-modal-body-message">
                정말로 삭제하시겠습니까?
              </p>
              <div className="confirm-modal-body-confirm-btns">
                <button
                  className="confirm-modal-body-confirm-btns-cancel confirm-modal-body-confirm-btns-btn"
                  onClick={() => setShowModal(!showModal)}
                >
                  취소
                </button>
                <button
                  className="confirm-modal-body-confirm-btns-delete confirm-modal-body-confirm-btns-btn"
                  onClick={() => handleDelete(id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        )}
      </ConfirmModalPortal>
    </>
  );
};

export default memo(ConfirmModal);
