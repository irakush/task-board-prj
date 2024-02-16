import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskCard from "./TaskCard";

function BoardDetail() {
  const { id } = useParams();
  const [boardDetails, setBoardDetails] = useState(null);

  useEffect(() => {
    fetchBoard();
  }, [id]);

  const fetchBoard = () => {
    fetch(`http://127.0.0.1:5555/boards/${id}`)
      .then((response) => response.json())
      .then((data) => setBoardDetails(data));
  };

  const updateTaskInList = (updatedTask) => {
    console.log(boardDetails, " :: ", boardDetails);
    const updatedTasks = boardDetails.user_tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    let updatedTasksDetails = {};
    updatedTasksDetails["user_tasks"] = updatedTasks;
    setBoardDetails(updatedTasksDetails);
  };

  const deleteTask = () => {
    console.log(id);
    fetchBoard();
  };

  if (!boardDetails) return <div>Loading...</div>;

  return (
    <div className="col">
      {boardDetails && (
        <>
          <h2>{boardDetails.name}</h2>
          <div className="row row-cols-1 row-cols-md-5 g-3">
            {boardDetails.user_tasks.map((userTask) => (
              <TaskCard
                key={userTask.id}
                userTask={userTask}
                onUpdate={updateTaskInList}
                onDelete={deleteTask}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BoardDetail;
