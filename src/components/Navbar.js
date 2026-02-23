import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate("/")}>
          FactoryFlow
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/products" className="nav-link">
            Products
          </Link>

          <Link to="/dealer-login" className="nav-link">
            Dealer Login
          </Link>

          <Link to="/track-inquiry" className="nav-link">
            Track Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;