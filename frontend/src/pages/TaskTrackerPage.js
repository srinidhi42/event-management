import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Badge, ProgressBar } from "react-bootstrap";
import { fetchTasks, fetchEvents, createTask, updateTaskStatus } from "../services/apiService"; // Import from apiService

const TaskTrackerPage = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    deadline: "",
    status: "Pending",
    eventId: "",
  });

  useEffect(() => {
    fetchTasksData();
    fetchEventsData();
  }, []);

  const fetchTasksData = async () => {
    try {
      const data = await fetchTasks(); // Fetch tasks using API service
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchEventsData = async () => {
    try {
      const data = await fetchEvents(); // Fetch events using API service
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
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
      await createTask(formData); // Create task using API service
      fetchTasksData(); // Refresh tasks
      handleClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleMarkAsCompleted = async (id) => {
    try {
      await updateTaskStatus(id, "Completed"); // Update task status using API service
      fetchTasksData(); // Refresh tasks
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.status === "Completed");
    return Math.round((completedTasks.length / tasks.length) * 100);
  };

  return (
    <div className="container mt-4">
      <h1>Task Tracker</h1>
      <Button variant="primary" onClick={handleShow}>
        Add Task
      </Button>

      <div className="mt-4">
        <h5>Progress</h5>
        <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} />
      </div>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Event</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{new Date(task.deadline).toLocaleDateString()}</td>
              <td>
                <Badge bg={task.status === "Completed" ? "success" : "warning"}>
                  {task.status}
                </Badge>
              </td>
              <td>{events.find((event) => event._id === task.eventId)?.name || "N/A"}</td>
              <td>
                {task.status === "Pending" && (
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => handleMarkAsCompleted(task._id)}
                  >
                    Mark as Completed
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Event</Form.Label>
              <Form.Select
                name="eventId"
                value={formData.eventId}
                onChange={handleChange}
                required
              >
                <option value="">Select an Event</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.name}
                  </option>
                ))}
              </Form.Select>
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

export default TaskTrackerPage;
