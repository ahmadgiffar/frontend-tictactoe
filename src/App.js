import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import "./loader";
import { UserContext } from "./UserContext";
import Form from "./Form";
import Game from "./tictactoe/Game.js";
import ProfilePage from "./ProfilePage";
import EditProfile from "./EditProfile";
import { io } from "socket.io-client";

function App() {
  const usersContext = useContext(UserContext);
  const { user, isAuth, players, setPlayers } = usersContext;

  // useEffect(() => {
  //   if (!isAuth) return;
  //   const socket = io("http://localhost:4000");
  // }, [isAuth]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            {/* game route */}
            <Route exact path="/">
              {isAuth ? <Game /> : <Redirect to="/login" />}
            </Route>

            {/* view profile route */}
            <Route path="/viewprofile">
              {isAuth ? (
                <ProfilePage />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )}
            </Route>

            {/* edit profile route */}
            <Route path="/editprofile">
              {isAuth ? (
                <EditProfile />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )}
            </Route>

            {/* login route */}
            <Route path="/login">
              {isAuth ? (
                <Redirect to={{ pathname: "/" }} />
              ) : (
                <Form formName="Login" text="Don't have an account yet?" />
              )}
            </Route>
            {/* <Route
              path="/login"
              render={() => (
                <Form formName="Login" text="Don't have an account yet?" />
              )}
            /> */}

            {/* register route */}
            <Route path="/register">
              {isAuth ? (
                <Redirect to={{ pathname: "/" }} />
              ) : (
                <Form formName="Register" text="Already have an account?" />
              )}
            </Route>
            {/* <Route
              path="/register"
              render={() => (
                <Form formName="Register" text="Already have an account?" />
              )}
            /> */}
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
