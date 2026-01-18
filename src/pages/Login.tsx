import { Box, Button, Typography, Paper, Alert } from "@mui/material";
import { useState } from "react";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

const MOCK_USER = {
  username: "admin",
  password: "admin123",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    if (
      username === MOCK_USER.username &&
      password === MOCK_USER.password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      setError("");
      window.location.href = "/dashboard";
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <InputField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!error}
        />

        <Box mt={2}>
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
          />
        </Box>

        <PrimaryButton
            label="Login"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleLogin}
        />
      </Paper>
    </Box>
  );
};

export default Login;
