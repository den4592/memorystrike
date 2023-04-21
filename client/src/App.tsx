import { useState, useCallback, useContext } from "react";
import "./index.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./index.scss";

import Auth from "./auth";
import { AuthContext } from "./shared/context/auth.context";
import Sidebar from "./shared/components/Sidebar";

function App() {
  const auth = useContext(AuthContext);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const login = useCallback(() => {
    setisLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setisLoggedIn(false);
  }, []);

  let routes;
  console.log(auth);

  return (
    <div>
      <Router>
        <Sidebar />
        <Switch></Switch>

        <div className="main">123</div>
      </Router>
    </div>
  );
}

export default App;
