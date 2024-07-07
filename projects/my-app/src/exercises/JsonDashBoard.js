import {useState, useEffect} from "react"
import axios from 'axios'

export default function JsonDashBoard () {
    
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [todos, setTodos] = useState([])
    
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(response => setUsers(response.data))
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(response => setPosts(response.data))
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/todos`)
            .then(response => setTodos(response.data))
            .catch(err => console.log(err))
    },[])

    return (<>
        {users.length > 0 && <h2>No. of users: {users.length}</h2>}

        {posts.length > 0 && <h2>No. of posts: {posts.length}</h2>}

        {todos.length > 0 && <h2>No. of todos: {todos.length}</h2>}  
    </>)
}