import React, { useState } from "react";
import { login } from "../services/api/apiClient";
import { Container, Typography, TextField, Button, Box, Alert } from "@mui/material";

const HomePage = () => {
  const username = "john_doe";
  const password = "securepassword";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(username, password);
      console.log("Login successful:", response);
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
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          variant="outlined"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
