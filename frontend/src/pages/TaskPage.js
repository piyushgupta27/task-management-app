import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Switch,
  Modal,
  TextField,
} from "@mui/material";
import { fetchTasks } from "../services/api/apiClient";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);

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
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskTitle(taskToEdit.title);
    setTaskDescription(taskToEdit.description);
    setEditingTask(taskToEdit);
    setOpenModal(true);
  };

  const handleDelete = (taskId) => {
    console.log("Delete task:", taskId);
  };

  const handleStatusChange = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setTaskTitle("");
    setTaskDescription("");
    setEditingTask(null);
  };

  const handleSaveTask = () => {
    if (editingTask) {
      // Add edit task logic
    } else {
      // Add create new task logic
    }
    handleModalClose();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setOpenModal(true)}
      >
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
            <Box>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
              <Typography
                variant="body2"
                color={task.completed ? "green" : "red"}
              >
                {task.completed ? "Completed" : "Pending"}
              </Typography>
            </Box>
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
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={{ ...modalStyles }}>
          <Typography variant="h6">
            {editingTask ? "Edit Task" : "Add New Task"}
          </Typography>
          <TextField
            label="Task Title"
            fullWidth
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Task Description"
            fullWidth
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveTask}>
            Save
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: 4,
  boxShadow: 24,
  borderRadius: 2,
};

export default TaskPage;
