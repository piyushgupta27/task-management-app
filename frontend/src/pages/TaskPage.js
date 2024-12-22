import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Switch } from "@mui/material";
import { fetchTasks } from "../services/api/apiClient";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const taskData = await fetchTasks();
        setTasks(taskData);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
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

  const handleEdit = (taskId) => {
    console.log("Edit task:", taskId);
  };

  const handleDelete = (taskId) => {
    console.log("Delete task:", taskId);
  };

  const handleStatusChange = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Add Task
      </Button>
      <Box>
        {tasks.map((task) => (
          <Box
            key={task.id}
            display="flex"
            justifyContent="space-between"
            mb={2}
          >
            <Typography>{task.title}</Typography>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(task.id)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
              <Switch
                checked={task.completed}
                onChange={() => handleStatusChange(task.id)}
                name="statusToggle"
                inputProps={{ "aria-label": "status toggle" }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default TaskPage;
