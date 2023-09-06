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
import { AuthContextType } from "./shared/context/auth.context";
import Sidebar from "./shared/components/Sidebar";
import Memory from "./pages/Memory";
import Statistics from "./pages/Statistics";
import Content from "./pages/Memory/components/Content";
import ShuffledTopics from "./pages/Memory/components/ShuffledTopics";
import Footer from "./shared/components/Footer";
import useAuth from "./hooks/auth-hook";
import ScrollToTop from "./utils/ScrollToTop";
import { useDarkMode } from "./hooks/useDarkMode";
import ReactGA from "react-ga";

const gaTrackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
ReactGA.initialize(gaTrackingId);

function App() {
  const { token, login, logout, userId } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const storedData = JSON.parse(localStorage.getItem("userData")!);

  const contextValue: AuthContextType = {
    token,
    userId,
    login,
    logout,
  };

  return (
    <div className={`App ${isDarkMode && "dark-mode"}`}>
      <AuthContext.Provider value={contextValue}>
        <Router>
          <ScrollToTop />
          {storedData?.isLoggedIn &&
          new Date(storedData?.expiration) > new Date() ? (
            <Switch>
              <>
                <div className="main">
                  <div className="main-container">
                    <Sidebar
                      isDarkMode={isDarkMode}
                      setIsDarkMode={toggleDarkMode}
                    />

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
