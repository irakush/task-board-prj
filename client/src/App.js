import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import BoardDetail from "./components/BoardDetail";
import UserList from "./components/UserList";
import "./styles/sidebar.css";

function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = () => {
    fetch("http://127.0.0.1:5555/boards")
      .then((response) => response.json())
      .then((data) => setBoards(data))
      .catch((error) => console.error("Error fetching boards:", error));
  };

  const handleCreateBoard = (boardName) => {
    fetch("http://127.0.0.1:5555/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: boardName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create board");
        }
        return response.json();
      })
      .then((data) => {
        // Обновляем список досок
        fetchBoards();
      })
      .catch((error) => console.error("Error creating board:", error));
  };

  return (
    <Router>
      <div id="wrapper">
        <Navigation boards={boards} onCreateBoard={handleCreateBoard} />
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                {/* <div className="container"> */}
                <Routes>
                  <Route path="/board/:id" element={<BoardDetail />} />
                  <Route path="/users" element={<UserList />} />
                </Routes>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
