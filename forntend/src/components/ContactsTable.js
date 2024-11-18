import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import EditContactDialog from "./EditContactDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import "./Contacts.css";

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/contacts");
        setContacts(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchContacts();
  }, []);

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedContacts = () => {
    return [...contacts].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setEditDialogOpen(true);
  };

  const handleDelete = (contactId) => {
    setSelectedContact({ _id: contactId });
    setDeleteDialogOpen(true);
  };

  return (
    <Paper elevation={3} className="contacts-table-container">
      <Typography variant="h6" className="contacts-table-header">
        Contacts List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "firstName",
                "lastName",
                "email",
                "phone",
                "company",
                "jobTitle",
              ].map((head) => (
                <TableCell key={head}>
                  <TableSortLabel
                    active={orderBy === head}
                    direction={orderBy === head ? order : "asc"}
                    onClick={() => handleRequestSort(head)}
                  >
                    {head.charAt(0).toUpperCase() + head.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedContacts()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.jobTitle}</TableCell>
                  <TableCell className="table-actions">
                    <Button color="primary" onClick={() => handleEdit(contact)}>
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={() => handleDelete(contact._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={contacts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
      {selectedContact && (
        <EditContactDialog
          open={editDialogOpen}
          handleClose={() => setEditDialogOpen(false)}
          contact={selectedContact}
          refreshContacts={() => {
            axios
              .get("http://localhost:5000/contacts")
              .then((res) => setContacts(res.data));
          }}
        />
      )}
      {selectedContact && (
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          handleClose={() => setDeleteDialogOpen(false)}
          contactId={selectedContact._id}
          refreshContacts={() => {
            axios
              .get("http://localhost:5000/contacts")
              .then((res) => setContacts(res.data));
          }}
        />
      )}
    </Paper>
  );
};

export default ContactsTable;
