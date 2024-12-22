import React from "react";
import { login } from "../services/api/apiClient";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const HomePage = () => {
  const username = "john_doe";
  const password = "securepassword";

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      console.log("Login successful:", response);
    } catch (err) {
      console.error("Error logging in user:", err);
    }
  };

  return (
    <Container>
      <Box>
        <Typography>Task Management App</Typography>
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
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
