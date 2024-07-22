import {useState} from "react"
import axios from "axios"
const url = `http://localhost:3020/api/users/`

export default function UserDataS2S () {
    
    const [userInput, setUserInput] = useState('')
    const [serverResponse, setServerResponse] = useState(null)
    const [statusCode, setStatusCode] = useState(null);
    
    const handleSubmit = async () => {
        try{
            const response = await axios.get(`${url}${userInput}`)
            console.log(response)
            setServerResponse(response.data)
            setStatusCode(response.status)
            setUserInput('')
        } catch(err){
            console.log(err)
            setStatusCode(err.response.status);
            setServerResponse(null)
        }        
    }

    return (<>
        <label htmlFor="number">UserID</label>
        <input 
            type="text"
            id="number"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
        />        
        <br/>
        <button onClick={handleSubmit}>Submit</button>
        <br/><br/>
        {statusCode && (<div>Status Code: {statusCode}</div>)}
        <div>
            
            {serverResponse && (
                <>
                    <h2>{serverResponse.name}</h2>
                    <h2>{serverResponse.email}</h2>
                    <h2>{serverResponse.city}</h2>
                </>
            )}
            
        </div>
    </>)
}