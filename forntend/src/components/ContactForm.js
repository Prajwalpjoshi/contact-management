import React, { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import "./Contacts.css";

const ContactForm = ({ refreshContacts }) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/contacts", contact);
      refreshContacts();
      setContact({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Paper elevation={3} className="contact-form-container">
      <Typography variant="h6" gutterBottom>
        Add New Contact
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="contact-form">
        {["firstName", "lastName", "email", "phone", "company", "jobTitle"].map(
          (field) => (
            <TextField
              key={field}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={contact[field]}
              onChange={handleChange}
              fullWidth
              required
            />
          )
        )}
        <Box className="contact-form-button">
          <Button type="submit" variant="contained">
            Add Contact
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ContactForm;
