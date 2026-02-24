import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "../index.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePayment = async () => {
    try {
      // Create Razorpay order from backend
      const res = await API.post("/create-order", {
        inquiryId: null, // optional for now
        amount: 500, // advance amount
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // safer way
        amount: res.data.amount,
        currency: "INR",
        order_id: res.data.id,
        name: "FactoryFlow",
        description: `Advance Payment for ${product.name}`,
        handler: async function (response) {
          await API.post("/verify-payment", response);
          alert("✅ Payment Successful!");
        },
        theme: {
          color: "#1976d2",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error", error);
      alert("Payment failed");
    }
  };

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="product-details-container">

        <div className="product-details-image">
          <img
            src={
              product.image ||
              "https://via.placeholder.com/500x400?text=No+Image"
            }
            alt={product.name}
          />
        </div>

        <div className="product-details-info">
          <div className="product-details-title">
            {product.name}
          </div>

          <div className="product-details-meta">
            Category: {product.category}
          </div>

          <div className="product-details-price">
            ₹{product.publicPrice}
          </div>

          <div className="product-details-meta">
            Available Stock: {product.availableStock}
          </div>

          <div className="product-details-description">
            {product.description || "No description available."}
          </div>

          <button
            className="cta-button"
            onClick={() => navigate(`/inquiry/${product._id}`)}
          >
            Request Quote
          </button>

          <button
            className="cta-button"
            style={{ marginTop: "15px", backgroundColor: "#28a745" }}
            onClick={handlePayment}
          >
            Pay ₹500 Advance
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;