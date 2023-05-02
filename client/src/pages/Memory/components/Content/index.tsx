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
    <div>
      <h1>{state.topic}</h1>
    </div>
  );
};

export default Content;
