import React, { useState } from 'react';
import { authService } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login({ email, password });
      // Optionally redirect or update auth state here
      window.location.href = '/'; // Redirect to home after login
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-cyan-300">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black">LET'S GET STARTED!</h1>
        </div>

        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center mb-6">LOGIN</h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Value"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Value"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded mt-4 hover:bg-gray-700 transition duration-200"
            >
              Sign In
            </button>
            <div className="mt-4 text-center">
              <a href="#" className="text-gray-700 hover:underline">Forgot password?</a>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;