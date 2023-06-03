import { useEffect, useRef } from "react";
import "./index.scss";
import CloseIcon from "../../../assets/svgs/close.svg";
import { ModalPortal } from "./ModalPortal";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

const Modal = ({ showModal, setShowModal, message }: ModalProps) => {
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
      <ModalPortal>
        {showModal && (
          <div className="modal">
            <div className="modal-mask" ref={toggleRef}></div>
            <div className="modal-body">
              <div className="modal-body-header">
                <div
                  className="modal-body-header-btn"
                  onClick={() => setShowModal(!showModal)}
                >
                  <CloseIcon />
                </div>
              </div>
              <p className="modal-body-message">{message}</p>
            </div>
          </div>
        )}
      </ModalPortal>
    </>
  );
};

export default Modal;
