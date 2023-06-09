import ReactDOM from "react-dom";

export const ConfirmModalPortal = ({ children }: any) => {
  const el = document.getElementById("confirm-modal")!;
  return ReactDOM.createPortal(children, el);
};
