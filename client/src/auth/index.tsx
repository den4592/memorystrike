import React, { useContext, useState } from "react";
import { AuthContext } from "../shared/context/auth.context";

const Auth = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return <div></div>;
};

export default Auth;
