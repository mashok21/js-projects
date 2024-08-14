import {useState, useContext, useEffect} from "react"
import axios from "../config/axios"
import NotesContext from '../context/NotesContext'


export default function NotesForm () {
    
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const {notes, notesDispatch} = useContext(NotesContext)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {title, body}
        if (notes.editId){
            try{
                const response = await axios.put(`/api/notes/${notes.editId}`, formData, {headers : {'Authorization' : localStorage.getItem('token')}})
                console.log(response.data)
                notesDispatch({type: "UPDATE_NOTE", payload: response.data})
                setTitle('')
                setBody('')
            }catch (err){
                console.log(err)
            }
        } else {
            try {
                console.log(formData)
                const response = await axios.post('/api/notes', formData, {headers : {'Authorization' : localStorage.getItem('token')}})
                console.log(response.data)
                notesDispatch({type: "CREATE_NOTE", payload: response.data})
                setTitle('')
                setBody('')
            } catch (err){
                console.log(err)
            }
        }        
    }

    useEffect (() => {
        if (notes.editId){
            const note = notes.data.find(note => note._id === notes.editId)
            setTitle(note.title)
            setBody(note.body)
        }

    }, [notes.editId])

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label><br />
            <input
                type="text"
                id="title"
                value={title}
                placeholder="enter title"
                onChange={e=>setTitle(e.target.value)}
            />
        <br />
        <label htmlFor="body">Body</label><br />
            <textarea
                id="body"
                value={body}
                placeholder="enter body"                
                onChange={e=>setBody(e.target.value)}
            >
            </textarea>
        <br />
        <input
            type="submit"
            value="Submit"
        />
        </form>
    )
}