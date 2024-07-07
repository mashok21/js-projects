import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data))
      .catch((err) => console.log(err));
  }, []);

  
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);
  



  return (
    <div>
      <h2>Listing All Posts - {posts.length}</h2>
      <ul>
        {posts.map((post, index) => {
          const user = users.find(user => user.id === post.userId);
          return (
            <li key={index}>
              <Link to={`/showposts/${post.id}/${user?.id}/${user?.name}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
