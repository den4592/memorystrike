import { useState, useCallback, useContext } from "react";
import "./index.scss";
import "./reset.css";
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
import Memory from "./pages/Memory";
import Statistics from "./pages/Statistics";
import Ask from "./pages/Ask";
import Content from "./pages/Memory/components/Content";

function App() {
  const auth: any = useContext(AuthContext);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  // const login = useCallback(() => {
  //   setisLoggedIn(true);
  // }, []);

  // const logout = useCallback(() => {
  //   setisLoggedIn(false);
  // }, []);

  let routes;

  return (
    <div>
      <AuthContext.Provider
        value={(auth.token, auth.isLoggedIn, auth.login, auth.logout)}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Auth />} />
            <>
              <div className="main">
                <div className="main-container">
                  <Sidebar />
                  <Route exact path="/memory" component={() => <Memory />} />
                  <Route
                    exact
                    path="/memory/content/:contentId"
                    component={() => <Content />}
                  />
                  <Route
                    exact
                    path="/statistics"
                    component={() => <Statistics />}
                  />
                  <Route exact path="/ask" component={() => <Ask />} />
                </div>
              </div>
            </>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
