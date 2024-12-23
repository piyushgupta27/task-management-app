import axios from "axios";

const BASE_API_URL = "http://localhost:8000/api/";
const LOGIN_API_URL = BASE_API_URL + "token/";
const API_URL_VERSION = "v1/";
const TASKS_API_URL = BASE_API_URL + API_URL_VERSION + "tasks/";

// Function to login and fetch the token
export const login = async (username, password) => {
  try {
    const response = await axios.post(LOGIN_API_URL, {
      username,
      password,
    });

    const access_token = response.data.access;
    const refresh_token = response.data.access;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    console.log("Login successful! Token stored.");
    return access_token, refresh_token;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const apiClient = axios.create({
  baseURL: BASE_API_URL + API_URL_VERSION,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to create tasks
export const createTask = async (title, description) => {
  try {
    const response = await apiClient.post(TASKS_API_URL, { title, description });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error
  }
};

// Function to fetch tasks
export const fetchTasks = async () => {
  try {
    const response = await apiClient.get(TASKS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error
  }
};

// Function to update a task
export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await apiClient.put(`${TASKS_API_URL}${taskId}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error
  }
};

// Function to delete a task
export const deleteTask = async (taskId) => {
  try {
    await apiClient.delete(`${TASKS_API_URL}${taskId}/`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error
  }
};

// Function to mark a task completed
export const markTaskCompleted = async (taskId) => {
  try {
    const response = await apiClient.patch(
      `${TASKS_API_URL}${taskId}/mark-completed/`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error
  }
};

export default apiClient;
