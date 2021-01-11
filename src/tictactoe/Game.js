import React from "react";
import { withRouter } from "react-router-dom";
import "../tictactoe/Game.css";
import Board from "./Board";
import Profile from "./Profile";
import Sidebar from "./Sidebar";

function Game() {
  return (
    <div>
      <h1 className="heading-1">Tic Tac Toe</h1>
      <div className="container-tictactoe">
        <Sidebar />
        <Board />
        <Profile></Profile>
      </div>
    </div>
  );
}

export default withRouter(Game);
