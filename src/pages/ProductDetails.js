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

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="product-details-container">

        {/* Left - Image */}
        <div className="product-details-image">
          <img
            src={
              product.image ||
              "https://via.placeholder.com/500x400?text=No+Image"
            }
            alt={product.name}
          />
        </div>

        {/* Right - Info */}
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
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;