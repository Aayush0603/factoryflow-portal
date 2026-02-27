import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Inquiry from "./pages/Inquiry";
import DealerLogin from "./pages/DealerLogin";
import DealerDashboard from "./pages/DealerDashboard";
import Home from "./pages/Home";
import TrackInquiry from "./pages/TrackInquiry";

// ✅ NEW IMPORTS
import Signup from "./pages/Signup";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerProtectedRoute from "./components/CustomerProtectedRoute";
import AccountPage from "./pages/AccountPage"; // create this file
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/inquiry/:id" element={<Inquiry />} />
        <Route path="/dealer-login" element={<DealerLogin />} />
        <Route path="/dealer-dashboard" element={<DealerDashboard />} />
        <Route path="/track-inquiry" element={<TrackInquiry />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* ===== Customer Auth Routes ===== */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<CustomerLogin />} />

        <Route
          path="/account"
          element={
            <CustomerProtectedRoute>
              <AccountPage />
            </CustomerProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;