import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

const DeleteConfirmDialog = ({
  open,
  handleClose,
  contactId,
  refreshContacts,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${contactId}`);
      refreshContacts();
      handleClose();
    } catch (err) {
      console.error("Error deleting contact:", err.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this contact?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
