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
import Content from "./pages/Memory/components/Content";
import ShuffledTopics from "./pages/Memory/components/ShuffledTopics";
import Footer from "./shared/components/Footer";
import useAuth from "./hooks/auth-hook";
import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  const { token, login, logout, userId } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className={`App ${isDarkMode && "dark-mode"}`}>
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
                    <Sidebar
                      isDarkMode={isDarkMode}
                      setIsDarkMode={toggleDarkMode}
                    />
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
                    <Redirect from="/*" to="/memory" />
                  </div>
                </div>
                <Footer />
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
