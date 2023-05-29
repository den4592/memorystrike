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
import useAuth from "./hooks/auth-hook";

function App() {
  const { token, login, logout, userId } = useAuth();
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          userId: userId,
          token: token,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          {token ? (
            <Switch>
              <>
                <div className="main">
                  <div className="main-container">
                    <Sidebar />
                    <Route exact path="/memory" component={() => <Memory />} />
                    <Redirect from="/*" to="/memory" />
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
