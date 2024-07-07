import {useState} from "react"
import { useContext } from "react"
import usersContext from "./UsersContext"

export default function UsersItems () {

    const {user, usersDispatch} = useContext(usersContext)
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState(user.username)
    const [userEmail, setUserEmail] = useState(user.email)

    const handleRemove = () => {
        usersDispatch({type: "SET_REMOVE", payload: user.id})
    }

    const handleEdit = () => {
        setIsEditing(true)  
    }

    const handleCancel = () => {
        setIsEditing(false)
        setUserEmail(user.email)
        setUserName(user.username)  
        
    }

    const handleSave = () => {
        setIsEditing(false)
        usersDispatch({type: "EDIT_USER", payload: {...user, userName, userEmail}})
    }

    return (
        <tr>
            <td>{user.id}</td>
            
            <td>
            {isEditing ? (
                <input
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                /> ) : userName }
            </td>

            <td>
            {isEditing ? (
                <input
                    type="text"
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                /> ) : userEmail }
            </td>
            
            <td>
                <button onClick={handleRemove}>remove</button>
            </td>
            
            <td>
                <button onClick={handleEdit}>edit</button>
                <button onClick={handleCancel}>cancel</button>
                <button onClick={handleSave}>save</button>
            </td>
        </tr>
    )
}