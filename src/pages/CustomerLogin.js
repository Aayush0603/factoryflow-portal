import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { GoogleLogin } from "@react-oauth/google";

function CustomerLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  /* =========================
     NORMAL LOGIN
  ========================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/customer/login", form);

      localStorage.setItem("customerToken", res.data.token);
      localStorage.setItem(
        "customer",
        JSON.stringify(res.data.customer)
      );

      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }

    setLoading(false);
  };

  /* =========================
     GOOGLE LOGIN
  ========================= */
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await API.post("/customer/google-login", {
        token: credentialResponse.credential  // ✅ FIXED HERE
      });

      localStorage.setItem("customerToken", res.data.token);
      localStorage.setItem(
        "customer",
        JSON.stringify(res.data.customer)
      );

      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed");
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
            Sign in to your account
          </Typography>

          {/* ================= NORMAL LOGIN ================= */}
          <form onSubmit={handleLogin}>
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
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* ================= DIVIDER ================= */}
          <Divider sx={{ my: 3 }}>OR</Divider>

          {/* ================= GOOGLE LOGIN ================= */}
          <Box display="flex" justifyContent="center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Google Login Failed")}
            />
          </Box>

          {/* ================= SIGNUP LINK ================= */}
          <Typography
            sx={{ textAlign: "center", mt: 3, fontSize: "0.9rem" }}
          >
            Don't have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CustomerLogin;