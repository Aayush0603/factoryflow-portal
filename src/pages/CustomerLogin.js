import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function CustomerLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/customer/login", form);

      localStorage.setItem("customerToken", res.data.token);
      localStorage.setItem("customerUser", JSON.stringify(res.data.customer));

      navigate("/");

    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Customer Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default CustomerLogin;