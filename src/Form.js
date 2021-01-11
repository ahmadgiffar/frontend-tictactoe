import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import Input from "./Input";
import { UserContext } from "./UserContext";
import axios from "axios";

function Form({ formName, text, history }) {
  const usersContext = useContext(UserContext);
  const { user, setUser, isAuth, setIsAuth } = usersContext;

  let emailInput;

  const changeUsername = (event) => {
    setUser({ ...user, username: event.target.value });
  };
  const changeEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const changePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const submitRegister = (event) => {
    axios
      .post(
        "https://tic-tac-toe-uncr.herokuapp.com/app/register",
        { ...user, login: 1 },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === "User Already Exists") {
          console.log(res);
          alert("user already exists, login instead!");
        } else {
          setUser(res.data);
          console.log(res.data);
          setIsAuth(true);
          history.push("/");
        }
      });

    event.preventDefault();
  };

  const submitLogin = (event) => {
    axios
      .post(
        "https://tic-tac-toe-uncr.herokuapp.com/app/login",
        {
          username: user.username,
          password: user.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data === "No User Exists") {
          console.log(res);
          alert("Email and Password didn't match or no exist");
        } else {
          setUser(res.data);
          setIsAuth(true);
          console.log(res.data);
          history.push("/");
        }
      });
    axios.post(
      "https://tic-tac-toe-uncr.herokuapp.com/app/loginstatus",
      { username: user.username },
      {
        withCredentials: true,
      }
    );
    event.preventDefault();
  };

  if (formName !== "Login") {
    emailInput = (
      <Input
        onChange={changeEmail}
        type="email"
        label="Email"
        value={user.email}
      />
    );
  }

  return (
    <div className="container mt-5">
      <h1>{formName}</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8  col-sm-12">
          <div className="card">
            <div className="card-body">
              {/* Makes POST request to /register route */}

              <Input
                onChange={changeUsername}
                type="text"
                label="Username"
                value={user.username}
              />
              {emailInput}
              <Input
                onChange={changePassword}
                type="password"
                label="Password"
                value={user.password}
              />
              <button
                onClick={formName === "Login" ? submitLogin : submitRegister}
                type="submit"
                className="btn form-btn"
              >
                {formName}
              </button>
              <a href={`/${formName === "Login" ? "Register" : "Login"}`}>
                {text}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Form);
