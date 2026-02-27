import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("customerToken");
  const customer = JSON.parse(localStorage.getItem("customer") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customer");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#111827",
        color: "white"
      }}
    >
      {/* Left Side */}
      <div>
        <Link to="/" style={linkStyle}>FactoryFlow</Link>
        <Link to="/products" style={linkStyle}>Products</Link>
        <Link to="/track-inquiry" style={linkStyle}>Track Inquiry</Link>
      </div>

      {/* Right Side */}
<div style={{ display: "flex", alignItems: "center" }}>
  {!token ? (
    <>
      <Link to="/login" style={linkStyle}>Login</Link>
      <Link to="/signup" style={linkStyle}>Signup</Link>
    </>
  ) : (
    <>
      <span style={{ marginRight: "15px" }}>
        Hi, <strong>{customer?.name}</strong>
      </span>

      <Link to="/account" style={linkStyle}>
        My Account
      </Link>

      <Link to="/change-password" style={linkStyle}>
        Change Password
      </Link>

      <button
        onClick={handleLogout}
        style={{
          marginLeft: "10px",
          padding: "6px 12px",
          background: "#ef4444",
          border: "none",
          color: "white",
          cursor: "pointer",
          borderRadius: "6px"
        }}
      >
        Logout
      </button>
    </>
  )}
</div>
    </div>
  );
}

const linkStyle = {
  marginRight: "20px",
  color: "white",
  textDecoration: "none",
  fontWeight: 500
};

export default Navbar;