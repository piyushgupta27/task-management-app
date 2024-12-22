import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
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
          <Typography key={task.id}>{task.title}</Typography>
        ))}
      </Box>
    </Container>
  );
};

export default TaskPage;
