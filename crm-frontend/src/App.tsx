import Login from "./components/Login"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import AddLead from "./components/AddLead";
import ViewLead from "./components/ViewLead";
import ReminderPopup from "./components/ReminderPopup";
import { ReminderProvider } from "./context/ReminderContext";
import NavBar from "./components/NavBar";
import { useLocation } from "react-router-dom";
import EditLead from "./components/EditLead";

const AppContent = () =>{
  const location = useLocation();
  return(
    <>
      {location.pathname !== "/login" && <NavBar/>}
      <ReminderPopup />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-lead" element={<AddLead />} />
          <Route path="/leads/:id" element={<ViewLead />} />
          <Route path="/edit-lead/:id" element={<EditLead />} />
          <Route path="*" element={<div className="p-10">404 - Page Not Found</div>} />
        </Routes>
    </>
  )
}
function App() {
  return (
      <>
      <ReminderProvider>
      <Router>
        <AppContent />
      </Router>
      </ReminderProvider>
      </>
    )
}

export default App
