import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserPosts() {
  
  const [userPosts, setUserPosts] = useState([])

  const {userId, userName} = useParams();

 useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
          params: { userId }
       })
      .then((response) => {
        console.log(response.data)
        setUserPosts(response.data)
      })
      .catch((err) => console.log(err));
  }, [userId]);

  

  
  return (
    <>
      <h3>USERNAME: {userName}</h3>
      {userPosts ? (
        <div>
          <h2> Posts Written By User </h2>
        </div>
      ) : (
        <p>loading... </p>
      )}
      
      {userPosts ? (
        <div>
          <h3> Number of Posts - {userPosts.length}</h3>
        </div>
      ) : (
        <p>loading... </p>
      )}
      
      <ul>
      {userPosts ?  (userPosts.map(post => {
        return <li key = {post.id}><Link to={`/showposts/${post.id}/${userId}/${userName}`}>{post.title}</Link></li>
      })) : (
        <p>Loading...</p>
      )}
      </ul>
    </>
  );
}
