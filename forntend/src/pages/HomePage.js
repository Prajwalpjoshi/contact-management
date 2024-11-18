import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ContactForm from "../components/ContactForm";
import ContactsTable from "../components/ContactsTable";

const HomePage = () => {
  return (
    <Container>
      <Box mt={4} mb={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Management System
        </Typography>
      </Box>
      <Box mb={4}>
        <ContactForm />
      </Box>
      <ContactsTable />
    </Container>
  );
};

export default HomePage;
