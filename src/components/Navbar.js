import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("customerToken");
  const user = JSON.parse(localStorage.getItem("customerUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerUser");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
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
      <div>
        {!token ? (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Signup</Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: "10px" }}>
              Hi, {user?.name}
            </span>

            <Link to="/account" style={linkStyle}>
              My Account
            </Link>

            <button
              onClick={handleLogout}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                background: "#ef4444",
                border: "none",
                color: "white",
                cursor: "pointer",
                borderRadius: "4px"
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
  marginRight: "15px",
  color: "white",
  textDecoration: "none"
};

export default Navbar;