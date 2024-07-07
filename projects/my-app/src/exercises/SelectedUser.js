import axios from "axios"
import {useState, useEffect} from "react"

export default function SelectedUser () {

    const url =`https://jsonplaceholder.typicode.com/users`

    const [users, setUsers] = useState([])
    const [choice, setChoice] = useState('')

    useEffect(() => {
        axios.get(url)
            .then(response => setUsers(response.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <select onChange = {(e) => setChoice(Number(e.target.value))}>
                <option>Select</option>
                {users.map(user => {
                    return <option key={user.id} value={user.id}>{user.name}</option>
                })}
            </select>
            <div>
                <p>{(users.filter(user => user.id === choice))[0].name} | {(users.filter(user => user.id === choice))[0].email} | {(users.filter(user => user.id === choice))[0].address.city}</p>
            </div>
        </>
    )
}