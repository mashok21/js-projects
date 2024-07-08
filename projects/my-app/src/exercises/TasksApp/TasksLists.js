import { useContext, useState } from "react"
import tasksContext from "./TasksContext"
import TasksItems from './TasksItems'

export default function TasksLists () {
    
    const {tasks} = useContext(tasksContext)
    const originalList=["All", "Pending", "Completed"]

    const [currentStatus, setCurrentStatus] = useState('All')
    const [display, setDisplay] = useState(originalList)
    
    return (<>
        
        
        <h3> Tasks Lists </h3>

        {display.map((item, index) => {
                return (<>            
                    <input 
                        type="radio"
                        value={item}
                        checked={currentStatus === item}
                        onChange={() =>setCurrentStatus(item)}
                    />
                    <label>{item}</label>                    
                </>)})}
        
        <ul>
        
        {currentStatus === "All" && tasks.map((task) => {
            return (
                <TasksItems
                    key={task.id}
                    {...task}
                                    />
            )
        })} 
        
        {currentStatus === "Pending" && tasks.filter(task=> task.status === "Pending").map((task) => {
            return (
                <TasksItems
                    key={task.id}
                    {...task}
                />
            )
        })} 
        
        {currentStatus === "Completed" && tasks.filter(task=> task.status === "Completed").map((task) => {
            return (
                <TasksItems
                    key={task.id}
                    {...task}
                />
            )
        })}
        
        </ul>



    </>)
}