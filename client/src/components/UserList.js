import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UserList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAddUser = (e) => {
    e.preventDefault();
    const user = { name: newUserName };
    fetch("http://127.0.0.1:5555/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((addedUser) => {
        setUsers([...users, addedUser]); // Используйте ответ сервера для добавления пользователя
        handleClose();
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://127.0.0.1:5555/users/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h2>Users</h2>
      <Button variant="btn btn-secondary btn-sm" onClick={handleShow}>
        New User
      </Button>
      <div className="d-flex flex-wrap">
        {users.map((user) => (
          <div className="card m-2" style={{ width: "18rem" }} key={user.id}>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <Button
                variant="btn btn-dark btn-sm"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddUser}>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                required
              />
            </Form.Group>
            <br></br>
            <Button variant="btn btn-primary btn-sm" type="submit">
              Save User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserList;
