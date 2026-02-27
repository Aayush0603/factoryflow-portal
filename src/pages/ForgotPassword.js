import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button
} from "@mui/material";
import API from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/customer/forgot-password", {
      email
    });

    alert(res.data.message);
  } catch (error) {
    alert(error.response?.data?.message || "Server error");
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)"
      }}
    >
      <Card sx={{ width: 400, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2}>
            Forgot Password
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              type="submit"
            >
              Send Reset Link
            </Button>
          </form>

          {message && (
            <Typography mt={2} textAlign="center">
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ForgotPassword;