import {useState, useContext} from "react"
import tasksContext from "./TasksContext"


export default function TasksForm () {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState('')
    const {tasksDispatch} = useContext(tasksContext)


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            id: Number(new Date()),
            title, 
            description,
            status: "Pending"
        }
        tasksDispatch({type: "ADD_TASKS", payload: formData})
        setTitle('')
        setDescription('')
    }

    return (<>
        <h3>Task Form </h3>

        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Task Title</label><br/>
            <input 
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /><br/>

            <label htmlFor="description">Description</label><br/>
            <textarea 
                type="text"
                id="description"
                value={description}
                onChange={e=>setDescription(e.target.value)}
            /><br/>

            <input 
                type="submit"
                value="Submit"
            />

        </form>
    </>)
}