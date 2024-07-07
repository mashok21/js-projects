import {useState} from "react"
import TaskContainer from "./TaskContainer";

export default function App (){

    const [selectedStatus, setSelectedStatus] = useState('');

    const [tasks, setTasks] = useState([
        {id: 1, title: 'get the website live', completed: true },
        {id: 2, title: 'work on user validation', completed: false },
        {id: 3, title: 'Automate the deployment process', completed: false }
    ])
    
    const handleSelect = (task) => {
        const updatedTasks = tasks.map(ele => ele.id === task.id ? ({...ele, completed: !ele.completed}) : ele)
        setTasks(updatedTasks)
    }

    return (<>
        <h2>Listing Tasks</h2>
        <TaskContainer tasks={tasks} selectedStatus={selectedStatus} handleSelect={handleSelect} />
        
    </>)
}