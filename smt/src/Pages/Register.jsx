import React, { useState } from 'react';
import { authService } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.register({ email, password, username });
      // Token is saved in localStorage by authService
      window.location.href = '/'; // Redirect to home after signup
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cyan-300">
      <Navbar />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-700 transition duration-200">
          Sign Up
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default Register;
