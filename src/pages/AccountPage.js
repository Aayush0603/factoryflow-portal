import React, { useEffect, useState } from "react";
import API from "../api";
import {
  Box,
  Card,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

function AccountPage() {
  const [inquiries, setInquiries] = useState([]);
  const customer = JSON.parse(localStorage.getItem("customer"));

  useEffect(() => {
    fetchMyInquiries();
  }, []);

  const fetchMyInquiries = async () => {
    try {
      const res = await API.get("/public/my-inquiries");
      setInquiries(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={4}>
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          My Account
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography><b>Name:</b> {customer?.name}</Typography>
        <Typography><b>Email:</b> {customer?.email}</Typography>
      </Card>

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          My Inquiries
        </Typography>

        {inquiries.length === 0 && (
          <Typography>No inquiries yet.</Typography>
        )}

        <List>
          {inquiries.map((inq) => (
            <ListItem key={inq._id} divider>
              <ListItemText
                primary={inq.product?.name}
                secondary={`Status: ${inq.status} | Qty: ${inq.quantity}`}
              />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}

export default AccountPage;