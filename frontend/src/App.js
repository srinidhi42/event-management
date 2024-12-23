import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventManagementPage from "./pages/EventManagementPage";
import AttendeeManagementPage from "./pages/AttendeeManagementPage";
import TaskTrackerPage from "./pages/TaskTrackerPage";
import './App.css';




const App = () => {
  return (
    <Router>
      <div>
     
       
       

        <Routes>
          <Route path="/" element={<EventManagementPage />} />
          <Route path="/attendees" element={<AttendeeManagementPage />} />
          <Route path="/tasks" element={<TaskTrackerPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
