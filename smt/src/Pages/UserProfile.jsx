import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { authService, ticketService } from '../services/api';

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [listedTickets, setListedTickets] = useState([]);
    const [enquiredTickets, setEnquiredTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [ticketTab, setTicketTab] = useState('listed'); // 'listed' or 'enquired'
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
                // Fetch tickets listed by user
                const listed = await ticketService.getUserTickets();
                setListedTickets(listed);
                // Fetch tickets enquired by user
                const enquired = await ticketService.getUserEnquiredTickets();
                setEnquiredTickets(enquired);
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
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-12">
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
                    <div className="bg-cyan-100 rounded-lg p-6 shadow text-center mb-10">
                        <div className="text-xl font-semibold mb-2">Welcome to SellMyTicket!</div>
                        <div className="text-gray-700 mb-2">Thank you for being a part of our community. Here you can manage your account, view your tickets, and update your details.</div>
                        <div className="flex justify-center gap-4 mt-4">
                            <a href="/sell-tickets" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">Sell a Ticket</a>
                            <a href="/" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">Browse Events</a>
                        </div>
                    </div>
                    <div className="mb-10">
                        <div className="flex gap-4 mb-6">
                            <button
                                className={`px-4 py-2 rounded font-semibold ${ticketTab === 'listed' ? 'bg-cyan-600 text-white' : 'bg-cyan-100 text-cyan-700 border border-cyan-300'}`}
                                onClick={() => setTicketTab('listed')}
                            >
                                My Listed Tickets
                            </button>
                            <button
                                className={`px-4 py-2 rounded font-semibold ${ticketTab === 'enquired' ? 'bg-cyan-600 text-white' : 'bg-cyan-100 text-cyan-700 border border-cyan-300'}`}
                                onClick={() => setTicketTab('enquired')}
                            >
                                My Enquired Tickets
                            </button>
                        </div>
                        {ticketTab === 'listed' ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">My Listed Tickets</h2>
                                {listedTickets.length === 0 ? (
                                    <div className="text-gray-500">You have not listed any tickets yet.</div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4 mb-8">
                                        {listedTickets.map(ticket => (
                                            <div key={ticket._id} className="border rounded p-4 bg-cyan-50 flex gap-4 items-center justify-between">
                                                <div className="flex gap-4 items-center">
                                                    {ticket.imageUrl ? (
                                                        <img src={ticket.imageUrl.startsWith('/') ? ticket.imageUrl : `/${ticket.imageUrl}`}
                                                            alt={ticket.eventName}
                                                            className="w-32 h-32 object-cover rounded-lg border"
                                                            onError={e => { e.target.onerror = null; e.target.src = '/vite.svg'; }}
                                                        />
                                                    ) : (
                                                        <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">No Image</div>
                                                    )}
                                                    <div>
                                                        <div className="font-bold text-lg">{ticket.eventName}</div>
                                                        <div>Date: {new Date(ticket.eventDate).toLocaleDateString()} | Time: {new Date(ticket.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
                                                        <div>Venue: {ticket.venue}</div>
                                                        <div>City: {ticket.city}</div>
                                                        <div>Seat: {ticket.seatNumber}</div>
                                                        <div>Type: {ticket.ticketType}</div>
                                                        <div>Status: {ticket.status}</div>
                                                        <div>Resale Price: ₹{ticket.resalePrice}</div>
                                                    </div>
                                                </div>
                                                <button
                                                    className={`ml-4 px-5 py-2 rounded-full font-semibold shadow transition duration-200 text-white text-sm 
                                                    ${ticket.status === 'sold' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'}`}
                                                    disabled={ticket.status === 'sold'}
                                                    onClick={async () => {
                                                        try {
                                                            await ticketService.markTicketSold(ticket._id);
                                                            setListedTickets(listedTickets => listedTickets.map(t => t._id === ticket._id ? { ...t, status: 'sold' } : t));
                                                        } catch {
                                                            alert('Failed to update ticket status.');
                                                        }
                                                    }}
                                                >
                                                    {ticket.status === 'sold' ? 'Marked as Sold' : 'Mark as Sold'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold mb-4">My Enquired Tickets</h2>
                                {enquiredTickets.length === 0 ? (
                                    <div className="text-gray-500">You have not enquired about any tickets yet.</div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4 mb-8">
                                        {enquiredTickets.map(ticket => (
                                            <div key={ticket._id} className="border rounded p-4 bg-cyan-50 flex gap-4">
                                                {ticket.imageUrl ? (
                                                    <img src={ticket.imageUrl.startsWith('/') ? ticket.imageUrl : `/${ticket.imageUrl}`}
                                                        alt={ticket.eventName}
                                                        className="w-32 h-32 object-cover rounded-lg border"
                                                        onError={e => { e.target.onerror = null; e.target.src = '/vite.svg'; }}
                                                    />
                                                ) : (
                                                    <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">No Image</div>
                                                )}
                                                <div>
                                                    <div className="font-bold text-lg">{ticket.eventName}</div>
                                                    <div>Date: {new Date(ticket.eventDate).toLocaleDateString()} | Time: {new Date(ticket.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
                                                    <div>Venue: {ticket.venue}</div>
                                                    <div>City: {ticket.city}</div>
                                                    <div>Seat: {ticket.seatNumber}</div>
                                                    <div>Type: {ticket.ticketType}</div>
                                                    <div>Status: {ticket.status}</div>
                                                    <div>Resale Price: ₹{ticket.resalePrice}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
