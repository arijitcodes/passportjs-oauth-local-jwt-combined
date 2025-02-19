import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import {
  Google as GoogleIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("password123");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/profile");
  };

  const handleOAuthLogin = (provider) => {
    const baseUrl = process.env.REACT_APP_BASE_API_URL;
    window.location.href = `${baseUrl}/auth/${provider}?client_type=web`;
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        <Box mt={2}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#DB4437", color: "#FFFFFF" }}
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => handleOAuthLogin("google")}
          >
            Login with Google
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#333333", color: "#FFFFFF", mt: 1 }}
            fullWidth
            startIcon={<GitHubIcon />}
            onClick={() => handleOAuthLogin("github")}
          >
            Login with GitHub
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
