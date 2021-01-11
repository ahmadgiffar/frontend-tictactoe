import React, { useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

function Profile() {
  const usersContext = useContext(UserContext);
  const { user, setUser, setIsAuth } = usersContext;

  const logout = () => {
    axios.post("https://tic-tac-toe-uncr.herokuapp.com/app/logout", user, {
      withCredentials: true,
    });
    setUser({});
    setIsAuth(false);
  };

  return (
    <div className="profile" id="profil">
      <div className="profile-text">
        <h3 className="heading-3">{user.username}</h3>
        <Link to="/viewprofile">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="link">View Profile</a>
        </Link>
        <Link to="/login">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a onClick={logout} className="link">
            Log out
          </a>
        </Link>
      </div>
      <img
        src={user.image ? `/images/${user.image}` : "/images/default.png"}
        alt="profile-pic"
        className="profile-pic"
      />
    </div>
  );
}

export default withRouter(Profile);
