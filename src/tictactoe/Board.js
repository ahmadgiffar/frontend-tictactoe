import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import io from "socket.io-client";
import $ from "jquery";

function Board({ history }) {
  const usersContext = useContext(UserContext);
  const { user, setUser, setIsAuth } = usersContext;
  const lose = Number(user.lose);
  const win = Number(user.win);

  const updateLose = () => {
    axios
      .post(
        "https://tic-tac-toe-uncr.herokuapp.com/app/updatelose",
        { _id: user._id, lose: lose + 1 },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUser({ ...user, lose: Number(res.data.lose) + 1 });
      });
  };
  const updateWin = () => {
    axios
      .post(
        "https://tic-tac-toe-uncr.herokuapp.com/app/updatewin",
        { _id: user._id, win: win + 1 },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setUser({ ...user, win: Number(res.data.win) + 1 });
      });
  };

  useEffect(() => {
    const socket = io("https://tic-tac-toe-uncr.herokuapp.com");
    var myTurn = true;
    var symbol;

    function getBoardState() {
      var obj = {};

      /* We are creating an object where each attribute corresponds
   to the name of a cell (r0c0, r0c1, ..., r2c2) and its value is
   'X', 'O' or '' (empty).
  */
      $(".board button").each(function () {
        obj[$(this).attr("id")] = $(this).text() || "";
      });

      return obj;
    }

    function isGameOver() {
      var state = getBoardState();
      var matches = ["XXX", "OOO"]; // This are the string we will be looking for to declare the match over

      // We are creating a string for each possible winning combination of the cells
      var rows = [
        state.r0c0 + state.r0c1 + state.r0c2, // 1st line
        state.r1c0 + state.r1c1 + state.r1c2, // 2nd line
        state.r2c0 + state.r2c1 + state.r2c2, // 3rd line
        state.r0c0 + state.r1c0 + state.r2c0, // 1st column
        state.r0c1 + state.r1c1 + state.r2c1, // 2nd column
        state.r0c2 + state.r1c2 + state.r2c2, // 3rd column
        state.r0c0 + state.r1c1 + state.r2c2, // Primary diagonal
        state.r0c2 + state.r1c1 + state.r2c0, // Secondary diagonal
      ];

      // Loop through all the rows looking for a match
      for (var i = 0; i < rows.length; i++) {
        if (rows[i] === matches[0] || rows[i] === matches[1]) {
          return true;
        }
      }

      return false;
    }

    function renderTurnMessage() {
      if (!myTurn) {
        // If not player's turn disable the board
        $("#message").text("Your opponent's turn");
        $(".board button").attr("disabled", true);
      } else {
        // Enable it otherwise
        $("#message").text("Your turn.");
        $(".board button").removeAttr("disabled");
      }
    }

    function makeMove(e) {
      if (!myTurn) {
        return; // Shouldn't happen since the board is disabled
      }

      if ($(this).text().length) {
        return; // If cell is already checked
      }

      socket.emit("make.move", {
        // Valid move (on client side) -> emit to server
        symbol: symbol,
        position: $(this).attr("id"),
      });
    }

    // Bind event on players move
    socket.on("move.made", function (data) {
      $("#" + data.position).text(data.symbol); // Render move

      // If the symbol of the last move was the same as the current player
      // means that now is opponent's turn
      myTurn = data.symbol !== symbol;

      if (!isGameOver()) {
        // If game isn't over show who's turn is this
        renderTurnMessage();
      } else {
        // Else show win/lose message
        if (myTurn) {
          $("#message").text("You lost.");
          // update lose
          updateLose();
        } else {
          $("#message").text("You won!");
          // update win
          updateWin();
        }

        $(".board button").attr("disabled", true); // Disable board
      }
    });

    // Bind event for game begin
    socket.on("game.begin", function (data) {
      symbol = data.symbol; // The server is assigning the symbol
      myTurn = symbol === "X"; // 'X' starts first
      renderTurnMessage();
    });

    // Bind on event for opponent leaving the game
    socket.on("opponent.left", function () {
      $("#message").text("Your opponent left the game.");
      $(".board button").attr("disabled", true);
    });

    // Binding buttons on the board
    $(function () {
      $(".board button").attr("disabled", true); // Disable board at the beginning
      $(".board> button").on("click", makeMove);
    });
  }, []);

  return (
    <div className="board-container">
      <div id="message">Waiting for an opponent...</div>
      <div className="board">
        <button className="btn" id="r0c0"></button>{" "}
        <button className="btn" id="r0c1"></button>{" "}
        <button className="btn" id="r0c2"></button>
        <button className="btn" id="r1c0"></button>{" "}
        <button className="btn" id="r1c1"></button>{" "}
        <button className="btn" id="r1c2"></button>
        <button className="btn" id="r2c0"></button>{" "}
        <button className="btn" id="r2c1"></button>{" "}
        <button className="btn" id="r2c2"></button>
      </div>
    </div>
  );
}

export default withRouter(Board);
