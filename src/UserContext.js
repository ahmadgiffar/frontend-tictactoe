import React, { useState, createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
    image: "",
    win: "",
    draw: "",
    lose: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const [players, setPlayers] = useState([]);
  // const valueUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  // const valueAuthenticated = useMemo(
  //   () => ({ isAuthenticated, setIsAuthenticated }),
  //   [isAuthenticated, setIsAuthenticated]
  // );
  const usersContext = {
    user,
    setUser,
    isAuth,
    setIsAuth,
    players,
    setPlayers,
  };

  return (
    <UserContext.Provider value={usersContext}>
      {props.children}
    </UserContext.Provider>
  );
};
