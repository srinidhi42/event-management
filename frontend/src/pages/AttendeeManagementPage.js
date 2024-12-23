import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { fetchAttendees, createAttendee, deleteAttendee } from "../services/apiService" // Import from apiService

const AttendeeManagementPage = () => {
  const [attendees, setAttendees] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchAttendeesData();
  }, []);

  const fetchAttendeesData = async () => {
    try {
      const data = await fetchAttendees(); // Fetch attendees using API service
      setAttendees(data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAttendee(formData); // Create attendee using API service
      fetchAttendeesData(); // Refresh attendees
      handleClose();
    } catch (error) {
      console.error("Error adding attendee:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAttendee(id); // Delete attendee using API service
      fetchAttendeesData(); // Refresh attendees
    } catch (error) {
      console.error("Error deleting attendee:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Attendee Management</h1>
      <Button variant="primary" onClick={handleShow}>
        Add Attendee
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr key={attendee._id}>
              <td>{attendee.name}</td>
              <td>{attendee.email}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(attendee._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Attendee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter attendee name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter attendee email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AttendeeManagementPage;
