import React, { useState } from "react";
import API from "../api";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button
} from "@mui/material";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/customer/forgot-password", {email});
      setMessage(res.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Server error"
      );
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
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" mb={3}>
            Forgot Password
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              type="submit"
            >
              Send Reset Link
            </Button>
          </form>

          {message && (
            <Typography sx={{ mt: 2, color: "green" }}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ForgotPassword;