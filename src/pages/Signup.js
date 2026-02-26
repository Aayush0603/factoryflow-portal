import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api";

function CustomerSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/customer/register", form);

      alert("Account created successfully 🎉");
      navigate("/login");
    } catch (error) {
      alert("Signup failed");
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
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              textAlign: "center",
              mb: 1
            }}
          >
            FactoryFlow
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "#64748b",
              mb: 3
            }}
          >
            Create your account
          </Typography>

          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, py: 1.2 }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </form>

          <Typography
            sx={{ textAlign: "center", mt: 3, fontSize: "0.9rem" }}
          >
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/login")}
            >
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CustomerSignup;