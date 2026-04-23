import Login from "./views/Login"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./views/Dashboard";
function App() {
  return (
      <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard/>} />
        </Routes>
      </Router>

      </>
    )
}

export default App
