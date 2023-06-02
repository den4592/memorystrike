import { useEffect, useRef } from "react";
import "./index.scss";
import CloseIcon from "../../../assets/svgs/close.svg";

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
        console.log("1");
        setShowModal(!showModal);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleRef]);

  return (
    <>
      {showModal && (
        <div className="modal" ref={toggleRef}>
          <div className="modal-mask"></div>
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
    </>
  );
};

export default Modal;
