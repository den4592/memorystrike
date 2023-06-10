import { useEffect, useRef } from "react";
import "./index.scss";
import CloseIcon from "../../../assets/svgs/close.svg";
import { HowToUseModalPortal } from "./HowToUseModalPortal";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HowToUseModal = ({ showModal, setShowModal }: ModalProps) => {
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
                <ol className="howtouse-modal-body-text-list">
                  <li className="howtouse-modal-body-text-list-item">
                    <strong></strong>
                    1. <strong>'메모리'</strong> 페이지에서{" "}
                    <strong>카테고리 추가</strong> 버튼을 클릭한 후{" "}
                    <strong>카테고리</strong>와 <strong>설명(선택)</strong>을
                    추가한다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    2. 추가한 카테고리에는{" "}
                    <strong>(1) 삭제, (2) 수정, (3) 하위 토픽 페이지</strong>
                    의 선택지가 있다.
                    <br />
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    3. 카테고리의 <strong>하위 토픽 페이지</strong>로 넘어가는
                    아이콘을 클릭한다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    4. <strong>복습</strong>을 하고자 하는 토픽의{" "}
                    <strong>주제/제목/질문</strong>과 그에 해당하는{" "}
                    <strong>설명/정답</strong>을 직접 기재하여 추가한다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    5. <strong>(4)</strong>를 반복하여 여러 개의 토픽 카드를
                    생성한다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    6. 토픽 셔플 버튼을 클릭하여 <strong>복습</strong> 페이지로
                    넘어간다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    7. 뒤집어져 있는 <strong>카드를 클릭</strong>하면{" "}
                    <strong>타이머가 가동</strong>되면서 <strong>복습</strong>을
                    진행 할 수 있다.
                    <strong>정답 확인</strong>을 누를 경우{" "}
                    <strong>타이머가 멈추고, 다른 카드</strong>를 클릭하였을
                    경우 자동으로 <strong>재가동</strong> 된다.
                    <br /> - 토픽에 대한 답을 <strong>정답/설명</strong>란에
                    기재해보면서 스스로가 판단하였을 때 답에 근접했으면 -{" "}
                    <strong>체크 아이콘,</strong> 애매모호하면{" "}
                    <strong>! 아이콘,</strong> 틀렸으면{" "}
                    <strong>x 아이콘</strong>을 클릭한다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    8. 마지막 토픽에 대한 <strong>설명</strong>과 답에 대한{" "}
                    <strong>상태 표시</strong>를 진행한 후{" "}
                    <strong>마무리하기</strong> 버튼을 클릭하여 복습을 끝낸다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    9. 마무리하기를 누르면 앞서 진행한 <strong>복습</strong>에
                    대한 <strong>결과</strong> 페이지로 넘어간다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    10. 통계 버튼을 클릭하여 <strong>통계</strong> 페이지로
                    넘어간다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    11. 통계 페이지에서는 이전까지{" "}
                    <strong>복습한 결과들에 대해 확인</strong>이 가능하며,
                    별도의 <strong>토픽 중 원하는 부분만 체크</strong>가
                    가능하다. 이후 그 부분만 따로 복습을 진행 할 수 있다.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </HowToUseModalPortal>
    </>
  );
};

export default HowToUseModal;
