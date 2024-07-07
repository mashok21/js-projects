import { useState } from "react";

export default function MarkAllAsComplete() {
  const originalTasks = [
    { id: 1, title: "get the website live", completed: true },
    { id: 2, title: "work on user validation", completed: false },
    { id: 3, title: "Automate the deployment process", completed: false },
  ];

  const [tasks, setTasks] = useState(originalTasks);

  const handleAll = () => {
    const allCompleted = tasks.every((task) => task.completed);
    if (allCompleted) {
      setTasks(originalTasks);
    } else {
      setTasks(tasks.map(task => ({ ...task, completed: true })));
    }
  };

  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={tasks.every((task) => task.completed)}
                onChange={handleAll}
              />
            </th>
            <th> Title </th>
            <th> Status </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <input type="checkbox" checked={task.completed} readOnly />
              </td>
              <td>{task.title}</td>
              <td>{task.completed ? "completed" : "pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
