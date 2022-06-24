import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useState, useEffect } from "react";

const customStyles = {
  content: {
    width: "100%",
    minWidth: "300px",
    maxWidth: "60%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "1rem",
  },
};

export const About = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#07C9F5";
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalIsOpen]);

  return (
    <div className="modal-container">
      <i className="fa-solid fa-circle-question about-btn" onClick={openModal}></i>
      <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <i className="fa-solid fa-xmark modal-close-btn" onClick={closeModal} style={{ color: "red", fontSize: "1.5rem" }}></i>
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>App 사용방법</p>
        <ol className="modal-text-list" ref={(_subtitle) => (subtitle = _subtitle)}>
          <li className="modal-text-item">Topic 입력창에 복습(셀프 테스트) 하고자 하는 주제를 기재한다.</li>
          <li className="modal-text-item">메뉴 창을 열고 [Answer o]를 선택한다.</li>
          <li className="modal-text-item">하단 창에 주제에 대한 설명이나 정답을 작성하고 'Add'를 누른다.</li>
          <li className="modal-text-item">현재까지 추가한 Topic들은 하단에서 확인 및 삭제가 가능하다.</li>
          <li className="modal-text-item">복습할 준비가 되었으면 'Mix'를 누른다.</li>
          <li className="modal-text-item">앞서 입력한 Topic들은 랜덤으로 섞여서 출력된다.</li>
          <li className="modal-text-item">카드를 눌러 Topic을 확인하고 텍스트 입력창에 정답이나, 해당 주제에 대한 떠오르는 부분을 작성하며 스스로 테스트한다.</li>
          <li className="modal-text-item">이후 Answer을 누르면 첫페이지에서 기재한 Topic의 정답을 확인 할 수 있다.</li>
        </ol>
      </Modal>
    </div>
  );
};
