import { useContext, useState } from "react"
import tasksContext from "./TasksContext"

export default function TaskItems (props) {

    const {tasksDispatch} = useContext(tasksContext)
    const {id, title, description, status} = props

    const handleStatus = () => {
        tasksDispatch({type: "UPDATE_STATUS", payload: id})
    }
    
    return (<>
            <ul>
                <li><input type="checkbox" id="status" onChange={() => handleStatus(id)}/>{title} - {description} - {status}</li>
            </ul>
    </>)
}