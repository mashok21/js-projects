import {useContext} from "react"
import {AuthContext} from '../context/Auth.js'

export default function Profile(){
    const {user} = useContext(AuthContext)
    return(<>
        {user ?  (<>
        <h2>User Profile</h2>
        <p>{user.username}</p>
        <p>{'*'.repeat(user.password.length)}</p>
        </>) : (<><p>loading....</p></>) }        
        </>)
}