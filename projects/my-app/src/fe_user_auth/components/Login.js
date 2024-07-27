import { useState, useContext } from "react"
import users from '../users-data.json'
import { AuthContext } from "../context/Auth"

export default function Login(){
    
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')

    const {handleLogin} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username, 
            password
        }
        const user = users.find(ele => ele.username === formData.username && ele.password === formData.password)
        if (user){
            handleLogin(user)
            console.log("user authenticated")
            setErrors('')
        } else {
            setErrors("invalid credentials")
        }
    }
    
    return(<>
        <h2> Login Form </h2>
        {errors && <p className="errors">{errors}</p>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <input
                type="text"
                value={username}
                onChange={e=>setUserName(e.target.value)}
                placeholder="username"
            />
            </div>

            <div className="form-group">
            <input
                type="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder="password"
            />
            
            <div className="form-group">
            <input 
                type="submit"
                value="Submit"
            />
            </div>
            
            </div>
        </form>
    </>)
}