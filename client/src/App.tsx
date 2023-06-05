import "./index.scss";
import "./reset.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./index.scss";
import { lazy, Suspense } from "react";
import { AuthContext } from "./shared/context/auth.context";
import useAuth from "./hooks/auth-hook";
// import Sidebar from "./shared/components/Sidebar";
// import Statistics from "./pages/Statistics";
// import Memory from "./pages/Memory";
// import Statistics from "./pages/Statistics";
// import Ask from "./pages/Ask";
// import Content from "./pages/Memory/components/Content";
// import ShuffledTopics from "./pages/Memory/components/ShuffledTopics";

const Sidebar = lazy(() => import("./shared/components/Sidebar"));
const Auth = lazy(() => import("./auth"));
const Memory = lazy(() => import("./pages/Memory"));
const Content = lazy(() => import("./pages/Memory/components/Content"));
const ShuffledTopics = lazy(
  () => import("./pages/Memory/components/ShuffledTopics")
);
const Ask = lazy(() => import("./pages/Ask"));
const Statistics = lazy(() => import("./pages/Statistics"));

function App() {
  const { token, login, logout, userId } = useAuth();
  return (
    <div className="App">
      <Suspense fallback={<span className="loader"></span>}>
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
                      <Route
                        exact
                        path="/memory"
                        component={() => <Memory />}
                      />
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
      </Suspense>
    </div>
  );
}

export default App;
