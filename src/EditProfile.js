import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
import Input from "./Input";

function EditProfile({ history }) {
  const usersContext = useContext(UserContext);
  const { user, setUser, setIsAuth } = usersContext;

  const makeEdit = (event) => {
    const formData = new FormData();

    formData.append("image", user.image);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("_id", user._id);

    axios
      .post(
        "https://tic-tac-toe-uncr.herokuapp.com/app/editprofile",
        formData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        alert("data successfully changed, please login again!");
        setIsAuth(false);
        setUser({});
      });
    event.preventDefault();
  };

  return (
    <div className="container mt-5">
      <h1>Edit Profile</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8  col-sm-12">
          <div className="card">
            <div className="card-body">
              {/* Makes POST request to /register route */}
              <form onSubmit={makeEdit} encType="multipart/form-data">
                <div className="form-group">
                  <label htmlFor="file">Photo</label>
                  <input
                    onChange={(event) => {
                      setUser({ ...user, image: event.target.files[0] });
                    }}
                    type="file"
                    filename="image"
                    className="form-control"
                  />
                </div>
                <Input
                  onChange={(event) => {
                    setUser({ ...user, username: event.target.value });
                  }}
                  type="text"
                  label="Username"
                  value={user.username}
                />
                <Input
                  onChange={(event) => {
                    setUser({ ...user, email: event.target.value });
                  }}
                  type="email"
                  label="Email"
                  value={user.email}
                />
                <Input
                  onChange={(event) => {
                    setUser({ ...user, password: event.target.value });
                  }}
                  type="password"
                  label="Password"
                  value={user.password}
                />
                {/* bikin handleSubmit untuk history.push */}
                <button type="submit" className="btn form-btn">
                  Save
                </button>
              </form>
              <Link to="/">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="btn invite-btn">Cancel</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(EditProfile);
