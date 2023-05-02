import { useState, useEffect } from "react";
import "./index.scss";
import { useLocation } from "react-router-dom";

interface stateType {
  [x: string]: any;
  from: { pathname: string };
}
const Content = () => {
  const { state } = useLocation<stateType>();

  return (
    <div className="content">
      <h1 className="content-title">{state.topic}</h1>
    </div>
  );
};

export default Content;
