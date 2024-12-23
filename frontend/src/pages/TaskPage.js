import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Switch,
  Modal,
  TextField,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createTask,
  updateTask,
  fetchTasks,
  deleteTask,
  markTaskCompleted,
} from "../services/api/apiClient";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const taskData = await fetchTasks();
        setTasks(taskData);
      } catch (err) {
        setError("Failed to fetch tasks.");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setError(null);
    setSuccessMessage(null);
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskTitle(taskToEdit.title);
    setTaskDescription(taskToEdit.description);
    setEditingTask(taskToEdit);
    setOpenModal(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      setSuccessMessage("Task deleted successfully.");
      setSnackbarOpen(true);
    } catch (err) {
      setError("Failed to delete the task");
      setSnackbarOpen(true);
    }
  };

  const handleStatusChange = async (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task.completed) {
      try {
        await markTaskCompleted(taskId);
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        );
        setSuccessMessage("Task marked completed successfully.");
        setSnackbarOpen(true);
      } catch (err) {
        setError("Failed to mark the task completed");
        setSnackbarOpen(true);
      }
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setTaskTitle("");
    setTaskDescription("");
    setEditingTask(null);
  };

  const handleSaveTask = async () => {
    if (editingTask) {
      try {
        await updateTask(editingTask.id, {
          title: taskTitle,
          description: taskDescription,
        });
        setTasks(
          tasks.map((task) =>
            task.id === editingTask.id
              ? { ...task, title: taskTitle, description: taskDescription }
              : task
          )
        );
        setSuccessMessage("Task updated successfully.");
        setSnackbarOpen(true);
      } catch (err) {
        setError("Failed to update task");
        setSnackbarOpen(true);
      }
    } else {
      try {
        const newTask = await createTask(taskTitle, taskDescription);
        setTasks([...tasks, newTask]);
        setSuccessMessage("Task updated successfully.");
        setSnackbarOpen(true);
      } catch (err) {
        setError("Failed to create task");
        setSnackbarOpen(true);
      }
    }
    handleModalClose();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          padding: "16px",
        }}
      >
        <Typography variant="h4">Task List</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Add Task
        </Button>
      </Box>
      <Box>
        {tasks.map((task) => (
          <Card
            key={task.id}
            sx={{
              mb: 2,
              border: task.completed ? "1px solid green" : "1px solid red",
            }}
          >
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography>{task.description}</Typography>
              <Typography
                variant="body2"
                color={task.completed ? "green" : "red"}
              >
                {task.completed ? "Completed" : "Pending"}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(task.id)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(task.id)}
              >
                <DeleteIcon />
              </IconButton>
              <Switch
                checked={task.completed}
                onChange={() => handleStatusChange(task.id)}
                name="statusToggle"
                inputProps={{ "aria-label": "status toggle" }}
                disabled={task.completed}
              />
            </CardActions>
          </Card>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || successMessage}
        </Alert>
      </Snackbar>
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
