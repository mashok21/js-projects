import axios from "axios"
import {useState, useEffect} from "react"

export default function UserTodos () {
    
    const [users, setUsers] = useState([])
    const [todos, setTodos] = useState([])
    const [choice, setChoice] = useState('')
    

    const urlUsers = `https://jsonplaceholder.typicode.com/users`
    const urlTodos = `https://jsonplaceholder.typicode.com/todos?userId=`

    useEffect(() => {
        axios.get(urlUsers)
            .then(response => setUsers(response.data))
            .catch(err => console.log(err))
        }, [])

    const userNames = users.map(user => [user.id, user.name])
    console.log(userNames)
    
    useEffect(() => {
        axios.get(urlTodos+choice)
            .then(response => setTodos(response.data))
            .catch(err => console.log(err))
        
    }, [choice])
    
    const todoList = todos.map(todo => [todo.title, todo.completed])
    console.log(todoList)

   return(
        <>
        <select onChange ={(e) => setChoice(e.target.value)}>
            <option>Select user</option>
            {userNames.map(item => {
                return <option key={item[0]} value={item[0]}>{item[1]}</option>
            })}
        </select>
        <ul>
            {todoList.map((item, index) => {
                return <li style={{textDecoration: item[1] ? 'line-through' : 'none'}} key={index}>{item[0]}</li>
            })}

        </ul>
        </>
    )

}