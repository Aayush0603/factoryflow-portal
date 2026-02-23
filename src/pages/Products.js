import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../index.css";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">Our Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
              src={
                product.image ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={product.name}
              className="product-image"
            />

            <div className="product-name">{product.name}</div>

            <div>Category: {product.category}</div>

            <div className="product-price">
              ₹{product.publicPrice}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;