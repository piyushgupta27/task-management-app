import axios from "axios";

// API endpoint for login
const BASE_API_URL = 'http://localhost:8000/api/'; // Replace with your actual login API
const LOGIN_API_URL = BASE_API_URL + 'token/'; // Replace with your actual login API
const API_URL_VERSION = 'v1/'
const FETCH_TASKS_API_URL = BASE_API_URL + API_URL_VERSION + 'tasks/'

// Function to login and fetch the token
export const login = async (username, password) => {
  try {
    const response = await axios.post(LOGIN_API_URL, {
      username,
      password
    });

    // Assuming the token is returned in response.data.token
    const access_token = response.data.access;
    const refresh_token = response.data.access;

    // Store the token in localStorage for later use
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    console.log('Login successful! Token stored.');
    return (access_token, refresh_token);
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Set up Axios instance (API client) to include JWT token in all requests
const apiClient = axios.create({
  baseURL: BASE_API_URL + API_URL_VERSION, // Base URL for your API
});

// Add the Authorization header for each request using an Axios request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    // If a token exists, add it to the Authorization header
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to fetch tasks using the API client with the JWT token
export const fetchTasks = async () => {
  try {
    const response = await apiClient.get(FETCH_TASKS_API_URL);
    return response.data
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export default apiClient;
