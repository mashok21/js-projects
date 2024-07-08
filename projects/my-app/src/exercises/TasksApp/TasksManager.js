import TasksForm from "./TasksForm";
import TasksLists from "./TasksLists";

export default function TasksManager () {

    return (<>
        <h2> Tasks App </h2>
        <TasksLists />
        <TasksForm />
        
    </>)
}