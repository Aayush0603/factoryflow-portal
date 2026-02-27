import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button
} from "@mui/material";
import API from "../customerApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();   // ✅ VERY IMPORTANT
    setLoading(true);

    try {
      const res = await API.post("/customer/forgot-password", {
        email
      });

      alert(res.data.message || "Reset link sent!");
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
        "Something went wrong"
      );
    }

    setLoading(false);
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
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Forgot Password
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ForgotPassword;