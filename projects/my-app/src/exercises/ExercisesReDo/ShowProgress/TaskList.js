export default function TaskList (props) {
    const {tasks, selectedStatus, handleSelect} = props
    return (
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
    )
}