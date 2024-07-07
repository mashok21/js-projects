import {useState} from "react"

const originalTasks = [
    { id: 1, title: 'get the website live', completed: true },
    { id: 2, title: 'work on user validation', completed: false },
    { id: 3, title: 'Automate the deployment process', completed: false }
]

export default function MarkAllComplete () {    
    const [tasks, setTasks] = useState(originalTasks)
    const handleToggle = () => {
        const allCompleted = tasks.every(task => task.completed)
        if (!allCompleted){
            const newArr = tasks.map(task => task.completed ? task : {...task, completed: !allCompleted})
            setTasks(newArr)
        } else {
            setTasks(originalTasks)
        }
    }

    return (
        <table border="1">
            <thead>
                <tr>
                    <th><input type="checkbox" checked={tasks.every(task => task.completed)} onClick={handleToggle}/></th>
                    <th>Title</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => {
                    return (
                        <tr key={task.id}>
                        <td><input type="checkbox" checked={tasks.every(task => task.completed)} readOnly/></td>
                        <td>{task.title}</td>
                        <td>{task.completed ? "completed" : "pending"}</td>
                </tr>
                    )
                })}                
            </tbody>
        </table>
    )

}

    