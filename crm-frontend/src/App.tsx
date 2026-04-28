import Login from "./components/Login"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import AddLead from "./components/AddLead";
const isAuthenticated = () => !!localStorage.getItem("access_token");
function App() {
  return (
      <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-lead" element={<AddLead />} />
          {/* 404 - Not Found */}
          <Route path="*" element={<div className="p-10">404 - Page Not Found</div>} />
        </Routes>
      </Router>

      </>
    )
}

export default App
