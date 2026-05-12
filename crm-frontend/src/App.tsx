import Login from "./components/Login"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import AddLead from "./components/AddLead";
import ViewLead from "./components/ViewLead";
import ReminderPopup from "./components/ReminderPopup";
import { ReminderProvider } from "./context/ReminderContext";
// const isAuthenticated = () => !!localStorage.getItem("access_token");
function App() {
  return (
      <>
      <ReminderProvider>
      <Router>
        <ReminderPopup />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-lead" element={<AddLead />} />
          <Route path="/leads/:id" element={<ViewLead />} />
          {/* 404 - Not Found */}
          <Route path="*" element={<div className="p-10">404 - Page Not Found</div>} />
        </Routes>
      </Router>
      </ReminderProvider>
      </>
    )
}

export default App
