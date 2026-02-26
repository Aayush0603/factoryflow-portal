import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/customer/signup", form);

      alert("Account created successfully 🎉");
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <br /><br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <br /><br />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;