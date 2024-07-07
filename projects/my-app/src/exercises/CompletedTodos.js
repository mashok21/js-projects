import axios from "axios"
import {useState, useEffect} from "react"

export default function UserTodos () {
    
    const [users, setUsers] = useState([])
    const [todos, setTodos] = useState([])
    const [choice, setChoice] = useState('')
    const [taskStatus, setTaskStatus] = useState('')
    

    const urlUsers = `https://jsonplaceholder.typicode.com/users`
    const urlTodos = `https://jsonplaceholder.typicode.com/todos?userId=`

    useEffect(() => {
        axios.get(urlUsers)
            .then(response => setUsers(response.data))
            .catch(err => console.log(err))
        }, [])

    const userNames = users.map(user => [user.id, user.name])
    
    useEffect(() => {
        axios.get(urlTodos+choice)
            .then(response => setTodos(response.data))
            .catch(err => console.log(err))
        
    }, [choice])
    

    const filteredTodos = todos.filter(todo => {
        if (taskStatus === 'completed'){
            return todo.completed === true
        } else if (taskStatus === 'incomplete'){
            return todo.completed === false
        } else {
            return true
        }
    })


   return(
        <>
        <select onChange ={(e) => setChoice(e.target.value)}>
            <option>Select user</option>
            {userNames.map(item => {
                return <option key={item[0]} value={item[0]}>{item[1]}</option>
            })}
        </select>

        <select onChange={e => setTaskStatus(e.target.value)}>
            <option value="Select option">Select option</option>    
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
        </select>    

        <ul>
           {filteredTodos.map((todo, index) => (
                <li
                    style={{textDecoration: todo.completed ? 'line-through' : 'none'}} 
                    key={index}>
                    {todo.title}
                </li>
           ))}
        </ul>
        </>
    )

}