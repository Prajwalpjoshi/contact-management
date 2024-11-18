import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const EditContactDialog = ({ open, handleClose, contact, refreshContacts }) => {
  const [updatedContact, setUpdatedContact] = useState(contact);

  const handleChange = (e) => {
    setUpdatedContact({ ...updatedContact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/contacts/${updatedContact._id}`,
        updatedContact
      );
      refreshContacts();
      handleClose();
    } catch (err) {
      console.error("Error updating contact:", err.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        {["firstName", "lastName", "email", "phone", "company", "jobTitle"].map(
          (field) => (
            <TextField
              key={field}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={updatedContact[field]}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditContactDialog;
