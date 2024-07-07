import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <p>Number of Users: {users.length}</p>
      <ul>
        {users.map((user) => {
          return <li key={user.id}><Link to={`/posts/${user.id}/${user.name}`}>{user.name}</Link></li>;
        })}
      </ul>
    </div>
  );
}
