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

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.put("/customer/change-password", form);

      alert("Password changed successfully");
      setForm({ currentPassword: "", newPassword: "" });

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }

    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f172a, #1e293b)"
    }}>
      <Card sx={{ width: 400, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" mb={2}>
            Change Password
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              margin="normal"
              value={form.currentPassword}
              onChange={(e) =>
                setForm({ ...form, currentPassword: e.target.value })
              }
              required
            />

            <TextField
              fullWidth
              label="New Password"
              type="password"
              margin="normal"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              required
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ChangePassword;