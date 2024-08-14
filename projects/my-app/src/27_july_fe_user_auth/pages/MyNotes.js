import { useEffect, useReducer } from "react"
import axios from "../config/axios"
import NotesContext from '../context/NotesContext'
import NotesList from "./NotesList"
import NotesForm from "./NotesForm"

const notesReducer = (state, action) => {
    switch(action.type){
        case 'SET_NOTES': {
            return {...state, data: action.payload}
        }
        case 'REMOVE_NOTE': {
            return {...state, data: state.data.filter(ele => ele._id !== action.payload)}
        }
        case 'CREATE_NOTE': {
            return {...state, data: [...state.data, action.payload]}
        }
        case 'EDIT_ID': {
            return {...state, editId: action.payload}
        }
        case 'UPDATE_NOTE': {
            return {...state, editId: null, data: state.data.map(note => {
                if (note._id === action.payload._id){
                    return {...action.payload}
                } else {
                    return {...note}
                }
            })}
        }
        default: 
            throw new Error("This is not a valid action")
    }
}

export default function MyNotes () {
    
    const [notes, notesDispatch] = useReducer(notesReducer, {data: [], editId: null, })

    useEffect(() => {
        (async()=>{
            try{
                const response = await axios.get('/api/notes', {headers : {'Authorization' : localStorage.getItem('token')}})
                console.log(response.data)
                notesDispatch({type: "SET_NOTES", payload: response.data})
            } catch (err){
                console.log(err)
            }
        })()
    },[])

    return (
        <NotesContext.Provider value={{notes, notesDispatch}}>    
            <div>
                <h2> My Notes</h2>
                <NotesList />
                <NotesForm />                
            </div>
        </NotesContext.Provider>       
    )
}