import {useReducer} from "react"
import TasksManager from "./TasksManager";
import tasksContext from './TasksContext'


const tasksReducer = (state, action) => {
    if (action.type === "ADD_TASKS"){
        return [...state, action.payload]
    } else if (action.type === "UPDATE_STATUS"){
        return state.map(item => {
            if (item.id === action.payload){
                if (item.status === "Pending"){
                    return {...item, status: "Completed"}
                } else if (item.status === "Completed"){
                    return {...item, status: "Pending"}
                }
            }
            return item
    })}}            

export default function App () {

    const [tasks, tasksDispatch] = useReducer(tasksReducer, [])
    
    return (
        <tasksContext.Provider value={{tasksDispatch, tasks}}>
        <TasksManager />
        </tasksContext.Provider>
    )
}