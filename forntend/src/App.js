import React, { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactsTable from "./components/ContactsTable";
import { Container } from "@mui/material";

const App = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshContacts = () => setRefreshFlag(!refreshFlag);

  return (
    <Container>
      <h1>Contact Management</h1>
      <ContactForm refreshContacts={refreshContacts} />
      <ContactsTable refreshFlag={refreshFlag} />
    </Container>
  );
};

export default App;
