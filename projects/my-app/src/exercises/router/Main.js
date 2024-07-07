import Home from "./Home";
import Users from "./Users";
import Posts from "./Posts";
import UserPosts from "./UserPosts";
import ShowPost from "./ShowPost";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function Main() {
  return (
    <BrowserRouter>
        <div>
            <h1>React Routing </h1>
                <ul> 
                    <li key="home"><Link to="/home">Home</Link></li> 
                    <li key="users"><Link to="/users">Users</Link></li>
                    <li key="posts"><Link to="/allposts">Posts</Link></li>
                </ul>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/posts/:userId/:userName" element={<UserPosts />} />
                    <Route path="/showposts/:postId/:userId/:userName" element={<ShowPost />}/>
                    <Route path="/allposts" element={<Posts />} />
                </Routes>
        </div>
    </BrowserRouter>
  )
}
