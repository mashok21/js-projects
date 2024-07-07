import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowPost() {
  
  const [singlePost, setSinglePost] = useState({})
  const [postComments, setPostComments] = useState([])
  const {postId, userId, userName} = useParams();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => setSinglePost(response.data))
      .catch(err => console.log(err));
  }, [postId]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => setPostComments(response.data))
      .catch(err => console.log(err));
  }, [postId]);
  
  
  return (
    <>
    <h3>Post Title: {singlePost.title}</h3>
    <h3>Post Body: {singlePost.body}</h3>
    <hr></hr>
      {postComments.length > 0 ? (
        <div>
          <h2> Comments - ({postComments.length})</h2>
        </div>
      ) : (
        <p>loading... </p>
      )}
      <hr></hr>     
      <ul>
      {postComments ?  (postComments.map((comment, index) => {
        return <li key = {comment.id}>{comment.body}</li>
      })) : (
        <p>Loading...</p>
      )}
      </ul>
      <hr></hr>
      <p><Link to={`/posts/${userId}/${userName}`}>More Posts of the Author: {userName}</Link></p>
    </>
  );
}
