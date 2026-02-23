import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../index.css";

function DealerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/dealer-login", formData);

      localStorage.setItem("dealerToken", res.data.token);
      localStorage.setItem("dealerData", JSON.stringify(res.data.dealer));

      navigate("/dealer-dashboard");
    } catch (error) {
      alert("Invalid credentials or not approved");
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">Dealer Login</div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-input"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-input"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="primary-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default DealerLogin;