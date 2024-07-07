import axios from "axios"
import {useState, useEffect} from "react"

export default function UserById () {
    
    const [userInput, setUserInput] = useState('')
    const [user, setUser] = useState([])
    const [message, setMessage] = useState('')

    const url = `https://jsonplaceholder.typicode.com/users/`
    const id = Number(userInput)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(url+id)
            .then(response => {
                setUser(response.data)
                setMessage("")
                })
            .catch(err => {
                setUser(null)
                console.log(err)
                setMessage("record not found")
            })
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">Enter Id </label>
                <input 
                    type="text"
                    value={userInput}
                    id="id"
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <input 
                    type="submit"
                    value="Submit"
                />
            </form>
            {user ? (
            
                <p>{user.name} {user.email}</p>) : (
                
                    <h3>{message}</h3>
            )}
            
            
        </>
    )
}