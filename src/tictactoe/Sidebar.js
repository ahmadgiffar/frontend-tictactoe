import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import io from "socket.io-client";

function Sidebar() {
  const usersContext = useContext(UserContext);
  const { user, players, setPlayers } = usersContext;

  const getPlayers = () => {
    setPlayers([]);
    axios
      .get("https://tic-tac-toe-uncr.herokuapp.com/app/onlineplayer", {
        withCredentials: true,
      })
      .then((res) => {
        let obj = res.data;
        let onlinePlayers = obj.map((player) => {
          return player.username;
        });
        setPlayers([...onlinePlayers]);
      });
  };

  return (
    <div className="sidebar">
      <h2 className="heading-2">Online Player</h2>
      <button className="btn invite-btn" onClick={getPlayers}>
        refresh
      </button>
      <ul className="sidebar-content">
        {players.map((player, index) => (
          <div key={index} className="online-player">
            <li>{player}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
