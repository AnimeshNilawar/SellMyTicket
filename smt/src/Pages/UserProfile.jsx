import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { authService } from '../services/api';

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check token and expiry before fetching
        const token = localStorage.getItem('token');
        const tokenTimestamp = localStorage.getItem('token_timestamp');
        console.log('Frontend token:', token);
        if (!token || !tokenTimestamp || (Date.now() - parseInt(tokenTimestamp, 10) > 24 * 60 * 60 * 1000)) {
            localStorage.removeItem('token');
            localStorage.removeItem('token_timestamp');
            navigate('/login');
            return;
        }
        async function fetchProfile() {
            try {
                // Fetch user details
                const userRes = await authService.getProfile();
                setUser(userRes);
                // Do not fetch tickets for now
                // const ticketsRes = await ticketService.getUserTickets();
                // setTickets(ticketsRes);
            } catch (err) {
                console.error('Full error object:', err);
                let backendMsg = '';
                if (err?.response?.data?.message) {
                    backendMsg = ` (${err.response.data.message})`;
                } else if (err?.message) {
                    backendMsg = ` (${err.message})`;
                }
                if (err?.response?.status) {
                    backendMsg += ` [HTTP ${err.response.status}]`;
                }
                if (err?.response?.status === 401 || err?.response?.status === 403) {
                    setError('Session expired. Please log in again.' + backendMsg);
                    setTimeout(() => navigate('/login'), 1500);
                } else {
                    setError('Failed to load profile.' + backendMsg);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [navigate]);

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-1 bg-cyan-300 py-10 px-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center mb-8">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'User')}&background=0D8ABC&color=fff&size=96`}
                            alt="Profile Avatar"
                            className="w-24 h-24 rounded-full border-4 border-cyan-300 shadow-md mr-6"
                        />
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{user?.username}</h1>
                            <div className="text-gray-600">{user?.email}</div>
                            <div className="text-gray-600">Phone: {user?.phoneno}</div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <div className="flex-1 bg-cyan-50 rounded-lg p-6 shadow">
                            <div className="text-lg font-semibold mb-2">Account Details</div>
                            <div className="mb-1"><span className="font-medium">Username:</span> {user?.username}</div>
                            <div className="mb-1"><span className="font-medium">Email:</span> {user?.email}</div>
                            <div className="mb-1"><span className="font-medium">Phone:</span> {user?.phoneno}</div>
                        </div>
                        <div className="flex-1 bg-cyan-50 rounded-lg p-6 shadow flex flex-col items-center justify-center">
                            <div className="text-lg font-semibold mb-2">Quick Actions</div>
                            <button className="bg-cyan-600 text-white px-4 py-2 rounded mb-2 w-full hover:bg-cyan-700 transition">Edit Profile</button>
                            <button className="bg-cyan-800 text-white px-4 py-2 rounded w-full hover:bg-cyan-900 transition"
                                onClick={() => navigate('/sell-tickets')}
                            >
                                List a New Ticket
                            </button>
                        </div>
                    </div>
                    <div className="bg-cyan-100 rounded-lg p-6 shadow text-center">
                        <div className="text-xl font-semibold mb-2">Welcome to SellMyTicket!</div>
                        <div className="text-gray-700 mb-2">Thank you for being a part of our community. Here you can manage your account, view your tickets, and update your details.</div>
                        <div className="flex justify-center gap-4 mt-4">
                            <a href="/sell-tickets" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">Sell a Ticket</a>
                            <a href="/" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">Browse Events</a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
