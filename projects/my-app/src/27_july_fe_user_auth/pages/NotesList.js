import { useContext } from "react"
import NotesContext from "../context/NotesContext"
import axios from "../config/axios"

export default function NotesList (){

    const {notes, notesDispatch} = useContext(NotesContext)

    const handleRemove = async(id) => {
        const userInput = window.confirm("Are you sure?")
        if (userInput){
            try{
                const response = await axios.delete(`/api/notes/${id}`, {headers : {'Authorization': localStorage.getItem('token')}})
                console.log(response.data)
                notesDispatch({type: "REMOVE_NOTE", payload: response.data._id})
            } catch (err){
                console.log(err)
            }
        }
        
    }

    const handleEdit = (id) => {
        notesDispatch({type: 'EDIT_ID', payload: id})
    }

    return (<ul>
        {notes.data.map(note => {
            return <li key={note._id}> {note.title}<button onClick={()=>handleRemove(note._id)}>remove</button><button onClick={()=>handleEdit(note._id)}>edit</button></li>
        })}
    </ul>)

}