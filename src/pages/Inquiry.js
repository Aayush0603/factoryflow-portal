import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import "../index.css";

function Inquiry() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/inquiry", {
        ...formData,
        product: id,
      });

      alert("Inquiry submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        quantity: "",
        message: "",
      });
    } catch (error) {
      alert("Error submitting inquiry");
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">Send Inquiry</div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-input"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <textarea
            className="form-input"
            name="message"
            placeholder="Message"
            rows="4"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="primary-button">
          Submit Inquiry
        </button>
      </form>
    </div>
  );
}

export default Inquiry;