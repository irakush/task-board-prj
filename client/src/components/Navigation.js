import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navigation({ boards, onCreateBoard }) {
  // const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");

  console.log(boards);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5555/boards")
  //     .then((response) => response.json())
  //     .then((data) => setBoards(data));
  // }, []);

  const handleCreateBoard = () => {
    onCreateBoard(newBoardName);
    setNewBoardName("");
  };

  return (
    <div id="sidebar-wrapper">
      <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <Link className="sidebar-brand" to="/">
            <b>
              <font color="red">Tasks</font> Board
            </b>
          </Link>
        </li>
        <li className="list-group-item">
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Enter new board name"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
          <div className="d-grid gap-2">
            <button
              className="btn btn-secondary btn-sm btn-block"
              onClick={handleCreateBoard}
            >
              Create Board
            </button>
          </div>
          <hr></hr>
        </li>
        {boards.map((board) => (
          <li className="sidebar-item" key={board.id}>
            <Link className="sidebar-link" to={`/board/${board.id}`}>
              {board.name}
            </Link>
          </li>
        ))}

        <hr></hr>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/users">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
