import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api/apiClient";
import { Container, Typography, TextField, Button, Box, Alert } from "@mui/material";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await login(username, password);
      console.log("Login successful:", response);
      setSuccess(true);
      setTimeout(() => {
        navigate("/tasks");
      }, 2000);
    } catch (err) {
      console.error("Error logging in user:", err);
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={4} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" gutterBottom>
          Task Management App
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && (
          <Alert severity="success">Login successful! Redirecting...</Alert>
        )}
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
