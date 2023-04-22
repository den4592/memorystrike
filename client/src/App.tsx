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
import Memory from "./pages/Memory";
import Statistics from "./pages/Statistics";
import Ask from "./pages/Ask";

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

  return (
    <div>
      <Auth></Auth>
      {/* <Router>
        <Sidebar />
        <div className="main">
          <Switch>
            <Route path="/memory" component={() => <Memory />} />
            <Route path="/statistics" component={() => <Statistics />} />
            <Route path="/ask" component={() => <Ask />} />
          </Switch>
        </div>
      </Router> */}
    </div>
  );
}

export default App;
