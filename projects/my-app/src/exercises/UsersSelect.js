import axios from "axios";
import {useState, useEffect} from "react"


export default function UsersSelect (){
    const url = `https://jsonplaceholder.typicode.com/users`
    const [users, setUsers] = useState([])
    const [choice, setChoice] = useState('')
    

    useEffect(() => {
        axios.get(url)
        .then(response => setUsers(response.data))
        .catch(err => console.log(err))
    })


    return (<>
        <select onChange={(e) => setChoice(e.target.value)}>
            <option>Select</option>
            {users.map(user => {
                return <option key={user.id} value={user.name}>{user.name}</option>
            })}
        </select>
        <h2>User choice is {choice}</h2>
        </>
    )
}
