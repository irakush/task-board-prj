import React from "react";

function TaskCard({ userTask }) {
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{userTask.task.name}</h5>
          <p className="card-text">Status: {userTask.task.status}</p>
          <figure className="text-end">
            <p className="card-text">
              <small>User: {userTask.user.name}</small>
            </p>
            <p className="card-text">
              <small>End Date: {userTask.end_date}</small>
            </p>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
