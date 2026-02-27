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

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/customer/change-password", {
        currentPassword,
        newPassword
      });

      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error");
    }
  };

  return (
    <Box p={4}>
      <Card sx={{ maxWidth: 400, margin: "auto" }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Change Password
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              margin="normal"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <TextField
              fullWidth
              label="New Password"
              type="password"
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              type="submit"
            >
              Update Password
            </Button>
          </form>

          {message && (
            <Typography mt={2}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ChangePassword;