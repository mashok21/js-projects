import {useContext} from "react"
import {AuthContext} from '../context/Auth.js'

export default function Dashboard(){

    const {user} = useContext(AuthContext)
    
    return(<>
    {user ? (<><h2>Dashboard Component</h2>
        <p>Welcome - {user.username}</p></>) : (<><p>loading...</p></>)}        
    </>)
}