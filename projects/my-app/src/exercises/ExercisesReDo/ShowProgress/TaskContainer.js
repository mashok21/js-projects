import ProgressBar from "./ProgressBar"
import TaskList from "./TaskList"

export default function TaskContainer (props) {

    const {tasks, selectedStatus, handleSelect} = props
    
    return (<>
        <ProgressBar tasks={tasks}/>
        <TaskList tasks={tasks} selectedStatus={selectedStatus} handleSelect={handleSelect}/>
        </>)


}