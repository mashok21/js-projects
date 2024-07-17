import {useState, useContext} from "react"
import { UserContext } from "./UserContext"

export default function Login () {

    const {dispatch} = useContext(UserContext)
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState("user")

    const handleLogin = (e) => {
        e.preventDefault()
        const isAdmin = role === 'admin'
        dispatch({type: "SET_CURRENT_USER", payload: userName})
        dispatch({type: "SET_IS_ADMIN", payload: isAdmin})
    }

    return (<>
        <h2>Login Details</h2>
        <form onSubmit={handleLogin}>
            <label>Name</label><br/>
            <input
                type="text"
                value={userName}
                onChange={e=>setUserName(e.target.value)}
            /> <br />
            <input 
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={e=> setRole(e.target.value)}
            />
            <label>Admin</label>
            <input 
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={e=> setRole(e.target.value)}
            />
            <label>User</label>
            <br />
            <input 
                type="submit"
                value="Submit"
            />
        </form>

    </>)
}