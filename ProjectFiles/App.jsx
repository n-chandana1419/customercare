import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Complaint from './pages/Complaint'
import Login from './pages/Login'
import Register from './pages/Register'
import MyComplaints from './pages/MyComplaints'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav style={{padding: "10px", background: "#2563eb", display: "flex", gap: "20px"}}>
        <Link to="/" style={{color: "white", textDecoration: "none"}}>Home</Link>
        <Link to="/register" style={{color: "white", textDecoration: "none"}}>Register</Link>
        <Link to="/login" style={{color: "white", textDecoration: "none"}}>Login</Link>
        <Link to="/complaint" style={{color: "white", textDecoration: "none"}}>Complaints</Link>
        <Link to="/my-complaints" style={{color: "white", textDecoration: "none"}}>My Complaints</Link>
      </nav>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App