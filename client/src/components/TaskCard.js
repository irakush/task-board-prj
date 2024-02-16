import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function TaskCard({ userTask, onUpdate, onDelete }) {
  const [show, setShow] = useState(false);
  const [taskName, setTaskName] = useState(userTask.task.name);
  const [taskStatus, setTaskStatus] = useState(userTask.task.status);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    fetch(`http://127.0.0.1:5555/tasks/${userTask.task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskName,
        status: taskStatus,
      }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setShow(false);
        // Вызов callback функции с обновленной задачей
        onUpdate({ ...userTask, task: updatedTask });
      })
      .catch((error) => {
        console.error("Ошибка при обновлении задачи:", error);
      });
  };

  const handleDelete = () => {
    fetch(`http://127.0.0.1:5555/tasks/${userTask.task.id}`, {
      method: "DELETE",
    })
      .then(() => onDelete())
      .catch((error) => {
        console.error("Ошибка при удалении задачи:", error);
      });
  };

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
          <Button variant="btn btn-secondary btn-sm" onClick={handleShow}>
            Edit
          </Button>
          &ensp;
          <Button variant="btn btn-dark btn-sm" onClick={handleDelete}>
            Delete
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
