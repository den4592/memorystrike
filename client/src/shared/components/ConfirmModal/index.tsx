import "./index.scss";
import { useEffect, useRef, memo } from "react";
import "./index.scss";
import CloseIcon from "../../../assets/svgs/close.svg";
import { ConfirmModalPortal } from "../ConfirmModalPortal";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (contentId: string) => Promise<void>;
  contentId: string;
}

const ConfirmModal = ({
  showModal,
  setShowModal,
  handleDelete,
  contentId,
}: ModalProps) => {
  const toggleRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (toggleRef.current?.contains(event.target as Node)) {
  //       console.log("1");
  //       setShowModal(!showModal);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [toggleRef]);

  return (
    <>
      <ConfirmModalPortal>
        {showModal && (
          <div className="modal">
            <div className="modal-mask"></div>
            <div className="modal-body" ref={toggleRef}>
              <div className="modal-body-header">
                <div
                  className="modal-body-header-btn"
                  onClick={() => setShowModal(!showModal)}
                >
                  <CloseIcon />
                </div>
              </div>
              <p className="modal-body-message">정말로 삭제하시겠습니까?</p>
              <div className="modal-body-confirm-btn">
                <button onClick={() => setShowModal(!showModal)}>
                  취소하기
                </button>
                <button onClick={() => handleDelete(contentId)}>
                  삭제하기
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
