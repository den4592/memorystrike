import ReactDOM from "react-dom";

export const HowToUseModalPortal = ({ children }: any) => {
  const el = document.getElementById("howtouse-modal")!;
  return ReactDOM.createPortal(children, el);
};
