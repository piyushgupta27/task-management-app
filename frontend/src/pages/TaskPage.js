import React, { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { fetchTasks } from "../services/api/apiClient";
import NotFoundPage from "./NotFoundPage";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch tasks on component mount
    const getTasks = async () => {
      try {
        const taskData = await fetchTasks();
        setTasks(taskData); // Save tasks in state
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false); // End loading state
      }
    };

    getTasks();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      {(tasks === undefined || tasks.length === 0) ? <NotFoundPage /> : <TaskList tasks={tasks} />}
    </div>
  );
};

export default TaskPage;
