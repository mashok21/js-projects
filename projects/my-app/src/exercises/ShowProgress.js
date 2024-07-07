import {useState, useMemo} from "react"

export default function ShowProgress (){

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

    const totalCount = useMemo(() => tasks.length, [tasks])
    const trueCount = useMemo(() => tasks.filter(task => task.completed).length, [tasks])
    const percent = useMemo(() => trueCount/totalCount, [totalCount, trueCount])

    return (<>
        <h2>Listing Tasks</h2>
        <progress id="myProgress" value={percent} max="1"></progress>
        <ul>
            {tasks.map((task) => {
                return <li 
                            key={task.id}
                            style={{textDecoration: task.completed ? 'line-through' : 'none'}} 
                        >
                                <input 
                                    type="checkbox"
                                    value={selectedStatus}
                                    name="selectedStatus"
                                    checked={task.completed}
                                    onChange={() => handleSelect(task)}
                                />  
                    {task.title}</li>
            })}
        </ul>
    </>)
}