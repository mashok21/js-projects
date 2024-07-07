import axios from "axios"
import {useState, useEffect} from "react"

export default function SingleUser () {
    const url = `https://jsonplaceholder.typicode.com/users/`
    const [user, setUser] = useState([])

    useEffect(() => {
        const id = Number(prompt("Enter the Id"))
        axios.get(url+id)
        .then(response => setUser(response.data))
        .catch(err => console.log(err))
    
    },[])    
    
    return (
        <div>
            <p>{user.name} | {user.email} | {user.address.city} </p>
        </div>
    )
}
