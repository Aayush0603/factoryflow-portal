import React from "react";

function AccountPage() {
  const user = JSON.parse(localStorage.getItem("customerUser"));

  return (
    <div style={{ padding: 30 }}>
      <h2>My Account</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}

export default AccountPage;