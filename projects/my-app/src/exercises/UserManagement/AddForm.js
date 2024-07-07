import {useState, useMemo} from "react"
import usersContext from "./UsersContext"
import { useContext } from "react"

export default function AddForm () {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')

    const {usersDispatch, users} = useContext(usersContext)

    const countUsers = useMemo(() => users.length+1, [users])

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            id: countUsers, 
            username: userName, 
            email: email
        }
        usersDispatch({type: "ADD_USER", payload: userData})
        setUserName('')
        setEmail('')
    }

    return (<>
        <h3>Add Record</h3>

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">User Name</label><br/>            
            <input 
                type="text"
                id="username"
                onChange={e=>setUserName(e.target.value)}
                value={userName}
            />

            <br/>
            <label htmlFor="email">Email</label><br/>
            <input 
                type="text"
                id="email"
                onChange={e=>setEmail(e.target.value)}
                value={email}            
            />
            <br/>
            
            <input 
                type="submit"
                value="Submit"
            />
        </form>
    </>)
}