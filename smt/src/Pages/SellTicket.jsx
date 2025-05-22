import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ticketService } from '../services/api';

function SellTicket() {
  const [ticketDetails, setTicketDetails] = useState({
    eventName: '',
    eventDate: '',
    venue: '',
    city: '',
    seatNumber: '',
    ticketType: '',
    originalPrice: '',
    resalePrice: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await ticketService.createTicket({
        ...ticketDetails,
        originalPrice: Number(ticketDetails.originalPrice),
        resalePrice: Number(ticketDetails.resalePrice)
      });
      setSuccess('Ticket listed successfully!');
      setTicketDetails({
        eventName: '', eventDate: '', venue: '', city: '', seatNumber: '', ticketType: '', originalPrice: '', resalePrice: ''
      });
    } catch {
      setError('Failed to list ticket.');
    }
  };

  return (
    <div className="min-h-screen bg-cyan-300 flex flex-col">
      <Navbar />
      {/* Main Content */}
      <main className="container mx-auto py-16 px-4 flex-grow">
        <div className="flex flex-col items-center">
          <div className="mb-12 flex items-center">
            <div className="text-4xl font-bold flex items-center">
              <span className="inline-block mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </span>
              TICKET DETAILS
            </div>
          </div>

          <div className="w-full max-w-4xl">
            <div className="relative bg-white rounded-xl border-2 border-black p-8 mb-10">
              <form onSubmit={handleSubmit}>
                {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
                {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Event Name:</label>
                  <input
                    type="text"
                    name="eventName"
                    value={ticketDetails.eventName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Event Date & Time:</label>
                  <input
                    type="datetime-local"
                    name="eventDate"
                    value={ticketDetails.eventDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Venue:</label>
                  <input
                    type="text"
                    name="venue"
                    value={ticketDetails.venue}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">City:</label>
                  <input
                    type="text"
                    name="city"
                    value={ticketDetails.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Seat Number:</label>
                  <input
                    type="text"
                    name="seatNumber"
                    value={ticketDetails.seatNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Ticket Type:</label>
                  <input
                    type="text"
                    name="ticketType"
                    value={ticketDetails.ticketType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Original Price:</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={ticketDetails.originalPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Resale Price:</label>
                  <input
                    type="number"
                    name="resalePrice"
                    value={ticketDetails.resalePrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-md text-lg transition duration-200"
                  >
                    LIST MY TICKET
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SellTicket;