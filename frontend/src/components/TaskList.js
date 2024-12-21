import React from "react";

const TaskList = ({ tasks }) => (
    <ul>
        {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
        ))}
    </ul>
);

export default TaskList;
