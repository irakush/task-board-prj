import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskCard from "./TaskCard";
import { Modal, Button, Form } from "react-bootstrap";

function BoardDetail() {
  const { id } = useParams();
  const [boardDetails, setBoardDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status] = useState("To Do"); // Default status 'To Do'

  useEffect(() => {
    fetchBoard();
    fetchUsers();
  }, [id]);

  const fetchBoard = () => {
    fetch(`http://127.0.0.1:5555/boards/${id}`)
      .then((response) => response.json())
      .then((data) => setBoardDetails(data));
  };

  const fetchUsers = () => {
    fetch("http://127.0.0.1:5555/users")
      .then((response) => response.json())
      .then(setUsers);
  };

  const handleAddTask = () => {
    const newTask = { name: taskName, status };
    fetch("http://127.0.0.1:5555/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((task) => {
        const newUserTask = {
          user_id: selectedUserId,
          task_id: task.id,
          board_id: id,
          end_date: endDate,
        };

        fetch("http://127.0.0.1:5555/user_tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUserTask),
        }).then(() => {
          setShowModal(false);
          fetchBoard(); // Перезагрузка данных доски, чтобы отобразить новую задачу
        });
      })
      .catch((error) => console.error("Error:", error));
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
          <Button
            variant="btn btn-secondary btn-sm"
            onClick={() => setShowModal(true)}
          >
            Add Task
          </Button>
          <br></br>
          <br></br>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                required
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BoardDetail;
