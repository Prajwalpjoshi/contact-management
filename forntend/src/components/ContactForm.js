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

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });

    if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value) ? "" : "Invalid email format",
      });
    }

    if (name === "phone") {
      setErrors({
        ...errors,
        phone: validatePhone(value) ? "" : "Phone number must be 10 digits",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submitting
    if (!validateEmail(contact.email)) {
      setErrors({ ...errors, email: "Invalid email format" });
      return;
    }

    if (!validatePhone(contact.phone)) {
      setErrors({ ...errors, phone: "Phone number must be 10 digits" });
      return;
    }

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
      setErrors({
        email: "",
        phone: "",
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
              error={!!errors[field]}
              helperText={errors[field]}
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
