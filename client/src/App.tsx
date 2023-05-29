import { useState, useCallback, useEffect } from "react";
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
import ShuffledTopics from "./pages/Memory/components/ShuffledTopics";

function App() {
  const [token, setToken] = useState<any>(false);

  const login = useCallback((token: boolean) => {
    setToken(token);
    localStorage.setItem("userData", JSON.stringify({ token }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")!);
    if (storedData && storedData.token) {
      login(storedData.token);
    }
  }, [login]);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          {localStorage.getItem("userId") ? (
            <Switch>
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
                      path="/memory/shuffled"
                      component={() => <ShuffledTopics />}
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
              <Route exact path="/login" component={() => <Auth />} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/login" component={() => <Auth />} />
              <Redirect to="/login" />
            </Switch>
          )}
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
