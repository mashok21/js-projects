import {useState} from "react"

export default function DisplayCaps () {
    
    const [text, setText] = useState('')
    
    return (
        <form>
            <label htmlFor="text">Display Caps   </label><br/><br/>
            <textarea 
                type="text"
                id="text"
                value={text.toUpperCase()}
                onChange={e=>setText(e.target.value)}
            />
        </form>
    )
}