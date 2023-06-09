import { useEffect, useRef } from "react";
import "./index.scss";
import CloseIcon from "../../../assets/svgs/close.svg";
import { HowToUseModalPortal } from "./HowToUseModalPortal";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HowToUseModal = ({ showModal, setShowModal }: ModalProps) => {
  // 모달 오버레이에서 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <>
      <HowToUseModalPortal>
        {showModal && (
          <div className="howtouse-modal">
            <div className="howtouse-modal-body">
              <div className="howtouse-modal-body-header">
                <div
                  className="howtouse-modal-body-header-btn"
                  onClick={() => setShowModal(!showModal)}
                >
                  <CloseIcon />
                </div>
              </div>
              <div className="howtouse-modal-body-text">
                <p className="howtouse-modal-body-text-title">
                  서비스 이용 방법
                </p>
              </div>
            </div>
          </div>
        )}
      </HowToUseModalPortal>
    </>
  );
};

export default HowToUseModal;
