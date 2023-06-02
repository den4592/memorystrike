import ReactDOM from "react-dom";

export const ModalPortal = ({ children }: any) => {
  const el = document.getElementById("modal")!;
  return ReactDOM.createPortal(children, el);
};
