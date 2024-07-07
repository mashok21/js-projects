import axios from "axios"
import {useState, useEffect} from "react"

export default function UserByEmail () {
    
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const url = `https://jsonplaceholder.typicode.com/users/`

    const user = users.find(user => user.email === email)

    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(url)
            .then(response => {
                setUsers(response.data)
            })
            .catch(err=>{
                console.log(err)
                setUsers([])
                setMessage("invalid email")
            })


    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="email"
                value={email}
                onChange = {(e) => setEmail(e.target.value.trim())}
            />
            <input
                type="submit"
                value="Submit"
            />
        </form>
        {users ? (<>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.address.city}</p>
        </>) : (
            <h3>{message}</h3>
        )}
        </>
    )
}