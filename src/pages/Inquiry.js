import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function Inquiry() {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("customer"));

    if (customer) {
      setForm((prev) => ({
        ...prev,
        name: customer.name,
        email: customer.email,
      }));
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/inquiry", {
        ...form,
        product: id,
      });

      alert("Inquiry submitted successfully 🎉");

      if (!isLoggedIn) {
        setForm({
          name: "",
          email: "",
          phone: "",
          quantity: "",
          message: "",
        });
      }

    } catch (error) {
      alert("Error submitting inquiry");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px" }}>
      <h2>Send Inquiry</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          disabled={isLoggedIn}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />
        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          disabled={isLoggedIn}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        <br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />
        <br /><br />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />
        <br /><br />

        <button type="submit">
          Submit Inquiry
        </button>
      </form>
    </div>
  );
}

export default Inquiry;