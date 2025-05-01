import React from "react";
import "./TaskList.css";

function TaskList({ view, tasks, toggleTask, deleteTask }) {
  const filteredTasks = tasks.filter((task) => {
    if (view === "completed") {
      return task.completed;}
    if (view === "uncompleted") { 
      return !task.completed; }
    return true; 
  });


  if (!filteredTasks || filteredTasks.length === 0) {
    return <div className="task-list">
      <p className="no-tasks-message">There are no notes to be displayed...</p>
    </div>
  }
  
  

  return (
    <div className="">
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <li key={task.id} className="task-item">
          <span
            onClick={() => toggleTask(task.id)}
            style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer" }}
          >
            {task.text}
          </span>
          <button className="delete-button" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default TaskList;
