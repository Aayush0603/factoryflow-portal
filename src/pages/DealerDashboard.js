import API from "../api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DealerDashboard() {
  const navigate = useNavigate();
  const [dealer, setDealer] = useState(null);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("dealerToken");
    const dealerData = localStorage.getItem("dealerData");

    if (!token || !dealerData) {
      navigate("/dealer-login");
      return;
    }

    const parsedDealer = JSON.parse(dealerData);
    setDealer(parsedDealer);

    const fetchInquiries = async () => {
      try {
        const res = await API.get(
          `/dealer-inquiries/${parsedDealer.id}`
        );
        setInquiries(res.data);
      } catch (error) {
        console.error("Error fetching dealer inquiries", error);
      }
    };

    fetchInquiries();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("dealerToken");
    localStorage.removeItem("dealerData");
    navigate("/dealer-login");
  };

  return (
    <div className="container">
      <h2 className="page-title">Dealer Dashboard</h2>

      {dealer && (
        <p>
          Welcome <strong>{dealer.companyName}</strong>
        </p>
      )}

      <button className="primary-button" onClick={handleLogout}>
        Logout
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h3>Your Inquiries</h3>

      {inquiries.length === 0 ? (
        <p>No inquiries yet.</p>
      ) : (
        inquiries.map((inq) => (
          <div
            key={inq._id}
            style={{
              background: "white",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <p><strong>Inquiry ID:</strong> {inq._id}</p>
            <p><strong>Product:</strong> {inq.product?.name}</p>
            <p><strong>Quantity:</strong> {inq.quantity}</p>
            <p><strong>Status:</strong> {inq.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DealerDashboard;