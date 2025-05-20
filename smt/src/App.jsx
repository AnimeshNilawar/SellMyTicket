import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Landing from './Pages/Landing'
import EventDetail from './Pages/EventDetail'
import PrivateRoute from './Pages/PrivateRoute'
import Login from './Pages/Login'
import Register from './Pages/Register'
import SellTicket from './Pages/SellTicket'
import NotFound from './Pages/NotFound'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') ? true : false
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        
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