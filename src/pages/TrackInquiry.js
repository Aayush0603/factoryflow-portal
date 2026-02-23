import React, { useState } from "react";
import API from "../api";
import "../index.css";

function TrackInquiry() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [inquiries, setInquiries] = useState([]);

  const sendOtp = async () => {
    await API.post("/send-otp", { email });
    setStep(2);
    alert("OTP sent to your email");
  };

  const verifyOtp = async () => {
    try {
      const res = await API.post("/verify-otp", { email, otp });
      setInquiries(res.data.inquiries);
      setStep(3);
    } catch {
      alert("Invalid or expired OTP");
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Track Your Inquiry</h2>

      {step === 1 && (
        <>
          <input
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />
          <button className="primary-button" onClick={sendOtp}>
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            className="form-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <br /><br />
          <button className="primary-button" onClick={verifyOtp}>
            Verify OTP
          </button>
        </>
      )}

      {step === 3 &&
        inquiries.map((inq) => (
          <div key={inq._id} style={{ marginBottom: "15px" }}>
            {inq.product?.name} - {inq.status}
          </div>
        ))}
    </div>
  );
}

export default TrackInquiry;