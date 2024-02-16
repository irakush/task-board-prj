import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/boards")
      .then((response) => response.json())
      .then((data) => setBoards(data));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Boards 1
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {boards.map((board) => (
              <li className="nav-item" key={board.id}>
                <Link className="nav-link" to={`/board/${board.id}`}>
                  {board.name}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
