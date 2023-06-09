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
                    1. '메모리' 페이지에서 카테고리 추가 버튼을 클릭하여
                    카테고리와 설명(선택)을 추가한다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    2. 추가한 카테고리를 바탕으로 삭제, 수정 및 하위 토픽
                    페이지로 넘어가는 링크 옵션을 사용할 수 있다.
                    <br />
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    3. 카테고리의 하위 토픽 페이지로 넘어가는 링크를 클릭한다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    4. 복습을 하고자 하는 토픽의 주제/제목/질문과 그에 해당하는
                    설명/정답을 기재하여 추가한다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    5. (4)를 통해 여러개의 토픽 카드를 생성한다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    6. 토픽 셔플 버튼을 클릭하여 셔플 페이지로 넘어간다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    7. 뒤집어져 있는 카드를 클릭하면 타이머가 가동되면서 복습을
                    해나가면 된다.
                    <br /> - 토픽에 대한 답을 스스로 기재해보면서 스스로가
                    판단하였을 때 답에 근접했으면, 체크 표시, 애매모호하면
                    느낌표 표시, 틀렸으면 x표시를 클릭한다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    8. 마지막 토픽에 대한 설명과 체크 표시를 하였으면 마무리하기
                    버튼을 클릭한다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    9. 소요시간, 체크 결과, 다시하기 및 통계 버튼이 등장할
                    것이다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    10. 통계 버튼을 클릭하여 통계 페이지로 넘어간다.
                  </li>
                  <li className="howtouse-modal-body-text-list-item">
                    11. 통계 페이지에서는 이전까지 복습한 결과들에 대해 확인이
                    가능하며, 별도로 테이블의 토픽 중 원하는 부분만 체크를 하여
                    복습 페이지로 넘어갈 수 있다.{" "}
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
