import React, { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <div className="d-flex flex-wrap">
        {users.map((user) => (
          <div className="card m-2" style={{ width: "18rem" }} key={user.id}>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
