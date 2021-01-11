import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import "./ProfilePage.css";
import { UserContext } from "./UserContext";

function Profile() {
  const usersContext = useContext(UserContext);
  const { user } = usersContext;
  const { win, draw, lose } = user;
  const play = Number(win) + Number(draw) + Number(lose);

  return (
    <div>
      <div class="container container-profile">
        <div class="card card-profile">
          <img
            src={user.image ? `/images/${user.image}` : "/images/default.png"}
            class="card-img-top card-img"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Profile</h5>

            <div class="stat">
              <p>Username</p>
              <p>{user.username}</p>
            </div>

            <div class="stat">
              <p>Email</p>
              <p>{user.email}</p>
            </div>
            <div class="stat">
              <p>Main</p>
              <p>{play}</p>
            </div>
            <div class="stat">
              <p>Menang</p>
              <p>
                {Number(win) === 0
                  ? "0%"
                  : `${(Number(win) / play).toFixed(2) * 100}%`}
                ({win})
              </p>
            </div>
            <div class="stat">
              <p>Seri</p>
              <p>
                {Number(draw) === 0
                  ? "0%"
                  : `${(Number(draw) / play).toFixed(2) * 100}%`}
                ({draw})
              </p>
            </div>
            <div class="stat">
              <p>Kalah</p>
              <p>
                {Number(lose) === 0
                  ? "0%"
                  : `${(Number(lose) / play).toFixed(2) * 100}%`}
                ({lose})
              </p>
            </div>
            <Link to="/">
              <button class="btn back-btn invite-btn">Back</button>
            </Link>
            <Link to="/editprofile">
              <button class="btn edit-btn invite-btn">Edit Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Profile);
