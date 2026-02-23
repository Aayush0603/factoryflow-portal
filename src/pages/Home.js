import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div>

      {/* Hero Section */}
      <div
  style={{
    background: "linear-gradient(135deg, #1976d2, #125ea9)",
    color: "white",
    padding: "60px 20px",
    textAlign: "center",
  }}
>
  <h1
    style={{
      fontSize: "clamp(26px, 5vw, 40px)",
      marginBottom: "20px",
    }}
  >
    Quality PVC Fittings Manufacturer
  </h1>

  <p
    style={{
      fontSize: "clamp(14px, 3vw, 18px)",
      marginBottom: "30px",
    }}
  >
    Trusted by dealers across India for premium quality products.
  </p>

  <button
    className="cta-button"
    onClick={() => navigate("/products")}
  >
    View Products
  </button>
</div>

      {/* About Section */}
      <div className="container">
        <h2 className="page-title">About Us</h2>
        <p>
          We manufacture high-quality PVC pipe fittings with strict quality
          control and reliable supply chain management.
        </p>
      </div>

    </div>
  );
}

export default Home;