// apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Fetch tasks
export const fetchTasks = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

// Fetch events
export const fetchEvents = async () => {
  const response = await axios.get(`${API_BASE_URL}/events`);
  return response.data;
};

// Fetch attendees
export const fetchAttendees = async () => {
  const response = await axios.get(`${API_BASE_URL}/attendees`);
  return response.data;
};

// Create task
export const createTask = async (taskData) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
  return response.data;
};

// Create attendee
export const createAttendee = async (attendeeData) => {
  const response = await axios.post(`${API_BASE_URL}/attendees`, attendeeData);
  return response.data;
};

// Update task status
export const updateTaskStatus = async (id, status) => {
  const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, { status });
  return response.data;
};

// Delete attendee
export const deleteAttendee = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/attendees/${id}`);
  return response.data;
};

export const createEvent = async (eventData) => {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    return response.json();
  };
  
