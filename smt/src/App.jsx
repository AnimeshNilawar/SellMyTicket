import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './Pages/Landing'
import EventDetail from './Pages/EventDetail'
import PrivateRoute from './Pages/PrivateRoute'
import Login from './Pages/Login'
import Register from './Pages/Register'
import SellTicket from './Pages/SellTicket'
import NotFound from './Pages/NotFound'
import UserProfile from './Pages/UserProfile'

function App() {
  // Check token and expiry on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenTimestamp = localStorage.getItem('token_timestamp');
    if (token && tokenTimestamp) {
      const now = Date.now();
      const age = now - parseInt(tokenTimestamp, 10);
      if (age > 24 * 60 * 60 * 1000) {
        // Token is older than 24 hours, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('token_timestamp');
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />

        {/* Protected Routes */}
        <Route
          path="/sell-tickets"
          element={
            // <PrivateRoute isAuthenticated={isAuthenticated}>
            <SellTicket />
            // </PrivateRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App